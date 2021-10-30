import React, { useState } from 'react';
import styled from 'styled-components';
import { Popover, Transition } from '@headlessui/react';

export const RoundButton = ({ children, ...rest }) => {
  const { isLoading } = rest;
  const [open, setOpen] = useState(false);

  return (
    <Button
      as={Button}
      {...rest}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {isLoading ? (
        <>
          <i className="ri-loader-4-line animate-spin mr-2"></i>
          Carregando...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export const Button = styled.button.attrs((props) => ({
  className: makeClassNames(props),
}))``;

const makeClassNames = (props) => {
  const { variant, className } = props || { variant: 'primary' };
  let classNames =
    'px-4 py-2 transition duration-200 each-in-out rounded-full shadow inline-flex justify-center disabled:cursor-not-allowed ';
  switch (variant) {
    case 'primary':
    default:
      classNames +=
        'text-sky-600 hover:bg-sky-50 focus:bg-sky-200 disabled:text-sky-200 ';
      break;
    case 'secondary':
      classNames +=
        'bg-sky-600 text-white hover:text-gray-100 hover:bg-sky-400 focus:bg-sky-200 disabled:text-sky-200 ';
      break;
    case 'outline':
      classNames +=
        'text-sky-600 border border-sky-500 hover:bg-sky-50 focus:bg-sky-200 disabled:text-sky-200 ';
      break;
    case 'error':
      classNames +=
        'text-sky-600 border border-red-300 hover:text-red-100 hover:bg-red-50 disabled:text-rose-300 ';
      break;
  }
  classNames += className;

  return classNames;
};
