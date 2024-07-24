import { DataSource,DataSourceOptions } from "typeorm";
import { ConfigService,ConfigModule } from '@nestjs/config';


ConfigModule.forRoot(
{
    envFilePath:'.env',
});

const configService = new ConfigService();//Permite usar la funcion para obtener el valor de variables de entorno

export const DataSourceConfig : DataSourceOptions = 
{
    type: 'postgres',//'mssql' ,//'mysql',
    host: configService.get('BD_HOST'),
    port: parseInt(configService.get('BD_PORT')),
    username: configService.get('BD_USERNAME'),
    password: configService.get('BD_PASSWORD'),
    database: configService.get('BD_NAME'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    /* options: {
      encrypt: true,
      trustServerCertificate: true, // Esta línea deshabilita la verificación del certificado
    }, */
    logging: false,
}

export const AppDS = new DataSource(DataSourceConfig)