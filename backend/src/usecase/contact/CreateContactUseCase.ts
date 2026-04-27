import { Injectable } from "@nestjs/common";
import { Contact, ContactType } from "@prisma/client";
import { ContactRepository } from "src/domain/ContactRepository";
import { ContactAlreadyExists } from "src/shared/erros/cases/ContactAlreadyExists";

interface Request{
    customerId: string
    type: ContactType;
    value: string;
}

@Injectable()
export class CreateContactUseCase{
    constructor(private readonly contactRepository: ContactRepository){}

    async execute({customerId, type, value}: Request): Promise<Contact>{
        const contactAlreadyExists = await this.contactRepository.findBy({customerId, value});

        if(contactAlreadyExists){
            throw new ContactAlreadyExists();
        }

        return this.contactRepository.create({
            customerId,
            type,
            value
        })
    }
}