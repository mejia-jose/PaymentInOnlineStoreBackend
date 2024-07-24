import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.sources';
import { ProductsModule } from './modules/products/products.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({

  imports:
  [
    /*Permite importar las variables de entorno*/
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true, // Permite que el módulo ConfigModule esté disponible en toda la aplicación
    }),

    /*Permite importar la conexión a la BD*/
    TypeOrmModule.forRoot({...DataSourceConfig}),

    /*Importación de Módulos*/
    ProductsModule,
    TransactionsModule,
    /*Importación de Módulos*/
  ],
})
export class AppModule {}
