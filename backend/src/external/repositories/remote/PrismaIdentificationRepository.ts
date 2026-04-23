import { FindByValue, IdentificationRepository } from "src/domain/IdentificationRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Identification } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaIdentificationRepository implements IdentificationRepository{
    constructor(private readonly repository: PrismaRemoteRepository){}

    findByValue({ value }: FindByValue): Promise<Identification | null> {
        return this.repository.identification.findFirst({
            where: {value}
        })
    }
}