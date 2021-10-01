import React, { useState } from 'react';
import Checkbox from '@Components/Styled/Checkbox';
import { useQuery, useIsMutating } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import {updateIsNikkei} from '@Utils/DefaultQueries/Mutations'
import { RadioGroup } from '@headlessui/react'

const NikkeiInfo = ({open}) => {

  const handshake = useQuery('handshake')
  const uid = handshake.data?.data.uid || ""
  const queryKey = ["personal-profile", uid]
  const {data, isLoading} = useQuery(queryKey, {staleTime: Infinity})
  const isMutating = useIsMutating("is_nikkei")

  if(isLoading) return <Skeleton className="w-50 h-5" />

  return (
    <>
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
          : <NikkeiPicker />
          }
        </div>
      }
    </>
  );
}

export default NikkeiInfo;

const NikkeiPicker = () => {
  const [selected, setSelected] = useState(generations[0])

  return (
    <div className="w-full px-4">
      <div className="w-full">
        <RadioGroup value={selected} onChange={setSelected}>
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
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                  w-full sm:w-1/2 lg:w-1/5 m-2 relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {generation.jp_title}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {generation.jp_title}/{generation.romaji_title}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{generation.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <i className="ri-check-fill"></i>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

const generations = [
  {
    generation: 1,
    jp_title: '一生',
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