import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function UserEnable(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'UserEnable',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const enableValue = args.object['enable'];

          if (enableValue === '启' || enableValue === '启用') {
            args.object[propertyName] = true;
            return true;
          } else if (enableValue === '禁' || enableValue === '禁用') {
            args.object[propertyName] = false;
            return true;
          } else if (enableValue === '用') {
            delete args.object[propertyName];
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
