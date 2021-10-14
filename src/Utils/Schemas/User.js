import {
  SchemaModel,
  StringType,
  DateType,
  NumberType,
  ObjectType,
  ArrayType,
  MixedType,
  BooleanType,
} from 'schema-typed';
import moment from 'moment';
import br_states from '@Utils/StaticData/br_states.json';
import _ from 'lodash';
import {JAPAN_PROVINCES} from '@Utils/StaticData/json-data'

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
  }, "Você deve ter pelo menos um familiar com o grau de geração selecionado"),
  jpFamilyOrigins: ObjectType("Não é um objeto").addRule((val, data) => {
    const provinces = JAPAN_PROVINCES.map(i=> i.name)
    const values = Object.values(val)
    return _.difference(values, provinces).length === 0
  }, "Selecione um valor válido para as províncias ou selecione a opção Japão")
})

export const generationLengths = [0,1,1,3,5,7]

export const AcademicItem = SchemaModel({
  year: NumberType("Não é um número").isRequired("Campo obrigatório").range(1920, parseInt(moment().format('YYYY')) + 5, "Ano fora do intervalo válido"),
  study_area: NumberType().range(1,3,"Algo errado aconteceu"),
  subject: StringType().isRequired("Campo obrigatório"),
  institution_name: StringType().isRequired("Campo obrigatório")
})

export const AcademicList = ArrayType().isRequired("obrig").of(AcademicItem)

export const ProfessionalItem = SchemaModel({
  start_year: NumberType("Não é um número").isRequired("Campo obrigatório").range(1920, parseInt(moment().format('YYYY')) + 5, "Ano fora do intervalo válido"),
  end_year: NumberType("Não é um número").isRequired("Campo obrigatório").range(1920, parseInt(moment().format('YYYY')) + 5, "Ano fora do intervalo válido"),
  position: StringType().isRequired("Campo obrigatório"),
  company_name: StringType().isRequired("Campo obrigatório"),
})

export const ProfessionalList = ArrayType().isRequired("obrig").of(ProfessionalItem)