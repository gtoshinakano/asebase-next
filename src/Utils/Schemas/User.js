import { SchemaModel, StringType, DateType, NumberType, ObjectType, ArrayType, Schema } from 'schema-typed';


export const Session = SchemaModel({
  name: StringType().isRequired('Campo obrigatório').rangeLength(4, 50, "Somente de 4 a 50 caracteres"),
});

export const PersonalProfile = SchemaModel({
  full_name: StringType().isRequired('Campo obrigatório')
})