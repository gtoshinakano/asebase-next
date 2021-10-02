import React, { useState, useEffect } from 'react';
import Checkbox from '@Components/Styled/Checkbox';
import { useQuery, useIsMutating } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import {updateIsNikkei} from '@Utils/DefaultQueries/Mutations'
import { RadioGroup } from '@headlessui/react'
import {newItemsBySelected, getOptsByGeneration} from '@Utils/StaticData/family-data'
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const NikkeiInfo = ({open}) => {

  const [form, setForm] = useState(_form)
  const handshake = useQuery('handshake')
  const uid = handshake.data?.data.uid || ""
  const queryKey = ["personal-profile", uid]
  const {data, isLoading} = useQuery(queryKey, {staleTime: Infinity})
  const isMutating = useIsMutating("is_nikkei")



  const {jpFamilyMembers, jp_generation, jpFamilyOrigins} = form
  const familyTree = newItemsBySelected(jpFamilyMembers,getOptsByGeneration(jp_generation))

  const familySelect = (e) => {
    let members = jpFamilyMembers
    const index = members.indexOf(e)
    if(index > -1) members.splice(index, 1)
    else {
      members = _.remove(members, (m) => !m.startsWith(e))
      members.push(e)
    }
    const newForm = {
      ...form,
      jpFamilyMembers: members,
      jpFamilyOrigins: members.reduce((acc, cur) => {
        acc[cur] = 'JP'
        return acc
      }, {})
    }
    setForm(newForm)
  }

  const generationSelect = (e) => setForm( {...form, jp_generation: e.generation, jpFamilyMembers: [],
    jpFamilyOrigins: {}})

  if(isLoading) return <Skeleton className="w-50 h-5" />

  return (
    <>
      <div className="px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto flex flex-col">
        <div className="pl-1.5 mt-3 font-thin text-gray-700 pt-4">
          <Checkbox 
            checked={data.is_nikkei === 1}
            labels={["Não possui ascendência japonesa", "Possui ascendência japonesa"]}
            loading={isLoading}
            mutationFn={updateIsNikkei}
            invalidate={queryKey}
            name="is_nikkei"
            confirm={{
              when: true, title: "Deseja realmente realizar esta alteração?",
              message: "ATENÇÃO: ao clicar em Sim, seus dados de ascendência preenchidos serão apagados",
              confirmBtn: <div className="w-12 inline-flex">
                <i className="ri-check-line mr-3"></i> Sim
              </div>, 
              cancelBtn: <div className="w-12 inline-flex">
                <i className="ri-delete-back-2-line mr-3"></i> Não
              </div>
            }}
          /> 
        </div>
        { data.is_nikkei === 1 &&
          <div className="ml-4 pl-3 border-l-4 border-sky-500 flex flex-wrap">
            {isMutating ? <div>
              <Skeleton width={100} height={100} count={4} className="h-14" />
              <Skeleton width={100} height={100} className="h-14" />
            </div>
            : <NikkeiPicker 
                selected={_.filter(generations, g=>g.generation===jp_generation)[0]} 
                onSelect={generationSelect} 
              />
            }
          </div>
        }
      </div>
      <div className="w-full overflow-scroll ">
        <OrgChart
          tree={familyTree}
          NodeComponent={({node}) => <NikkeiBranch node={node} onSelect={familySelect} />}
        />
      </div>
    </>
  );
}

export default NikkeiInfo;

const NikkeiPicker = ({selected, onSelect}) => {

  return (
    <div className="w-full flex flex-wrap px-1">
      <h2 className="p-2">Grau de Ascendência:</h2>
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
                    checked ? 'bg-sky-600 bg-opacity-75 text-white hover:bg-sky-600' : 'bg-white print:hidden'
                  }
                  ${generation.generation === 1 ? "bg-gray-200 cursor-not-allowed text-warmGray-400" :"hover:bg-sky-100"}
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
                              checked ? 'text-white text-4xl' : 'text-gray-900 text-xl'
                            }`}
                          >
                            <em className="float-right text-xs font-thin">geração</em>
                            <i className={`ri-number-${generation.generation}`}></i>
                            <small className={`ml-0.5`}>ª</small>

                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`text-center ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span className={`${checked ? "text-base": "text-xs"} mr-2`}>
                              {generation.jp_title}
                            </span>
                            
                            <span className="text-xs mr-4">
                              {generation.romaji_title}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                        <div className="flex-shrink-0 text-4xl mr-3 sm:m-0 md:text-xl">
                          {checked 
                            ? <i className="ri-organization-chart text-white"></i> 
                            : <i className="ri-checkbox-blank-circle-line text-trueGray-700"></i>}
                        </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <h2 className="p-2">Familiares Imigrantes Japoneses:</h2>
    </div>
  )
}

const NikkeiBranch = ({node, onSelect, selected}) => {

  return (
    <div className="">
      <button
        className={`py-1.5 px-1.5 min-w-90px whitespace-nowrap mx-1 rounded-lg text-sm shadow-lg hover:bg-sky-100 focus:bg-sky-600 focus:text-white
        ${selected?.includes(node.value) 
            ? "font-semibold ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
            : "font-extralight"}
        `}
        onClick={() => onSelect(node.value)}
      >{node.selected && <i className="ri-flag-line"></i>} { node.label }</button>
    </div>
  );
};

const generations = [
  {
    generation: 1,
    jp_title: '一世',
    romaji_title: 'Issei',
  　description: 'Você é imigrante Japonês'
  },
  {
    generation: 2,
    jp_title: '二世',
    romaji_title: 'Nissei',
  　description: 'Seu pai ou sua mãe é imigrante Japonês'
  },
  {
    generation: 3,
    jp_title: '三世',
    romaji_title: 'Sansei',
  　description: 'Pelo menos um de seus avós é imigrante Japonês'
  },
  {
    generation: 4,
    jp_title: '四世',
    romaji_title: 'Yonsei',
  　description: 'Pelo menos um de seus bisavós é imigrante Japonês'
  },
  {
    generation: 5,
    jp_title: '五世',
    romaji_title: 'Gosei',
  　description: 'Pelo menos um de seus tataravós é imigrante Japonês'
  }
]

const _form = {
  jp_generation: 2,
  jpFamilyMembers: [],
  jpFamilyOrigins: {}
}