import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { useQueryClient } from 'react-query';
import UserProperties from './UserProperties'

const DashboardView = () => {

  return(
    <div className="w-full px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto pt-12 flex flex-col">
      <h1 className="text-4xl font-black inline-flex"><i className="ri-map-pin-user-fill mr-2 pb-4"></i> MEMBRO ASEBASE</h1>
      <UserProperties />
      <InlineInput 
        value={""} 
        placeholder="Nome Completo"
        inputCSS="text-3xl"
      />
    </div>
  )

}

export default DashboardView;
