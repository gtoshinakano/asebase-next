import React, {useState} from 'react';
import { Transition } from '@headlessui/react';

const HelpTip = ({icon, message, error, warning}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="print:hidden">
      <Transition
        show={show}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative">  
          <div 
            className={`absolute transform -translate-x-full min-w-max flex-col pr-1.5`}>
              <div className="relative">
                <div className="absolute h-1.5 w-1.5 z-0 transform rotate-45 right-0 top-3 -mr-0.5 bg-red-500"></div>
              </div>
              <div className={`rounded px-1.5 py-0.5 mt-1 text-xs inline-flex max-w-265px z-10
                ${error 
                  ? "bg-red-500 text-white border border-red-500"
                  : warning ? "bg-white text-orange-500 border border-orange-500"
                  : "bg-black text-white"
                }
              `}
              >{message}</div>
              
            </div>
        </div>
      </Transition>
      <button 
        className="cursor-pointer "
        onClick={(e)=> e.preventDefault()}
        onMouseOut={() => setShow(false)}
        onMouseOver={() => setShow(true)}
        type="button"
      >
        {icon}
      </button>
    </div>
  );
}

export default HelpTip;
