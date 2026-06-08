import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VehicleController } from 'src/controller/VehicleController';
import { VehicleRepository } from 'src/domain/VehicleRepository';
import { PrismaVehicleRepository } from 'src/external/repositories/remote/PrismaVehicleRepository';
import { JwtStrategy } from 'src/strategies/JwtStrategy';
import { CreateVehicleUseCase } from 'src/usecase/vehicle/CreateVehicleUseCase';
import { FindVehicleUseCase } from 'src/usecase/vehicle/FindVehicleUseCase';
import { ListVehicleUseCase } from 'src/usecase/vehicle/ListVehicleUseCase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [VehicleController],
  providers: [
    CreateVehicleUseCase,
    ListVehicleUseCase,
    FindVehicleUseCase,
    JwtStrategy,
    {
      provide: VehicleRepository,
      useClass: PrismaVehicleRepository,
    },
  ],
})
export class VehicleModule {}
