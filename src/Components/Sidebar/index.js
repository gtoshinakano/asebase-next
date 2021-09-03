import React from 'react';
import Link from '@Components/Link'

const Sidebar = () => {
  const [open, setOpen] = React.useState(true)

  return(
    <>
      {open && <div className="fixed w-full h-full bg-black bg-opacity-25 z-10" onClick={() => setOpen(false)}></div>}
      <aside className={`bg-blueGray-800 min-h-screen transition-width ease-in-out duration-200 text-white flex flex-col  z-20 fixed ${!open ? "w-10" : "w-64"}
      `}>
        <div >
          <img src="/assets/img/logo_asebase.svg" /> 
        </div>
        <div className="flex-1">
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center">
                <i className="ri-earth-fill text-lg mr-4"></i>
                Explorar
              </span>
            </Link>
          </div>
          <div className="block overflow-hidden w-full">
            <Link href="/explore" className="block py-1 px-2.5">
              <span className="inline-flex justify-center items-center">
                <i className="ri-user-fill text-lg mr-4"></i>
                Perfil
              </span>
            </Link>
          </div>
        </div>
        <div className={`flex w-full bg-white bg-opacity-10`}>
          <button
            className={`text-lg inline-flex py-1 px-2.5 w-full ${open ? "justify-end" : "justify-center"}`}
            type="button"
            onClick={() => setOpen(!open)}
          >
            <i className={!open ? "ri-arrow-right-s-fill" : "ri-arrow-left-s-fill"}></i>
          </button>
        </div>
      </aside>
    </>
  )

}

export default Sidebar