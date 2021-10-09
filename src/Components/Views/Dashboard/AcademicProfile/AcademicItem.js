import React, { useState, useEffect }  from 'react';
import InlineInput from '@Components/Styled/InlineInput';
import { maskOnlyNumbers } from '@Utils/Helpers/masks';
import * as schemas from '@Utils/Schemas/User'
import { useQueryClient } from 'react-query';
import StudyAreaToggle from './StudyAreaToggle';
import moment from 'moment';
import _ from 'lodash'
import Blockquote from '@Components/Styled/BlockQuote';


const AcademicItem = ({data, onChange, onAdd, onRemove, index}) => {

  const [form, setForm] = useState(_form);
  const client = useQueryClient()
  const handshake = client.getQueryData("handshake")
  const user = client.getQueryData(["personal-profile", handshake.data.id])

  useEffect(() => setForm(data), [data])

  const error = schemas.AcademicItem.check(form)
  const hasError = Object.values(error).filter(e=> e.hasError).length > 0

  const onSingleChange = (val, name) => {
    const newForm = {...form, [name]: val}
    setForm(newForm)
    onChange(newForm, index)
  }

  const onNumberChange = (val, name) => {
    const newForm = {...form, [name]: parseInt(val)}
    setForm(newForm)
    onChange(newForm, index)
  }

  const onAddNew = () => onAdd(_form, index)

  const onRemoveItem = () => onRemove(index)

  return (
    <div className={`w-full flex flex-nowrap`}>
      <button
        className={`py-auto px-1.5 hover:bg-gray-200 text-gray-300 hover:text-gray-700 border-r-2 my-4`}
        onClick={onAddNew}
        type="button"
      >
        <i className="ri-add-box-fill text-lg"></i>
      </button>
      <div className="flex-grow sm:pl-2 pb-5">
        <div>
          {user?.gender === "f" ? "👩‍🎓" : "👨‍🎓"} Ano de Conclusão: 
          <InlineInput
            inline
            placeholder="ano de formação"
            schema={schemas.AcademicItem}
            name="year"
            mask={maskOnlyNumbers}
            value={form.year}
            onChange={onNumberChange}
            maxLength={4}
            options={getValidYears()}
          />
          {error.year.hasError && <ErrorDot />}
        </div>
        <div>
          <StudyAreaToggle value={form.study_area} onChange={onSingleChange} name="study_area" />
        </div>
        <div className="pt-3 sm:pt-1.5">
          🎓 Formação em: 
          <InlineInput
            inline
            placeholder="ex: Engenharia Elétrica"
            schema={schemas.AcademicItem}
            name="subject"
            value={form.subject}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.subject.hasError && <ErrorDot />}
        </div>
        <div className="pt-3 sm:pt-3">
          🏫 Instituição de Ensino:
          <InlineInput
            inline
            placeholder="ex: Universidade de São Paulo"
            schema={schemas.AcademicItem}
            name="institution_name"
            value={form.institution_name}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.institution_name.hasError && <ErrorDot />}
        </div>
      </div>
      <button
        className="py-auto px-1 text-red-700 hover:bg-red-50"
        onClick={onRemoveItem}
        type="button"
        //disabled={index === 0}
      >
        <i className="ri-close-circle-fill text-lg"></i>
      </button>
    </div>
  )
}

export default AcademicItem;

const _form = {
  year: "",
  study_area: 1,
  subject: "",
  institution_name: ""
}

const getValidYears = () => _.range(1920, parseInt(moment().format('YYYY')) + 5)

const ErrorDot = () => <div className="rounded-full h-1 w-1 ml-1 bg-red-500 inline-block transform -translate-y-3"></div>