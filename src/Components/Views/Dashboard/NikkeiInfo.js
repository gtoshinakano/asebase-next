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
        checked={data.is_nikkei === 1}
        labels={["Não possui ascendência japonesa", "Possui ascendência japonesa"]}
        loading={isLoading}
        mutationFn={updateIsNikkei}
        invalidate={queryKey}
        name="is_nikkei"
        confirm={{
          when: true, title: "ATENÇÃO! Tem certeza de que quer continuar?",
          message: "* Seus dados de ascendência preenchidos serão apagados caso confirme",
          confirmBtn: <div className="w-12 inline-flex">
            <i className="ri-check-line mr-3"></i> Sim
          </div>, 
          cancelBtn: <div className="w-12 inline-flex">
            <i className="ri-delete-back-2-line mr-3"></i> Não
          </div>
        }}
      /> 
    </div>
  );
}

export default NikkeiInfo;
