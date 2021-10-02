import React, { useState, useEffect } from 'react';
import Checkbox from '@Components/Styled/Checkbox';
import { useQuery, useIsMutating } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { updateIsNikkei } from '@Utils/DefaultQueries/Mutations';
import { RadioGroup } from '@headlessui/react';
import {
  newItemsBySelected,
  getOptsByGeneration,
  familyLabels
} from '@Utils/StaticData/family-data';
import {JAPAN_PROVINCES} from '@Utils/StaticData/json-data'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import InlineInput from '@Components/Styled/InlineInput';
import * as schemas from '@Utils/Schemas/User'

const NikkeiInfo = ({ open }) => {
  const [form, setForm] = useState(_form);
  const handshake = useQuery('handshake');
  const uid = handshake.data?.data.uid || '';
  const queryKey = ['personal-profile', uid];
  const { data, isLoading } = useQuery(queryKey, { staleTime: Infinity });
  const isMutating = useIsMutating('is_nikkei');

  const { jpFamilyMembers, jp_generation, jpFamilyOrigins } = form;

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
  console.log(Object.values(error).filter(e=> e.hasError))

  const handleOriginChange = (v, member) => {
    const newForm = {
      ...form,
      jpFamilyOrigins: { ...form.jpFamilyOrigins, [member]: v },
    };
    setForm(newForm);
    console.log(newForm)
  };

  if (isLoading) return <Skeleton className="w-50 h-5" />;

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
          <div className="ml-4 pl-3flex flex-wrap">
            {isMutating ? (
              <div>
                <Skeleton width={100} height={100} count={4} className="h-14" />
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
              <>
                <div className="relative">
                  {jpFamilyMembers.length>0 && error.jpFamilyMembers.hasError &&
                    <div className="absolute left-0 p-2 text-red-600 text-xs font-extralight w-5/12 md:w-1/3">
                    <i className="ri-feedback-fill mr-2"></i> {error.jpFamilyMembers.errorMessage}
                  </div>
                  }
                  <div className="absolute right-0 p-2 border-2 border-gray-500 bg-white text-xs font-semibold opacity-50 w-1/3 sm:w-1/4 md:w-1/4">
                    🍙 Imigrantes japoneses
                  </div>
                </div>
                <OrgChart
                  tree={familyTree}
                  NodeComponent={({ node }) => (
                    <NikkeiBranch 
                      node={node} 
                      onSelect={familySelect} 
                      formValue={form} 
                      hasError={jpFamilyMembers.length>0 && error.jpFamilyMembers.hasError}
                    />
                  )}
                />
              </>
            ) : (
              <Skeleton height={415} />
            )}
          </div>
          <div className="mt-3 px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto flex flex-col">
            <div className="ml-4 pl-3 flex flex-wrap">
              <h2 className="p-2 mb-1">
                3. De qual ou quais províncias eles vieram?
              </h2>
              {jpFamilyMembers.length>0 && error.jpFamilyMembers.hasError ? (
                <div className="py-2 px-4 w-full text-red-300 text-xs inline-flex border-l-4 border-red-400 ml-3 align-middle">
                <i className="ri-feedback-fill mr-3 text-base"></i> {error.jpFamilyMembers.errorMessage}
              </div>
              ): error.jpFamilyOrigins.hasError ? (
                <div className="py-2 px-4 w-full text-red-300 text-xs inline-flex border-l-4 border-red-400 ml-3 align-middle">
                  <i className="ri-feedback-fill mr-3 text-base"></i> {error.jpFamilyOrigins.errorMessage}
                </div>
              ): null}
              {jpFamilyMembers.map((i) => (
                <div className="w-3/4 m-2 font-extralight flex" key={i}>
                  <span className="pt-4">{familyLabels[i]} é imigrante de</span>
                  <div className="flex-grow"><InlineInput 
                    inline
                    placeholder="Província"
                    name={i}
                    value={jpFamilyOrigins[i]}
                    minSuggestionLength={2}
                    options={JAPAN_PROVINCES.map(i=> i.name)}
                    onChange={(v) => handleOriginChange(v, i)}
                  />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NikkeiInfo;

const NikkeiPicker = ({ selected, onSelect }) => {
  return (
    <div className="w-full flex flex-wrap px-1">
      <h2 className="p-2 mt-5 mb-1">
        1. Qual é o seu grau de descendência japonesa?
      </h2>
      <div className="w-full">
        <RadioGroup value={selected} onChange={onSelect}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2 flex flex-wrap">
            {generations.map((generation) => (
              <RadioGroup.Option
                key={generation.generation}
                value={generation}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked
                      ? 'bg-sky-600 bg-opacity-75 text-white hover:bg-sky-600'
                      : 'bg-white print:hidden'
                  }
                  ${
                    generation.generation === 1
                      ? 'bg-gray-200 cursor-not-allowed text-warmGray-400'
                      : 'hover:bg-sky-100'
                  }
                  w-full sm:w-1/2 lg:w-1/6 ml-1 mr-2 relative rounded-lg shadow-lg pl-4 pr-3 py-3 cursor-pointer flex focus:outline-none`
                }
                disabled={generation.generation === 1}
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex">
                        <div className="">
                          <RadioGroup.Label
                            as="h1"
                            className={`font-medium ${
                              checked
                                ? 'text-white text-4xl'
                                : 'text-gray-900 text-xl'
                            }`}
                          >
                            <em className="float-right text-xs font-thin">
                              geração
                            </em>
                            <i
                              className={`ri-number-${generation.generation}`}
                            ></i>
                            <small className={`ml-0.5`}>ª</small>
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`text-center ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span
                              className={`${
                                checked ? 'text-base' : 'text-xs'
                              } mr-2`}
                            >
                              {generation.jp_title}
                            </span>

                            <span className="text-xs mr-4">
                              {generation.romaji_title}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-4xl mr-3 sm:m-0 md:text-xl">
                        {checked ? (
                          <i className="ri-organization-chart text-white"></i>
                        ) : (
                          <i className="ri-checkbox-blank-circle-line text-trueGray-700"></i>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="ml-2 mt-7 text-xs border p-5 bg-purple-50">
        <p>
          O seu Grau de Descendência é determinado a partir do{' '}
          <b>primeiro japonês imigrante</b> da qual você possui laços
          consangüíneos. No caso, ele seria o imigrante de 1ª Geração (o{' '}
          <i>Issei</i>), os seus filhos seriam da 2ª geração (<i>Nissei</i>),
          seus netos da 3ª (<i>Sansei</i>) e assim por diante.
        </p>
      </div>
      <h2 className="p-2 mt-8 mb-1">
        2. Quem são os seus familiares imigrantes japoneses?
      </h2>
    </div>
  );
};

const NikkeiBranch = ({ node, onSelect, formValue, hasError }) => {
  
  const gen = formValue.jp_generation
  const shouldError = hasError && schemas.generationLengths[gen] === node.value?.length
  return (
    <div className="">
      <button
        className={`py-1.5 px-1.5 min-w-90px whitespace-nowrap mx-1 rounded-lg text-sm shadow-lg hover:bg-sky-200 focus:bg-sky-600 focus:text-white inline-flex items-center justify-center hover:text-black
          ${
            node.selected
              ? 'bg-sky-500 text-white ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
              : 'font-extralight bg-white text-black'
          }
          ${
            shouldError && 'ring-2 ring-offset-2 ring-offset-red-300 ring-white ring-opacity-60'
          }
        `}
        onClick={node.value ? () => onSelect(node.value, node.label) : null}
      >
        {node.selected && <span className="mr-1">🍙</span>} {node.label}
      </button>
    </div>
  );
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

const _form = {
  jp_generation: 2,
  jpFamilyMembers: [],
  jpFamilyOrigins: {},
};
