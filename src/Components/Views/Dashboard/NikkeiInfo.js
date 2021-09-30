import React from 'react';
import Checkbox from '@Components/Styled/Checkbox';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import {updateIsNikkei} from '@Utils/DefaultQueries/Mutations'

const NikkeiInfo = ({open}) => {

  const handshake = useQuery('handshake')
  const uid = handshake.data?.data.uid || ""
  const queryKey = ["personal-profile", uid]
  const {data, isLoading} = useQuery(queryKey, {staleTime: Infinity})

  if(isLoading) return <Skeleton className="w-50 h-5" />

  return (
    <div className="pl-2 mt-3 font-thin text-gray-700 pt-4">
      <Checkbox 
        checked={data.is_nikkei}
        labels={["Não possui ascendência japonesa", "Possui ascendência japonesa"]}
        loading={isLoading}
        mutationFn={updateIsNikkei}
        name="is_nikkei"
      /> 
    </div>
  );
}

export default NikkeiInfo;
