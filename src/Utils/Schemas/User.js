import {
  SchemaModel,
  StringType,
  DateType,
  NumberType,
  ObjectType,
  ArrayType,
  MixedType,
} from 'schema-typed';
import moment from 'moment';
import br_states from '@Utils/StaticData/br_states.json';
import _ from 'lodash';

export const Session = SchemaModel({
  name: StringType()
    .isRequired('Campo obrigatório')
    .rangeLength(4, 50, 'Somente de 4 a 50 caracteres'),
});

export const PersonalProfile = SchemaModel({
  full_name: StringType().isRequired('Campo obrigatório'),
  birth_city: StringType()
    .addRule((value) => {
      return value === '' || cities.includes(value);
    }, 'Cidade fornecida inexistente')
    .isRequiredOrEmpty('Campo obrigatório ou nulo'),
  birth_state: StringType()
    .addRule((value) => {
      return value === '' || states.includes(value);
    }, 'Estado fornecido inexistente')
    .isRequiredOrEmpty('Campo obrigatório ou nulo'),
  birth_date: StringType()
    .addRule(
      (value) => moment(value, 'DD/MM/YYYY', true).isValid(),
      'Data inválida'
    )
    .pattern(
      /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
      'Data inválida'
    ),
});

export const states = _.map(br_states.estados, (i) => i.nome);

export const cities = _.flattenDeep(_.map(br_states.estados, (i) => i.cidades));

export const NikkeiProfile = SchemaModel({
  jp_generation: NumberType("Deve ser um número").range(2,5,"Número entre 2 e 5"),
  jpFamilyMembers: ArrayType("Deve ser um array").addRule((val, data) => {
    return val.filter(i=> i.length === generationLengths[data.jp_generation])?.length > 0
  }, "Você deve ter pelo menos um familiar do grau de geração selecionado"),
  jpFamilyOrigins: ObjectType("Não é um objeto").addRule((val, data) => {
    //console.log(data.jpFamilyMembers.includes())
    return true
  })
})

export const generationLengths = [0,1,1,3,5,7]