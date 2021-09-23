import { SchemaModel, StringType, DateType, NumberType, ObjectType, ArrayType } from 'schema-typed';


export const Session = SchemaModel({
  name: StringType().isRequired('Campo obrigatório'),
});