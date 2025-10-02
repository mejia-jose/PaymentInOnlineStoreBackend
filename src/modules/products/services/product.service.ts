import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDTO, ProductUpdateDTO } from '../dto/product.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProductService
{
  constructor
  (
    @InjectRepository(ProductEntity) //Se inyecta el resipotorio de entidad Product
    private readonly productRepository: Repository<ProductEntity> //Se define el objeto del repositorio entidad
  ){}   
  
  //Función para crear y registrar nuevos productos
  public async createProduct(body:ProductDTO) : Promise<ProductEntity>
  {
    try
    {
       const product = await this.productRepository.save(body);
       if(!product)
       {
         //Se registra el error
         throw new ErrorManager({ type:'BAD_REQUEST',message: 'Lo sentimos, no hemos podido registrar la información de este producto. Por favor, intente nuevamente más tarde.'});
       }

       return product;
    } catch (error)
    {
      //Se ejecuta el error y se le muestra al usuario
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Función para obtener todos usuarios
  public async getAllProducts() : Promise<ProductEntity[]>
  {
    try
    {
        //Se obtiene los registros de productos existentes en la BD
       const products : ProductEntity[] =  await this.productRepository.find();  
       
       if(products.length === 0) //Se valida que si tenga resultados
       {
         //Se registra el error
         throw new ErrorManager({ type:'BAD_REQUEST',message: '¡Ups! No se encontraron resultados para su búsqueda.'});
       }

       return products; //Si se encontraron resultados se retorna
    } catch (error)
    {
      //Se ejecuta el error y se le muestra al usuario
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Función para buscar un producto por ID
  public async findProductByID(id:string) : Promise<ProductEntity>
  {
    try
    {
       const product : ProductEntity = await this.productRepository.createQueryBuilder('product').where({id}).getOne(); 
       
        if(!product)
        {
          //Se registra el error
          throw new ErrorManager({ type:'BAD_REQUEST',message: '¡Ups! No se encontraron resultados para su búsqueda.'});
        }

        return product;
    } catch (error)
    {
      //Se ejecuta el error y se le muestra al usuario
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Función para realizar busquedas de producots por ID, NAME, DESCRIPTIONS AND PRICE
  public async findProductsBySearchParam(searchParam: string): Promise<ProductEntity[]>
  {
    try
    {
      const products = await this.productRepository
      .createQueryBuilder('product')
      .orWhere('product.name LIKE :searchParam', { searchParam: `%${searchParam}%` })
      .orWhere('product.description LIKE :searchParam', { searchParam: `%${searchParam}%` })
      .getMany();
  
       
        if(!products)
        {
          //Se registra el error
          throw new ErrorManager({ type:'BAD_REQUEST',message: '¡Ups! No se encontraron resultados para su búsqueda.'});
        }

      return products;
      
    } catch (error)
    {
      //Se ejecuta el error y se le muestra al usuario
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Función para actualizar un producto por ID
  public async updateProduct(body:ProductUpdateDTO,id:string) : Promise<UpdateResult | undefined>
  {
    try
    {
       const product = this.productRepository.update(id,body);
       
       if((await product).affected === 0)
       {
          //Se registra el error
         throw new ErrorManager({ type:'BAD_REQUEST',message: 'Lo sentimos, no hemos podido actualizar la información. Por favor, intente nuevamente más tarde.'});
       }

       return product;
    } catch (error)
    {
      //Se ejecuta el error y se le muestra al usuario
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Función que permite eliminar un producto por ID
  public async deleteProduct(id:string) : Promise<DeleteResult | undefined>
  {
    try
    {
       const product = this.productRepository.delete(id);
       
       if((await product).affected === 0)
       {
           //Se registra el error
         throw new ErrorManager({ type:'BAD_REQUEST',message: '¡Vaya! No hemos podido eliminar el producto. Por favor, inténtelo de nuevo más tarde.'});
       }

       return product;
    } catch (error)
    {
      //Se ejecuta el error y se le muestra al usuario
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
