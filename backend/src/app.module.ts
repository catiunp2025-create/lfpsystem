import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './external/repositories/remote/PrismaModule';
import { AuthModule } from './module/auth/AuthModule';
import { UserModule } from './module/user/UserModule';
import { CustomerModule } from './module/customer/CustomerModule';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
