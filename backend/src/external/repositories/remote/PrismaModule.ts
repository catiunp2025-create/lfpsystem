import { Global, Module } from '@nestjs/common';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';

@Global()
@Module({
  providers: [PrismaRemoteRepository],
  exports: [PrismaRemoteRepository],
})
export class PrismaModule {}
