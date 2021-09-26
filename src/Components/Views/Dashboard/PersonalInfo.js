import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { useQuery } from 'react-query';
import { getPersonalProfile } from '@Utils/DefaultQueries';
import Skeleton from 'react-loading-skeleton';
import * as schemas from '@Utils/Schemas/User'
import { updateFullName } from '@Utils/DefaultQueries/Mutations'
import GenderInput from '@Components/Styled/GenderInput';

const PersonalInfo = () => {

  const handshake = useQuery('handshake')
  const uid = handshake.data?.data.uid || ""
  const queryKey = ["personal-profile", uid]
  const {data, isLoading, isFetching} = useQuery(queryKey, getPersonalProfile, {staleTime: Infinity})
  console.log(isLoading, isFetching)

  if(isLoading) return (<Skeleton className="w-full h-10" />)

  else return (
    <>
      <div className="pr-1.5" >
        <InlineInput 
          value={data?.full_name || ""} 
          placeholder="Nome Completo"
          inputCSS="text-3xl"
          name="full_name"
          schema={schemas.PersonalProfile}
          mutationFn={updateFullName}
          invalidate={queryKey}
          loading={isLoading}
        />
      </div>
      <div className="pr-1.5" >
        <GenderInput value={data?.gender || null} />
      </div>
      <div className="pr-1.5 mt-3 inline font-thin text-gray-700">
        Natural de 
        <InlineInput
          inline
          placeholder="Município"
          schema={schemas.PersonalProfile}
          name="birth_city"
        />
        , do Estado de
        <InlineInput
          inline
          placeholder="Estado"
        />
        , Brasil.
      </div>
    </>
  );
}

export default PersonalInfo;
