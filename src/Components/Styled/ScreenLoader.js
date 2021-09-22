import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Transition } from '@headlessui/react'

const ScreenLoader = ({title, message, isLoading}) => {
  return (
    <>
      <Head>
        <title>Área de Membros - {title} - ASEBASE</title>
      </Head>
      <Transition
        show={isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <i className="ri-loader-5-fill animate-spin ease-linear mb-4 text-5xl "></i>
          <h2 className="text-center text-white text-xl font-semibold">{title}</h2>
          <p className="w-1/3 text-center text-white">{message}</p>
        </div>
      </Transition>
    </>
  );
};


ScreenLoader.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};


export default ScreenLoader;
