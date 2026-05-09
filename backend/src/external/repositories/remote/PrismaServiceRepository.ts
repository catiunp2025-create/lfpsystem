import { Injectable } from "@nestjs/common";
import { Create, FindByName, ServiceRepository } from "src/domain/ServiceRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Service } from "@prisma/client";

@Injectable()
export class PrismaServiceRepository implements ServiceRepository{
    constructor(private readonly repository: PrismaRemoteRepository){}

    create({ name, value, description }: Create): Promise<Service> {
        return this.repository.service.create({
            data:{name, value, description}
        })
    }

    findByName({ name }: FindByName): Promise<Service | null> {
        return this.repository.service.findFirst({
            where:{name}
        })
    }

    findAll(): Promise<Service[]> {
        return this.repository.service.findMany();
    }

}