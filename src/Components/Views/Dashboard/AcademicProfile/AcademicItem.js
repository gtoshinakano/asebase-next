import React, { useState, useEffect }  from 'react';
import InlineInput from '@Components/Styled/InlineInput';
import { maskOnlyNumbers } from '@Utils/Helpers/masks';
import { useQueryClient } from 'react-query';
import StudyAreaToggle from './StudyAreaToggle';
import moment from 'moment';
import _ from 'lodash'


const AcademicItem = ({data, onChange, index}) => {

  const [form, setForm] = useState(_form);
  const client = useQueryClient()
  const handshake = client.getQueryData("handshake")
  const user = client.getQueryData(["personal-profile", handshake.data.id])

  useEffect(() => setForm(data), [data])


  


  const onGradChange= (e) => console.log(e)

  return (
    <div className="w-full flex flex-nowrap">
      <button
        className="py-auto px-1.5 hover:bg-gray-200 text-gray-300 hover:text-gray-700"
      >
        <i className="ri-add-box-fill text-lg"></i>
      </button>
      <div className="flex-grow pl-o sm:pl-2 pb-5">
        <div>
          {user?.gender === "f" ? "👩‍🎓" : "👨‍🎓"} Ano de Conclusão: 
          <InlineInput
            inline
            placeholder="ano de formação"
            //schema={schemas.PersonalProfile}
            name="year"
            mask={maskOnlyNumbers}
            value={form.year}
            onChange={onGradChange}
            maxLength={4}
            options={getValidYears()}
          />
        </div>
        <div>
          <StudyAreaToggle value={form.study_area} />
        </div>
        <div className="pt-3 sm:pt-0">
          🎓 Formação em: 
          <InlineInput
            inline
            placeholder="ex: Engenharia Elétrica"
            //schema={schemas.PersonalProfile}
            name="subject"
            value={form.subject}
            onChange={onGradChange}
          />
        </div>
        <div className="pt-3 sm:pt-0">
          🏫 Instituição
          <InlineInput
            inline
            placeholder="ex: Universidade de ..."
            //schema={schemas.PersonalProfile}
            name="institution_name"
            value={form.institution_name}
            onChange={onGradChange}
          />
        </div>
      </div>
      <button
        className="py-auto px-1 text-red-700 hover:bg-red-50"
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