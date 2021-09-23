import React from 'react';
import { useSession } from "next-auth/client"
import { useQuery } from "react-query"
import Skeleton from 'react-loading-skeleton';
import InlineInput from '@Components/Styled/InlineInput';
import * as schemas from '@Utils/Schemas/User'

const UserProperties = () => {

  const [session, loading] = useSession()
  const {data, isLoading} = useQuery('handshake')

  return (
    <div className="w-full flex flex-wrap p-1.5 text-trueGray-400 font-thin sm:text-sm">
      <div className="w-1/3 inline-flex py-2">
        <i className="ri-hashtag mr-2"></i> ID
      </div>
      <div className="w-2/3 py-2 px-1.5">
        {!isLoading ? data.data.uid : <Skeleton width={20} />}
      </div>
      <div className="w-1/3 inline-flex py-2">
        <i className="ri-mail-lock-line mr-2 "></i> Email
      </div>
      <div className="w-2/3 py-2 px-1.5">
        {!isLoading ? data.data.email : <Skeleton width={20} />}
      </div>
      <div className="w-1/3 inline-flex py-2">
        <i className="ri-open-arm-line mr-2"></i> Nickname
      </div>
      <div className="w-2/3 ">
        {!isLoading 
          ? <InlineInput 
              value={data.data.name} 
              placeholder="Nome de Exibição"
              inputCSS=""
              name="name"
              schema={schemas.Session}
            /> 
          : <Skeleton width={20} />}
      </div>
      
    </div>
  );
}

export default UserProperties;
