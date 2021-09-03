import React from 'react';

const Sidebar = () => {
  const [open, setOpen] = React.useState(true)

  return(
    <>
      {open && <div className="fixed w-full h-full bg-black bg-opacity-25 z-10" onClick={() => setOpen(false)}></div>}
      <aside className={`bg-blueGray-700 min-h-screen transition-width ease-in-out duration-200 text-white flex flex-col  z-20 ${!open ? "w-12" : "w-64"}
      `}>
        <div >
          <img src="/assets/img/logo_asebase.svg" /> 
        </div>
        <div className="flex-1">
          
        </div>
        <div className={`flex w-full bg-white bg-opacity-10 ${open ? "justify-end" : "justify-center"}`}>
          <button
            className="text-lg inline-flex py-1 px-2"
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