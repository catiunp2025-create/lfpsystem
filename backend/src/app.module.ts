import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './external/repositories/remote/PrismaModule';
import { AuthModule } from './module/auth/AuthModule';
import { UserModule } from './module/user/UserModule';
import { CustomerModule } from './module/customer/CustomerModule';
import { ContactModule } from './module/contact/ContactModule';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CustomerModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
