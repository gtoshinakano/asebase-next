import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { useQueryClient } from 'react-query';

const DashboardView = () => {

  const client = useQueryClient()
  const data = client.getQueryData("handshake")
  console.log(data)

  if(data) return (
    <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-5/12 flex-grow mx-auto pt-12 flex flex-col">
      <h1 className="text-4xl font-black inline-flex"><i className="ri-map-pin-user-fill mr-2 pb-5"></i> MEMBRO ASEBASE #{data.data?.id || "no"}</h1>
      
      <InlineInput 
        value={""} 
        placeholder="Nome Completo"
        inputCSS="text-3xl"
      />
    </div>
    );
  else return("Loading")

}

export default DashboardView;
