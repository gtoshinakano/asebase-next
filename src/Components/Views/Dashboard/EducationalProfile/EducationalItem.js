import React, { useState }  from 'react';
import InlineInput from '@Components/Styled/InlineInput';
import { maskOnlyNumbers } from '@Utils/Helpers/masks';
import { useQueryClient } from 'react-query';
import StudyAreaToggle from './StudyAreaToggle';


const EducationalItem = ({items, onChange}) => {

  const client = useQueryClient()
  const {data} = client.getQueryData("handshake")
  const user = client.getQueryData(["personal-profile", data.id])


  const onGradChange= (e) => console.log(e)

  return (
    <div className="w-full flex flex-nowrap">
      <button
        className="py-auto px-1 hover:bg-blueGray-200 bg-blueGray-100"
      >
        <i className="ri-add-box-fill"></i>
      </button>
      <div className="flex-grow text-sm pl-1.5 pb-5">
        <div>
          {user?.gender === "f" ? "👩‍🎓" : "👨‍🎓"} Ano de Conclusão: 
          <InlineInput
            inline
            placeholder="ano de formação"
            //schema={schemas.PersonalProfile}
            name="year"
            mask={maskOnlyNumbers}
            value={""}
            onChange={onGradChange}
            maxLength={4}
          />
        </div>
        <div>
          <StudyAreaToggle value={1} />
        </div>
        <div className="pt-3 sm:pt-0">
          🎓 Formação em: 
          <InlineInput
            inline
            placeholder="ex: Engenharia Elétrica"
            //schema={schemas.PersonalProfile}
            name="subject"
            value={""}
            onChange={onGradChange}
          />
        </div>
        <div className="pt-3 sm:pt-0">
          🏫 Instituição
          <InlineInput
            inline
            placeholder="ex: Universidade de São Paulo"
            //schema={schemas.PersonalProfile}
            name="subject"
            value={""}
            onChange={onGradChange}
            maxLength={4}
          />
        </div>
      </div>
      <button
        className="py-auto px-1 text-red-700 hover:bg-red-50"
      >
        <i className="ri-close-circle-fill"></i>
      </button>
    </div>
  )
}

export default EducationalItem;
