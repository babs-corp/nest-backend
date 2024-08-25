import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import type { INestApplication, Logger } from "@nestjs/common";

const yamlDocumentUrl = 'swag/yml';
const jsonDocumentUrl = 'swag/json';
// const apiKey = 'admin-token';

export class SwaggerHelper {
  corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  constructor(public logger: Logger) {}

  build(app: INestApplication) {
    const swaggerConfig = new DocumentBuilder()
      .addServer('/', 'LOCAL DEV')
      .addServer('/swag-meet', 'ON STANDS')
      .setTitle('main service')
      .setVersion('1.0.0')
      // .addSecurity(apiKey, {
      //   type: 'apiKey',
      //   scheme: 
      // })
      .build();

    const document: any = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('swag', app, document, {
      swaggerOptions: {
        requestInterceptor: (req: any) => {
          let { Cookie } = req.headers;

          if(Cookie) {
            Cookie += '; max-age=1';
            document.cookie = Cookie;
          }

          return req;
        },
      },
      yamlDocumentUrl,
      jsonDocumentUrl,
    });

    this.logger.warn('=== CORS ENABLED ===');
    this.logger.warn('OpenApi page created on {/swag}');
  }
}