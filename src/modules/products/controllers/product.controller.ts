import { Body, Controller, Post,Get, Param, Put, Delete, Search } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ProductDTO, ProductUpdateDTO } from '../dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController
{
    constructor(private readonly productServices:ProductService){}

    @Post('create')
    @ApiOperation({
        summary: 'Registro de productos',
        description: 'Este endpoint permite registrar nuevos productos y los datos son enviados en el cuerpo de la solicitud.'
    })
    @ApiBody({
        description: 'Datos del producto a registrar',
        type: ProductUpdateDTO,
        examples: {
            example1: 
            {
                summary: 'Ejemplo de datos de para registrar un producto de producto',
                value: {
                    name: 'Nombre del Producto',
                    price: 30000,
                    stock: 46,
                    description: 'Descripción del producto.',
                    image:'tostadora.webp',
                    state: 1
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Producto registrado correctamente',
        type: ProductDTO,
    })
    @ApiResponse({
        status: 404,
        description: 'No fue posible realizar el registro.',
    })
    @ApiResponse({
        status: 400,
        description: 'Solicitud inválida',
    })
    public async createProduct(@Body() body:ProductDTO)
    {
        return await this.productServices.createProduct(body);
    }

    @Get('all')
    @ApiOperation({ summary: 'Permite obtener los registros de productos registrados en la BD' })
    @ApiResponse({ status: 200, description: 'Lista de de productos', type: [ProductDTO] })
    @ApiQuery({required: false, description: 'Devuelve todos los productos.', example: 20 })
    public async getAllProducts()
    {
        return await this.productServices.getAllProducts();
    }

    @Get('find/:id')
    @ApiOperation({
        summary: 'Obtener un producto por ID',
        description: 'Este endpoint devuelve los detalles de un producto específico basado en el ID proporcionado.'
    })
    @ApiParam({
        name: 'id',
        description: 'ID del producto',
        example: 'acfb31e7-7db5-4367-8476-17ee7d44323f',
    })
    @ApiResponse({
        status: 200,
        description: 'Detalles del producto obtenidos exitosamente',
        type: ProductDTO,
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    public async getProductByID(@Param('id') idProduct:string)
    {
        return await this.productServices.findProductByID(idProduct);
    }

    @Get('search/:search')
    public async getProductSearch(@Param('search') search:string)
    {
        console.log('controller: '+search)
        return await this.productServices.findProductsBySearchParam(search);
    }

    @Put('update/:id')
    @ApiOperation({
        summary: 'Actualizar un producto por ID',
        description: 'Este endpoint actualiza los detalles de un producto específico basado en el ID proporcionado y los datos enviados en el cuerpo de la solicitud.'
    })
    @ApiParam({
        name: 'id',
        description: 'ID del producto que se desea actualizar',
        example: "acfb31e7-7db5-4367-8476-17ee7d44323f",
    })
    @ApiBody({
        description: 'Datos del producto a actualizar',
        type: ProductUpdateDTO,
        examples: {
            example1: {
            summary: 'Ejemplo de datos de actualización de producto',
            value: {
                name: 'Nuevo Nombre del Producto',
                price: 30000,
                stock: 46,
                description: 'Nueva descripción del producto.'
            }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado exitosamente',
        type: ProductDTO,
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    @ApiResponse({
        status: 400,
        description: 'Solicitud inválida',
    })
    public async updateProduct(@Body() body:ProductUpdateDTO,@Param('id') idProduct:string)
    {
        return await this.productServices.updateProduct(body,idProduct);
    }

    @Delete('delete/:id')
    @Get('find/:id')
    @ApiOperation({
        summary: 'Eliminar un producto por ID',
        description: 'Este endpoint elimina un producto específico basado en el ID proporcionado.'
    })
    @ApiParam({
        name: 'id',
        description: 'ID del producto a eliminar',
        example: 'acfb31e7-7db5-4367-8476-17ee7d44323f',
    })
    @ApiResponse({
        status: 200,
        description: 'El producto fue eliminado exitosamente exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'No ha sido posible realizar la eliminación de este producto.',
    })
    public async deleteProduct(@Param('id') idProduct:string)
    {
        return await this.productServices.deleteProduct(idProduct);
    }
}
