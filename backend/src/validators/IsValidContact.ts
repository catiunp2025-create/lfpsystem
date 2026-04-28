import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { ContactType } from '@prisma/client';

export function IsValidContact(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidContact',
            target: (object as any).constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const type = (args.object as any).type;
                    if (type === ContactType.EMAIL) {
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    }
                    if (type === ContactType.PHONE) {
                        return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(value);
                    }
                    return false;
                },
                defaultMessage(args: ValidationArguments) {
                    const type = (args.object as any).type;
                    return type === ContactType.EMAIL
                        ? 'Email inválido.'
                        : 'Telefone inválido. Formato esperado: (00) 00000-0000';
                },
            },
        });
    };
}