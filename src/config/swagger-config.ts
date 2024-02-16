import { DocumentBuilder } from '@nestjs/swagger';

//swagger
const config = new DocumentBuilder()
  .setTitle('E-Commerce API')
  .setDescription('The API E-Commerce for user and admin')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://staging.yourapi.com/', 'Staging')
  .addServer('https://production.yourapi.com/', 'Production')
  .addBearerAuth()
  // .addGlobalParameters({
  //   name: 'country',
  //   in: 'query'
  // })
  .build();

export default config;
