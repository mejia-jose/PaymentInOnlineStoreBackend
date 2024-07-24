import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../products/controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductEntity } from '../products/entities/product.entity';

@Module({

  imports:
  [
    TypeOrmModule.forFeature([ProductEntity])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports : [ProductService]
})
export class ProductsModule {}
