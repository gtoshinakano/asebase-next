import { SchemaModel, StringType, DateType, NumberType, ObjectType, ArrayType, MixedType } from 'schema-typed';
import moment from 'moment';
import br_states from '@Utils/StaticData/br_states.json'
import _ from 'lodash'

export const Session = SchemaModel({
  name: StringType().isRequired('Campo obrigatório').rangeLength(4, 50, "Somente de 4 a 50 caracteres"),
});

export const PersonalProfile = SchemaModel({
  full_name: StringType().isRequired('Campo obrigatório'),
  birth_city: StringType()
    .addRule((value) => {
      return value === "" || cities.includes(value)
    }, "Cidade fornecida inexistente")
    .isRequiredOrEmpty('Campo obrigatório ou nulo'),
  birth_state: StringType()
    .addRule((value) => {
      return value === "" || states.includes(value)
    }, "Estado fornecido inexistente")
    .isRequiredOrEmpty('Campo obrigatório ou nulo'),
  birth_date: StringType()
    .addRule((value) => moment(value, "DD/MM/YYYY", true).isValid(), "Data inválida")
    .pattern(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/, "Data inválida")
})

export const states = _.map(br_states.estados, (i) => i.nome)

export const cities = _.flattenDeep(_.map(br_states.estados, (i) => i.cidades))