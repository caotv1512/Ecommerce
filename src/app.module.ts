import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), ProductModule, UserModule],
  controllers: [], 
  providers: [],
})
export class AppModule {}
