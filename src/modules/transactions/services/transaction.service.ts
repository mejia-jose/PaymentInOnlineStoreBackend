import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom,firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class TransactionServices 
{
  private readonly urlTokenCard = 'tokens/cards';
  private readonly secretKeyPublic = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
  private readonly secretKeyPrivate = 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';
  private readonly firma = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
  private readonly urlAcceptanceToken = 'merchants';
  private readonly urlTransactios = 'transactions';
  private readonly urlBaseApi = 'https://api-sandbox.co.uat.wompi.dev/v1/';

  constructor(private readonly httpService: HttpService) {}

  //Funcion que permite obtener el token id de la tarjeta de credito, es decir tokenizar la tarjeta
  public async createTransactionTokenizarCard(data: any): Promise<any>
  {
    //console.log(data)
    const headers = { Authorization: `Bearer ${this.secretKeyPublic}`,'Content-Type': 'application/json',};
    try 
    {
      const response = this.httpService.post(this.urlBaseApi+this.urlTokenCard, data, { headers });
      const result = await lastValueFrom(response);
      return result.data; 
    } catch (error) 
    {
      return 'Error al realizar la petición al servicio Wompi:'+ error.message;
    }
  }

  //Funcion que permite obtener el token de autorización de terminos
  public async getAcceptanceToken(): Promise<any>
  {
    const headers = { 'Content-Type': 'application/json',};
    try 
    {
      const data = await firstValueFrom(
        this.httpService.get(
          `${this.urlBaseApi}${this.urlAcceptanceToken}/${this.secretKeyPublic}`,{headers},
        ),
      );
      const token = data.data.data;
      const {acceptance_token} = token.presigned_acceptance;
      return acceptance_token;

    } catch (error) 
    {
      return 'Error al realizar la petición al servicio Wompi:'+ error.response?.data || error.message;
    }
  }

  //Genera un hash como complememtp de la referencia
  private getRandomTimeOfDay(): string 
  {
    const hours = Math.floor(Math.random() * 24); // Hora entre 0 y 23
    const minutes = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
    const seconds = Math.floor(Math.random() * 60); // Segundos entre 0 y 59
    return crypto.createHash('sha256').update(`${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}${String(seconds).padStart(2, '0')}`).digest('hex');
  }

  //Funcion que permite crear la transación y regsitrar el pago en wompi
  public async transactionsPayment(data:any):Promise<any>
  {
      const headers = {Authorization: `Bearer ${this.secretKeyPrivate}`, 'Content-Type': 'application/json',};
      const acceptance_token = data.accept;
      const complemeteReference = this.getRandomTimeOfDay();
      const cadenaConcatenada = data.reference+complemeteReference+data.amount_in_cents+'COP'+this.firma;
      
      const encondedText = new TextEncoder().encode(cadenaConcatenada);
      const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // 
      const body = 
      {
        "amount_in_cents": data.amount_in_cents,
        "currency": "COP",
        "signature": hashHex,
        "customer_email": data.customer_email, //Correo del cliente
        "reference": data.reference+complemeteReference,
        "payment_method": {
          "type": "CARD", //Metodo de pago
          "installments": data.installments,
          "token": data.token
        },
        "acceptance_token": acceptance_token,
      }
     // console.log(body)

    try 
    {
     
      const response = await firstValueFrom(
        this.httpService.post(this.urlBaseApi + this.urlTransactios, body, { headers }),
      );
      return response.data; 

    } catch (error) 
    {
      return 'Error al realizar la petición al servicio Wompi:'+ error.message || error || error.data;
    }
  }

  //Función que permite consultar la información del pago
  public async consultPaymentStatus(id:string)
  {
    try 
    {
      const response = this.httpService.get(this.urlBaseApi + this.urlTransactios+'/'+id);
      const result = await lastValueFrom(response);
      return result.data; 
    } catch (error) 
    {
      return 'Error al realizar la petición al servicio Wompi:'+ error.message;
    }
  }

}
