import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { useQuery } from 'react-query';
import { getPersonalProfile } from '@Utils/DefaultQueries';
import Skeleton from 'react-loading-skeleton';
import * as schemas from '@Utils/Schemas/User'
import { updateBirthDate, updateBirthCity, updateFullName, updateBirthState } from '@Utils/DefaultQueries/Mutations'
import GenderInput from '@Components/Styled/GenderInput';
import { maskDate } from '@Utils/Helpers/masks';
import moment from 'moment';

const PersonalInfo = () => {

  const handshake = useQuery('handshake')
  const uid = handshake.data?.data.uid || ""
  const queryKey = ["personal-profile", uid]
  const {data, isLoading} = useQuery(queryKey, getPersonalProfile, {staleTime: Infinity})

  let birthDate = moment(data?.birth_date).utc() || ""
  
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
        <GenderInput value={data?.gender || null} queryKey={queryKey} />
      </div>
      <div className="pl-2 mt-3 inline font-thin text-gray-700">
        Natural de 
        <InlineInput
          inline
          placeholder="Município"
          schema={schemas.PersonalProfile}
          name="birth_city"
          value={data?.birth_city || ""}
          mutationFn={updateBirthCity}
          invalidate={queryKey}
          options={schemas.cities}
        />
        , do Estado de
        <InlineInput
          inline
          placeholder="Estado"
          schema={schemas.PersonalProfile}
          name="birth_state"
          value={data?.birth_state || ""}
          mutationFn={updateBirthState}
          invalidate={queryKey}
        />
        , Brasil.
      </div>
      <div className="pl-2 mt-3 inline font-thin text-gray-700">
        Nascido em 
        <InlineInput
          inline
          placeholder="dd/mm/aaaa"
          schema={schemas.PersonalProfile}
          name="birth_date"
          mask={maskDate}
          value={birthDate.format("DD/MM/YYYY")}
          mutationFn={updateBirthDate}
          invalidate={queryKey}
        />.
      </div>
    </>
  );
}

export default PersonalInfo;