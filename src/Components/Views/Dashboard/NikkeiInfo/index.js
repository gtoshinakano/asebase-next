import React, { useState, useEffect } from 'react';
import Checkbox from '@Components/Styled/Checkbox';
import { useQuery, useIsMutating, useMutation, useQueryClient } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { updateIsNikkei, updateNikkeiProfile } from '@Utils/DefaultQueries/Mutations';
import { getNikkeiProfile } from '@Utils/DefaultQueries/UserQueries'
import {
  newItemsBySelected,
  getOptsByGeneration
} from '@Utils/StaticData/family-data';
import 'react-orgchart/index.css';
import * as schemas from '@Utils/Schemas/User'
import NikkeiPicker from './NikkeiPicker';
import NikkeiBranch from './NikkeiBranch';
import NikkeiOrigins from './NikkeiOrigins';
import { Transition } from '@headlessui/react';
import Confirm from '@Styled/Confirm';

const NikkeiInfo = () => {

  const [form, setForm] = useState(_form);
  const client = useQueryClient()
  const handshake = useQuery('handshake');
  const uid = handshake.data?.data.uid || '';
  const queryKey = ['personal-profile', uid];
  const nikkeiQueryKey = ["nikkei-profile", uid]
  const { data, isLoading } = useQuery(queryKey, { staleTime: Infinity });

  const { jpFamilyMembers, jp_generation } = form;

  const nikkei = useQuery(nikkeiQueryKey, getNikkeiProfile, {staleTime: Infinity})

  useEffect(() => setForm(nikkei.data || _form), [nikkei.data])

  const mutation = useMutation(updateNikkeiProfile, {
    onSuccess: () => {
      client.invalidateQueries(queryKey)
      client.invalidateQueries(nikkeiQueryKey)
    }
  })

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

  const onReset =  (e) => {
    setForm(nikkei.data)
  }

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
        <Transition
          show={data.is_nikkei === 1}
          enter="transition duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="ml-4 pl-3 flex flex-wrap">
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
          </div>
        </Transition>
      </div>
      <Transition
        show={data.is_nikkei === 1}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`w-full overflow-x-scroll p-3 pb-6 bg-gray-100
            ${jpFamilyMembers.length>0 && error.jpFamilyMembers.hasError && "border border-l-0 border-r-0 border-red-400 space-x-2"}
          `}
        >
          <NikkeiBranch 
            jpFamilyMembers={jpFamilyMembers} 
            error={error} 
            familyTree={familyTree} 
            familySelect={familySelect}
            form={form}
          />
        </div>
        <div className="mt-3 px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto flex flex-col">
          {jpFamilyMembers.length > 0 && <NikkeiOrigins 
            form={form}
            error={error}
            originChange={handleOriginChange}
          />}
        </div>
      </Transition>
        
      <Transition
        show={data.is_nikkei === 1}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full px-7 mt-10 mb-10 sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto flex flex-col">
          <div className="ml-3 w-full flex flex-wrap px-1 justify-end">
            {!_.isEqual(form, nikkei.data) && 
            <button 
              className={`py-3 px-4 inline-flex tracking-widest bg-blueGray-300 text-black w-full sm:w-auto hover:bg-blueGray-200`}
              onClick={onReset} 
              type="button"
            >
              <i className="ri-arrow-go-back-line mr-5 text-lg"></i>
              <span className="my-auto">
                Redefinir
              </span>
            </button>}
            <button 
              className={`py-3 px-4 inline-flex tracking-widest
                ${hasError ? "bg-blueGray-200 font-thin text-gray-500 flex-grow cursor-not-allowed text-xs" : "bg-sky-500 font-semibold text-white hover:bg-sky-400"}
              `}
              onClick={() => console.log(form, )}
              disabled={hasError}
            >
              <i className={`${hasError ? "ri-error-warning-fill" : "ri-save-3-fill"} mr-5 text-lg`}></i>
              <span className="my-auto">
                {hasError ? "Preencha os campos corretamente para poder salvar esta seção" : "SALVAR"}
              </span>
            </button>
          </div>
        </div>
      </Transition>
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