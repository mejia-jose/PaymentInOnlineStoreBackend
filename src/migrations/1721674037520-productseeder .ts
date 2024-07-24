import { MigrationInterface, QueryRunner } from "typeorm";

export class Productseeder1721674037520  implements MigrationInterface {

    name = 'Productseeder1721674037520';
    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`INSERT INTO "tbProducto" 
            (
                "id", "name", "description", "price", "stock", "image", "state", "created_at", "updated_at"
            ) 
            VALUES 
            (uuid_generate_v4(), 'Laptop HP Pavilion', 'Laptop de alto rendimiento con procesador Intel i7 y 16 GB de RAM.', 2840900, 10, 'laptop_hp_pavilion.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Monitor Samsung 27"', 'Monitor de 27 pulgadas con resolución 4K y pantalla curva.', 458900, 15, 'monitor27.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Teclado Logitech', 'Teclado con retroiluminación RGB y switches Cherry MX.', 397000, 25, 'teclado.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Auriculares Bose QuietComfort', 'Auriculares inalámbricos con cancelación activa de ruido y sonido premium.', 1209900, 12, 'auricularesquietcomfort.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Samsung Galaxy S21 FE 5G (Exynos) 256 GB graphite 8 GB RAM', 'Teléfono inteligente con pantalla AMOLED de 6.2" y cámara triple.', 1888100, 18, 'samsung_galaxy_s21.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Apple iPad (9ª generación) 10.2" Wi-Fi 64GB - Gris espacial', 'Tablet con pantalla Retina de 12.9" y procesador A12Z Bionic.', 1349000, 8, 'tabletipad.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Cafetera Nespresso Essenza Mini Silver', 'Cafetera de cápsulas con funciones de espresso y café lungo.', 571000, 25, 'cafetera.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Nevecón Samsung Side By Side 628 Litros Rs22t5200b1/co', 'Nevera con capacidad de 650 litros y tecnología No Frost.', 5949900, 6, 'nevera.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Lavadora Bosch', 'Lavadora de carga frontal con capacidad para 8 kg y 1400 RPM.', 896900, 10, 'lavadora_bosch.jpg', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Secadora Carga Frontal Df22wv2br 22kg/48lbs Color Blan', 'Secadora de ropa con tecnología de bomba de calor y 9 kg de capacidad.', 2957900, 7, 'secadora.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Aspiradora Plastica, Para Solidos/liquidos, 6 Gal Truper Color Naranja/Negro 120V', 'Aspiradora sin cables con potente succión y batería de larga duración.', 330.410, 21, 'aspiradora.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Microondas industrial Panasonic OCS NE-1054F plata 22L 127V', 'Microondas con tecnología Inverter y función de grill.', 2320000, 15, 'horno.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Batidora de pedestal KitchenAid Commercial KSM8990 black 60 Hz 120 V', 'Batidora de pie con varios accesorios y motor potente.', 2499900, 10, 'batidora.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Frigidaire Efmis567_amz Refrigerador Retro Para Bebidas De 1', 'Refrigerador de dos puertas con sistema de enfriamiento multi-flujo.', 652000, 18, 'refrigerador.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Televisor LG 55'' Smart 4k Tv Evo G3 Con Thinq', 'Televisor OLED de 55" con resolución 4K y soporte HDR.', 749000, 15, 'televisorOled.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Jbl Speaker Go3 Speaker Bluetooth Color Black', 'Parlante inalámbrico con sonido potente y resistencia al agua.', 129000, 30, 'parlante.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Cámara de seguridad One Pixel IK100', 'Sistema de cámaras de seguridad inalámbricas con visión nocturna Cámara de seguridad One Pixel IK100 WIFI con resolución Full HD 1080p visión nocturna incluida blanca.', 56000, 12, 'camara.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Tostadora Hamilton Beach', 'Tostadora De Pan Eléctrica Hamilton Beach 22633 Color Negro', 248000, 18, 'tostadora.webp', 1, NOW(), NOW()),
            (uuid_generate_v4(), 'Plancha De Vapor Rowenta Access, Ergonómica, Versátil, 1700w', 'Plancha de vapor con suela de acero inoxidable y función anti-cal.', 285400, 22, 'plancha.webp', 1, NOW(), NOW())`);
             
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM products`);
    }
}

