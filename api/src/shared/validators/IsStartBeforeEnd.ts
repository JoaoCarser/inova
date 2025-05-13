import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
  } from 'class-validator';
  
  export function IsStartBeforeEnd(
    property: string[],
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isStartBeforeEnd',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: property,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [startKey, endKey] = args.constraints;
            const startDate = (args.object as any)[startKey];
            const endDate = (args.object as any)[endKey];
            if (!startDate || !endDate) return true;
            return new Date(startDate) < new Date(endDate);
          },
          defaultMessage(args: ValidationArguments) {
            return 'Start date must be before end date';
          },
        },
      });
    };
  }
  