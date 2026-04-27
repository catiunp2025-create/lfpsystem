import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { IdentificationType } from '@prisma/client';

export function IsValidIdentification(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidIdentification',
            target: (object as any).constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const type = (args.object as any).type;
                    if (type === IdentificationType.CPF) {
                        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
                    }
                    if (type === IdentificationType.CNPJ) {
                        return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);
                    }
                    return false;
                },
                defaultMessage(args: ValidationArguments) {
                    const type = (args.object as any).type;
                    return type === IdentificationType.CPF
                        ? 'CPF inválido. Formato esperado: 000.000.000-00'
                        : 'CNPJ inválido. Formato esperado: 00.000.000/0000-00';
                },
            },
        });
    };
}