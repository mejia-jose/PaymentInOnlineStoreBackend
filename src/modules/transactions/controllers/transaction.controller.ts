import { Body, Controller, Post,Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { TransactionServices } from '../services/transaction.service';
import { TokenCardDTO } from '../dto/transaction.dto';
import {ProductService} from '../../products/services/product.service'

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController
{
    constructor(private readonly transactionServices:TransactionServices, private readonly productServices:ProductService){}

    @Post('token-card') //Función intermediaria para consumir la api de wompi y tokenizar la tarjeta
    @ApiOperation({
        summary: 'Tokenizar tarjeta',
        description: 'Este endpoint permite obtener el token de la tarjeta, el cual es utilizado para la realización del pago.'
    })
    @ApiBody({
        description: 'Cuerpo de los datos',
        examples: {
            example1: 
            {
                summary: 'Ejemplo de datos del endpoint de Tokenizar tarjeta',
                value: {
                   "number": "4242424242424242",
                    "cvc": "123", 
                    "exp_month": "08", 
                    "exp_year": "28",
                    "card_holder": "José Pérez"
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Devuelve un objeto con los datos entregados por Wonpi',
        schema: {
          example: {
            status: 'CREATED',
            data: {
              id: 'tok_stagtest_5113_34650d6Bd82e0e69d2B90D8884a3C974',
              created_at: '2024-07-23T23:14:02.370+00:00',
              brand: 'VISA',
              name: 'VISA-4242',
              last_four: '4242',
              bin: '424242',
              exp_year: '28',
              exp_month: '08',
              card_holder: 'José Pérez',
              created_with_cvc: true,
              expires_at: '2025-01-19T23:14:01.000Z',
              validity_ends_at: '2024-07-25T23:14:02.370+00:00'
            }
          }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Error al realizar la petición al servicio Wompi: error.message',
    })
    @ApiResponse({
        status: 400,
        description: 'Error al realizar la petición al servicio Wompi: error.message',
    })
    public async createTokenCard(@Body() body: any)
    {
        try
        {
          const result = await this.transactionServices.createTransactionTokenizarCard(body);
          return result; 
        } catch (error) 
        {
          return { success: false, data: [], error:error.message }; 
        }
    }

    @Get('acceptance-token')
    //Este ruta permite consultar el token de autorización de terminos
    @ApiOperation({ summary: 'Permite obtener el token de autorización de Wompi' })
    @ApiResponse({ status: 200, description: 'Devuelve el token de autorización entregado por Wompi', type: "eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6MjQzLCJwZXJtYWxpbmsiOiJodHRwczovL3dvbXBpLmNvbS9hc3NldHMvZG93bmxvYWRibGUvcmVnbGFtZW50by1Vc3Vhcmlvcy1Db2xvbWJpYS5wZGYiLCJmaWxlX2hhc2giOiJkMWVkMDI3NjhlNDEzZWEyMzFmNzAwMjc0N2Y0N2FhOSIsImppdCI6IjE3MjE3NzcyMjYtMjEwNjMiLCJlbWFpbCI6IiIsImV4cCI6MTcyMTc4MDgyNn0.ribDFkiYOSYItDzyAQ-xOgvc0p1WDe6NmyYYJq1E9hk"  })
    public async getAcceptanceToken()
    {
        try
        {
          const result = await this.transactionServices.getAcceptanceToken();
          return result; 
        } catch (error) 
        {
          return { success: false, data: [], error:error.message }; 
        }
    }

    @Post('payment')
    //Esta ruta permite al usuario realizar el registro del pago
    @ApiOperation({
        summary: 'Realizar pago',
        description: 'Este endpoint registrar una transacción de pago en Wompi.'
    })
    @ApiBody({
        description: 'Cuerpo de los datos',
        examples: {
            example1: 
            {
                summary: 'Ejemplo de datos del endpoint de Realizar pago',
                value: {
                   "amount_in_cents": 1207500,
                    "currency": "COP",
                    "signature": "f26596370d94d974d258f340aa19ed709514ad6854758ce8bc0f8cbf6d851acc",
                    "customer_email": "camila@gmail.com",
                    "reference": "921ed40f-aed3-4257-beb0-6a6baa07ac80",
                    "payment_method": {
                        "type": "CARD",
                        "installments": 12,
                        "token": "tok_stagtest_5113_5d971337dd49440f5e0d5d767560Bb2d"
                    },
                    "accept": "eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6MjQzLCJwZXJtYWxpbmsiOiJodHRwczovL3dvbXBpLmNvbS9hc3NldHMvZG93bmxvYWRibGUvcmVnbGFtZW50by1Vc3Vhcmlvcy1Db2xvbWJpYS5wZGYiLCJmaWxlX2hhc2giOiJkMWVkMDI3NjhlNDEzZWEyMzFmNzAwMjc0N2Y0N2FhOSIsImppdCI6IjE3MjE3NTEyMDUtNjM4ODAiLCJlbWFpbCI6IiIsImV4cCI6MTcyMTc1NDgwNX0.v7rrQ64mAxwdB6PWUI6j6PRXNCuX6ZqLzSnHjpCa6sM"
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Error al realizar la petición al servicio Wompi: error.message',
    })
    @ApiResponse({
        status: 400,
        description: 'Error al realizar la petición al servicio Wompi: error.message',
    })
    public async transactionsPayment(@Body() body:any)
    {
        try
        {
          const result = await this.transactionServices.transactionsPayment(body);
          return result; 
        } catch (error) 
        {
          return { success: false, data: [], error:error.message }; 
        }
    }

    @Post('status-payment')
    //Esta ruta permite al usuario en este caso en frontend, realizar la transacción del pago del producto
    @ApiOperation({
        summary: 'Consultar estado de la transacción',
        description: 'Este endpoint consulta el estado de la transacción.'
    })
    @ApiBody({
        description: 'Cuerpo de los datos',
        examples: {
            example1: 
            {
                summary: 'Ejemplo de datos del endpoint.',
                value: {

                    idTransaction: '15113-1721777841-40166',
                    product: {
                        id: '400980d9-4e44-4387-9a1d-2044d6e66f03',
                        created_at: '2024-07-22T20:43:24.446Z',
                        updated_at: '2024-07-22T20:43:24.446Z',
                        state: 1,
                        name: 'Monitor Samsung 27"',
                        description: 'Monitor de 27 pulgadas con resolución 4K y pantalla curva.',
                        price: 458900,
                        stock: 15,
                        image: 'monitor27.jpg'
                    },
                    cantProductosSelected: 2
                }
            }
        }
    })
    @ApiResponse
    ({
        status:201,
        description:'Consulta el estado del pago.'
    })
    @ApiResponse({
        status: 404,
        description: 'Error al realizar la petición al servicio Wompi: error.message',
    })
    @ApiResponse({
        status: 400,
        description: 'Error al realizar la petición al servicio Wompi: error.message',
    })
    public async consultPaymentStatus(@Body() body: any)
    {
        try
        {
          const result = await this.transactionServices.consultPaymentStatus(body.idTransaction);
          
          //Si la transacción fue aprobada, se actualiza el stock del producto
          if(result.data.status == 'APPROVED')
          { 
            let product = body.product; //Se obtiene un json con la información del producto
            const cantidad = body.cantProductosSelected; //Cantidad de productos comprados
            const stock = product.stock - cantidad; //Se realiza la operación para actualizar el stock
            product.stock = stock; //Se actualiza el valor del stock del json del producto
            this.productServices.updateProduct(product,product.id) //Se actualiza el stock del producto en la BD
          }
          return result; 
        } catch (error) 
        {
          return { success: false, data: [], error:error.message }; 
        }
    }
}
