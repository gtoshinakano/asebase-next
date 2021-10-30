import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import styled from 'styled-components';
import _ from 'lodash';

export default function AutoComplete({
  inputVal,
  width,
  options,
  open,
  onSelect,
  minSuggestionLength,
  focus,
}) {
  if (inputVal.length < minSuggestionLength || options.length === 0) return '';

  const activeIndex = focus % options.length;

  return (
    <div className="w-full">
      <Container width={width}>
        <Listbox value={inputVal} onChange={() => null}>
          <Transition
            show={open}
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute w-full mt-1 overflow-auto font-notoJP bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-xs sm:text-sm">
              {options.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `${
                      itemIdx === activeIndex
                        ? 'text-blueGray-900 bg-blueGray-200'
                        : 'text-gray-900'
                    }
                      cursor-default select-none relative block h-full
                      border-b border-warmGray-100 hover:bg-blueGray-100 hover:text-black font-light z-50  
                    `
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <span
                      className={`${selected ? 'font-medium' : 'font-thin'}
                      ${itemIdx === activeIndex ? 'font-medium' : 'font-thin'}
                      block truncate cursor-pointer py-1.5 px-3`}
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
  );
}

const Container = styled.div.attrs((props) => ({
  className: 'absolute pt-2 -ml-2.5 z-50 min-w-90px',
}))`
  width: ${(props) =>
    props.width + 120 > 240 ? '150px' : props.width + 50 + 'px'};
`;
