import React from 'react';
import Image from 'next/image';
import Link from '@Components/Link';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed w-full h-full bg-black bg-opacity-25 z-10"
          onClick={() => setOpen(false)}
        ></div>
      )}
      <aside
        className={`bg-red-700 min-h-screen transition-width ease-in-out duration-300 text-white flex flex-col z-20 fixed print:hidden ${
          !open ? 'w-10' : 'w-56'
        }
      `}
      >
        
        <div className="flex-1 font-thin">
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5 hover:bg-red-600 hover:text-white hover:font-bold">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-earth-fill text-lg mr-4"></i>
                Explorar Asebase
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-user-line text-lg mr-4"></i>
                Informações Pessoais
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-mind-map text-lg mr-4"></i>
                Ascendência Japonesa
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-book-open-line text-lg mr-4"></i>
                Formação Acadêmica
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-file-user-fill text-lg mr-4"></i>
                Perfil Profissional
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-flight-takeoff-line text-lg mr-4"></i>
                Bolsa de Estudos
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center whitespace-nowrap">
                <i className="ri-team-fill text-lg mr-4"></i>
                Participação Koshukai
              </span>
            </Link>
          </div>
        </div>
        <div className={`flex w-full bg-white bg-opacity-10`}>
          <button
            className={`text-lg inline-flex py-1 px-2.5 w-full ${
              open ? 'justify-end' : 'justify-center'
            }`}
            type="button"
            onClick={() => setOpen(!open)}
          >
            <div className="inline-flex justify-center mr-3">
              <Image src="/assets/img/logo_asebase.svg" alt="Asebase Logo" width={120} height={28} />
            </div>
            <i
              className={
                `${!open ? 'ri-arrow-right-s-fill' : 'ri-arrow-left-s-fill'} mr-2.5`
              }
            ></i>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
