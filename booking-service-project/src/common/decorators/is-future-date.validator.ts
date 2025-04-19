import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isFutureDate',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!value) return false;
                    const date = new Date(value);
                    return date.getTime() > Date.now();
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be in the future`;
                },
            },
        });
    };
}
