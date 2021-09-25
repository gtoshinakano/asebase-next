import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { useQuery } from 'react-query';
import { getPersonalProfile } from '@Utils/DefaultQueries';

const PersonalInfo = () => {

  const handshake = useQuery('handshake')
  const uid = handshake.data?.data.uid || ""
  const queryKey = ["personal-profile", uid]
  const {data, isLoading} = useQuery(queryKey, async () => await getPersonalProfile(), {staleTime: Infinity})

  return (
    <div className="pr-1.5" >
      <InlineInput 
        value={""} 
        placeholder="Nome Completo"
        inputCSS="text-3xl"
      />
    </div>
  );
}

export default PersonalInfo;
