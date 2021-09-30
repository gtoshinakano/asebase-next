import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import styled from 'styled-components'
import _ from 'lodash'

export default function AutoComplete({inputVal, width, options, open, onSelect, minSuggestionLength}) {


  const re = new RegExp(_.escapeRegExp(inputVal), 'i')
  const isMatch = (result) => re.test(result)

  const opts = minSuggestionLength === 0 ? options : _.filter(options, isMatch)

  if(inputVal.length < minSuggestionLength || opts.length === 0) return ("")

  return (
    <div className="w-full">
      <Container width={ width }>
        <Listbox value={inputVal} onChange={() => null}>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full mt-1 overflow-auto font-notoJP bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
              {opts.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                      cursor-default select-none relative block h-full
                      border-b border-warmGray-100 hover:bg-blueGray-100 hover:text-black font-light z-50  
                    `
                  }
                  value={item}
                  
                >
                  {({ selected, active }) => (
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-thin'
                      } block truncate cursor-pointer  py-1.5 px-3`}
                      onMouseDown={() => onSelect(item)}
                    >
                      {item}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </Container>
    </div>
  )
}

const Container = styled.div.attrs(props=> ({
  className: "absolute pt-2 -ml-2.5 z-50"
}))`
  width: ${props => props.width+120 > 240 ? "240px" : props.width+120+"px"}
`