import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './external/repositories/remote/PrismaModule';
import { AuthModule } from './module/auth/AuthModule';
import { UserModule } from './module/user/UserModule';
import { VehicleModule } from './module/vehicle/VehicleModule';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
