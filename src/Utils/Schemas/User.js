import { SchemaModel, StringType, DateType, NumberType, ObjectType, ArrayType, MixedType } from 'schema-typed';
import moment from 'moment';

export const Session = SchemaModel({
  name: StringType().isRequired('Campo obrigatório').rangeLength(4, 50, "Somente de 4 a 50 caracteres"),
});

export const PersonalProfile = SchemaModel({
  full_name: StringType().isRequired('Campo obrigatório'),
  birth_city: StringType().isRequired('Campo obrigatório'),
  birth_date: StringType()
    .addRule((value) => moment(value, "DD/MM/YYYY", true).isValid(), "Data inválida")
    .pattern(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/, "Data inválida")
    

})