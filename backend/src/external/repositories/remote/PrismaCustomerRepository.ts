import { Injectable } from "@nestjs/common";
import { Create, CustomerRepository, Customers } from "src/domain/CustomerRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Customer } from "@prisma/client";

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
    constructor(private readonly repository: PrismaRemoteRepository){}

    create({ name, type, value }: Create): Promise<Customer> {
        return this.repository.$transaction(async (tx) =>{
            const identification = await tx.identification.create({
                data: {type, value}
            })

            const customer = await tx.customer.create({
                data: {name, identificationId: identification.id}
            })

            return customer;
        })
    }
    findAll(): Promise<Customers[]> {
        return this.repository.customer.findMany({
            include:{
                identification: true,
                address: true,
                contact: true
            },
            orderBy: {name: 'asc'}
        })
    }
}