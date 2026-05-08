import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './external/repositories/remote/PrismaModule';
import { AuthModule } from './module/auth/AuthModule';
import { UserModule } from './module/user/UserModule';
import { VehicleModule } from './module/vehicle/VehicleModule';
import { VehicleUserModule } from './module/vehicle_user/VehicleUserModule';
import { CustomerModule } from './module/customer/CustomerModule';
import { ContactModule } from './module/contact/ContactModule';
import { AddressModule } from './module/address/AddressModule';
import { ServiceModule } from './module/service/ServiceModule';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CustomerModule, ContactModule, AddressModule,VehicleModule, VehicleUserModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
