import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { useQuery } from 'react-query';
import { getPersonalProfile } from '@Utils/DefaultQueries';
import Skeleton from 'react-loading-skeleton';
import * as schemas from '@Utils/Schemas/User';
import {
  updateBirthDate,
  updateBirthCity,
  updateFullName,
  updateBirthState,
} from '@Utils/DefaultQueries/Mutations';
import GenderInput from '@Components/Styled/GenderInput';
import { maskDate } from '@Utils/Helpers/masks';
import moment from 'moment';
import _ from 'lodash';
import br_states from '@Utils/StaticData/br_states.json';
import UserProperties from './UserProperties';

const PersonalInfo = () => {
  const handshake = useQuery('handshake');
  const uid = handshake.data?.data.uid || '';
  const queryKey = ['personal-profile', uid];
  const { data, isLoading, isFetched } = useQuery(
    queryKey,
    getPersonalProfile,
    {
      staleTime: Infinity,
    }
  );

  let birthDate = moment(data?.birth_date).utc() || '';

  if (isLoading || !isFetched) return <PersonalProfileSkeleton />;
  else
    return (
      <>
        <div className="pr-1.5">
          <InlineInput
            value={data?.full_name || ''}
            placeholder="Nome Completo"
            inputCSS="text-3xl"
            name="full_name"
            schema={schemas.PersonalProfile}
            mutationFn={updateFullName}
            invalidate={queryKey}
            loading={isLoading}
          />
        </div>
        <div className="pr-1.5">
          <GenderInput value={data?.gender || null} queryKey={queryKey} />
        </div>
        <div className="pl-2 mt-3 inline font-thin text-gray-700">
          🌎 Natural de
          <InlineInput
            inline
            placeholder="Município"
            schema={schemas.PersonalProfile}
            name="birth_city"
            value={data?.birth_city || ''}
            mutationFn={updateBirthCity}
            invalidate={queryKey}
            options={schemas.cities}
            minSuggestionLength={3}
          />
          , do Estado de
          <InlineInput
            inline
            placeholder="Estado"
            schema={schemas.PersonalProfile}
            name="birth_state"
            value={data?.birth_state || ''}
            mutationFn={updateBirthState}
            invalidate={queryKey}
            minSuggestionLength={0}
            options={
              data?.birth_city && data?.birth_city.length > 0
                ? getEstadosByCityName(data.birth_city)
                : _.map(br_states.estados, (i) => i.nome)
            }
          />
          , Brasil.
        </div>
        <div className="pl-2 mt-3 inline font-thin text-gray-700">
          🎂 Nascido em
          <InlineInput
            inline
            placeholder="dd/mm/aaaa"
            schema={schemas.PersonalProfile}
            name="birth_date"
            mask={maskDate}
            value={birthDate.format('DD/MM/YYYY')}
            mutationFn={updateBirthDate}
            invalidate={queryKey}
          />
          .
        </div>
      </>
    );
};

export default PersonalInfo;

const getEstadosByCityName = (city) => {
  const filtered = _.filter(br_states.estados, (i) => {
    return i.cidades.includes(city);
  });
  return [filtered[0]?.nome];
};

const PersonalProfileSkeleton = () => (
  <div className="h-96 w-full p-2">
    <Skeleton className="w-full h-12 mt-2" />
    <Skeleton width="35%" className="block w-1/4 h-8 mt-4" />
    <br />
    <Skeleton width="50%" className="block w-full h-8 my-3" />
    <br />
    <Skeleton width="80%" className="block w-full h-8 mb-3 my-2" />
    <br />
    <Skeleton width="30%" className="block w-full h-8 mb-3 my-2" />
    <br />
    <Skeleton width="50%" className="block w-full h-8 mb-3 my-2" />
  </div>
);
