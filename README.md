Descripción:

El backend de la prueba fue desarrollado e implementado con Node.js y NestJS, utilizando el motor de base de datos PostgreSQL. La API cuenta con distintos métodos que permiten la gestión completa de productos e integra los servicios de Wompi para manejar transacciones de pagos, consultas, tokenización de tarjetas, entre otros.

El proyecto cuenta con una estructura modular para facilitar su uso y comprensión. Además, se implementó la documentación de la API utilizando la dependencia de Swagger, y se habilitaron CORS, Helmet y ValidationPipe para mejorar la seguridad y la validación de datos. También se crearon migraciones de base de datos para gestionar los cambios en la estructura de la base de datos de manera controlada y reproducible, asegurando la integridad y consistencia de los datos en diferentes entornos.

- CORS (Cross-Origin Resource Sharing): CORS se habilitó para permitir que la API sea accesible desde diferentes dominios, lo que es esencial para aplicaciones web modernas donde el frontend y el backend pueden residir en dominios diferentes. Esto mejora la flexibilidad y la interoperabilidad del sistema.

- Helmet: Helmet se habilitó para ayudar a proteger la API de vulnerabilidades conocidas en la web, configurando de manera adecuada los encabezados HTTP. Esto incluye la protección contra ataques comunes como Cross-Site Scripting (XSS), Clickjacking y otros vectores de ataque relacionados con HTTP.

- ValidationPipe: ValidationPipe se habilitó para asegurar que los datos entrantes en la API sean válidos y cumplan con los requisitos esperados. Esto mejora la seguridad y la robustez de la aplicación al prevenir la entrada de datos malformados o no deseados, reduciendo así el riesgo de errores y posibles vulnerabilidades.

- Migraciones de Base de Datos: Se crearon migraciones de base de datos para gestionar los cambios en la estructura de la base de datos de manera controlada y reproducible, asegurando la integridad y consistencia de los datos en diferentes entornos. Esto facilita el desarrollo, despliegue y mantenimiento del sistema.

Especificiones:

- Se utilizó Node.js versión 20.15.1.
- Se utilizó NestJS versión 1.0.0.
- Se utilizó TypeORM para el manejo de la base de datos.
- El backend se desplegó en un servidor Ubuntu.
- Se utilizó Nginx como servidor web.
- Se utilizó Certbot para la generación del certificado SSL.
- Se utilizó PostgreSQL como motor de base de datos.


Repositorio:

Url: https://github.com/mejia-jose/PaymentInOnlineStoreBackend.git
Rama: master


Url Productiva: https://api.store.jmejia.shop
Url de la documentación: https://api.store.jmejia.shop/api-docs

