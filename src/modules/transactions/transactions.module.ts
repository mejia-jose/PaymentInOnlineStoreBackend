import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TransactionController } from '../transactions/controllers/transaction.controller';
import { TransactionServices } from '../transactions/services/transaction.service';
import { ProductsModule } from '../products/products.module';

@Module({

  imports:
  [
    HttpModule,
    ProductsModule
    //TypeOrmModule.forFeature([])
  ],
  controllers: [TransactionController],
  providers: [TransactionServices]
})
export class TransactionsModule {}


