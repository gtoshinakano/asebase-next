import React, { useState } from 'react';
import Checkbox from '@Components/Styled/Checkbox';
import { useQuery, useIsMutating } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { updateIsNikkei } from '@Utils/DefaultQueries/Mutations';
import {
  newItemsBySelected,
  getOptsByGeneration
} from '@Utils/StaticData/family-data';
import 'react-orgchart/index.css';
import * as schemas from '@Utils/Schemas/User'
import NikkeiPicker from './NikkeiPicker';
import NikkeiBranch from './NikkeiBranch';
import NikkeiOrigins from './NikkeiOrigins';

const NikkeiInfo = () => {
  const [form, setForm] = useState(_form);
  const handshake = useQuery('handshake');
  const uid = handshake.data?.data.uid || '';
  const queryKey = ['personal-profile', uid];
  const { data, isLoading } = useQuery(queryKey, { staleTime: Infinity });
  const isMutating = useIsMutating('is_nikkei');

  const { jpFamilyMembers, jp_generation } = form;

  const familyTree = newItemsBySelected(
    jpFamilyMembers,
    getOptsByGeneration(jp_generation)
  );

  const generationSelect = (e) =>
    setForm({
      ...form,
      jp_generation: e.generation,
      jpFamilyMembers: [],
      jpFamilyOrigins: {},
    });

  const familySelect = (id, label) => {
    let members = jpFamilyMembers;
    const index = members.indexOf(id);
    if (index > -1) members.splice(index, 1);
    else {
      members = _.remove(members, (m) => !m.startsWith(id));
      members.push(id);
    }
    const newForm = {
      ...form,
      jpFamilyMembers: members,
      jpFamilyOrigins: members.reduce((acc, cur) => {
        acc[cur] = '';
        return acc;
      }, {}),
    };
    setForm(newForm);
  };

  const error = schemas.NikkeiProfile.check(form)
  const hasError = Object.values(schemas.NikkeiProfile.check(form)).filter(e=> e.hasError).length > 0
  console.log(hasError)

  const handleOriginChange = (v, member) => {
    const newForm = {
      ...form,
      jpFamilyOrigins: { ...form.jpFamilyOrigins, [member]: v },
    };
    setForm(newForm);
  };

  if (isLoading) return (<Skeleton width="100%" height="420" />)

  return (
    <>
      <div className="px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto flex flex-col">
        <div className="pl-1.5 mt-3 font-thin text-gray-700 pt-4">
          <Checkbox
            checked={data.is_nikkei === 1}
            labels={[
              'Não possui ascendência japonesa',
              'Possui ascendência japonesa',
            ]}
            loading={isLoading}
            mutationFn={updateIsNikkei}
            invalidate={queryKey}
            name="is_nikkei"
            confirm={{
              when: true,
              title: 'Deseja realmente realizar esta alteração?',
              message:
                'ATENÇÃO: ao clicar em Sim, seus dados de ascendência preenchidos serão apagados',
              confirmBtn: (
                <div className="w-12 inline-flex">
                  <i className="ri-check-line mr-3"></i> Sim
                </div>
              ),
              cancelBtn: (
                <div className="w-12 inline-flex">
                  <i className="ri-delete-back-2-line mr-3"></i> Não
                </div>
              ),
            }}
          />
        </div>
        {data.is_nikkei === 1 && (
          <div className="ml-4 pl-3 flex flex-wrap">
            {isMutating || isLoading ? (
              <div>
                <Skeleton width={100} height={100} count={4} className="m-2" />
                <Skeleton width={100} height={100} className="h-14" />
              </div>
            ) : (
              <NikkeiPicker
                selected={
                  _.filter(
                    generations,
                    (g) => g.generation === jp_generation
                  )[0]
                }
                onSelect={generationSelect}
                generations={generations}
              />
            )}
          </div>
        )}
      </div>
      {data.is_nikkei === 1 && (
        <>
          <div className={`w-full overflow-x-scroll m-auto p-3 pb-6 bg-gray-100
              ${jpFamilyMembers.length>0 && error.jpFamilyMembers.hasError && "border border-red-400 m-3"}
            `}
          >
            {!isMutating ? (
              <NikkeiBranch 
                jpFamilyMembers={jpFamilyMembers} 
                error={error} 
                familyTree={familyTree} 
                familySelect={familySelect}
                form={form}
              />
            ) : (
              <Skeleton height={415} />
            )}
          </div>
          <div className="mt-3 px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto flex flex-col">
            <NikkeiOrigins 
              form={form}
              error={error}
              originChange={handleOriginChange}
            />
          </div>
        </>
      )}
      {data.is_nikkei === 1 && (
        <div className="w-full px-7 mt-5 mb-10 sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto flex flex-col">
          <div className="ml-3 w-full flex flex-wrap px-1 justify-end">
            <button className={`py-3 px-4 inline-flex tracking-widest
              ${hasError ? "bg-blueGray-200 font-thin text-gray-500" : "bg-blue-500 font-semibold text-white"}
            `}>
              <i className={`${hasError ? "ri-error-warning-fill" : "ri-save-3-fill"} mr-5 text-lg`}></i>
              {hasError ? "Verifique se peencheu os dados corretamente" : "SALVAR"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NikkeiInfo;

const _form = {
  jp_generation: 2,
  jpFamilyMembers: [],
  jpFamilyOrigins: {},
};

const generations = [
  {
    generation: 1,
    jp_title: '一世',
    romaji_title: 'Issei',
    description: 'Você é imigrante Japonês',
  },
  {
    generation: 2,
    jp_title: '二世',
    romaji_title: 'Nissei',
    description: 'Seu pai ou sua mãe é imigrante Japonês',
  },
  {
    generation: 3,
    jp_title: '三世',
    romaji_title: 'Sansei',
    description: 'Pelo menos um de seus avós é imigrante Japonês',
  },
  {
    generation: 4,
    jp_title: '四世',
    romaji_title: 'Yonsei',
    description: 'Pelo menos um de seus bisavós é imigrante Japonês',
  },
  {
    generation: 5,
    jp_title: '五世',
    romaji_title: 'Gosei',
    description: 'Pelo menos um de seus tataravós é imigrante Japonês',
  },
];