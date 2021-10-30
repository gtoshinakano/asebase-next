import Blockquote from '@Components/Styled/BlockQuote';
import { RadioGroup } from '@headlessui/react';

const NikkeiPicker = ({ selected, onSelect, generations }) => {
  return (
    <div className="w-full flex flex-wrap px-1">
      <div className="w-full">
        <h2 className="p-2 mt-5 mb-1 print:mx-auto">
          1. Qual é o seu grau de descendência japonesa?
        </h2>
        <Blockquote
          icon="ri-questionnaire-fill text-4xl"
          className="border-gray-300 text-gray-500 tracking-wider ml-2 mb-6 print:hidden"
        >
          O seu Grau de Descendência é determinado a partir do{' '}
          <b>primeiro japonês imigrante</b> da qual você possui laços
          consangüíneos. No caso, ele seria o imigrante de 1ª Geração (o{' '}
          <i>Issei</i>), os seus filhos seriam da 2ª geração (<i>Nissei</i>),
          seus netos da 3ª (<i>Sansei</i>) e assim por diante.
        </Blockquote>
        <RadioGroup value={selected} onChange={onSelect}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2 flex flex-wrap justify-evenly">
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
                      : 'hover:bg-sky-100 transition duration-75 ease-in-out transform hover:scale-110'
                  }
                  w-full sm:w-1/2 lg:w-1/6 ml-1 mr-2 relative rounded-lg shadow-lg pl-4 pr-3 py-3 cursor-pointer flex focus:outline-none `
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
      <h2 className="p-2 mt-8 mb-1">
        2. Quem são os seus familiares imigrantes japoneses?
      </h2>
    </div>
  );
};

export default NikkeiPicker;
