import { Module } from '@nestjs/common';
import { ShippingMethodController } from './shipping-method.controller';
import { ShippingMethodService } from './shipping-method.service';

@Module({
  controllers: [ShippingMethodController],
  providers: [ShippingMethodService]
})
export class ShippingMethodModule {}
