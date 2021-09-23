import React, {useState} from 'react';
import { Transition } from '@headlessui/react';

const HelpTip = ({icon, message, error, warning}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Transition
        show={show}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative">  
          <div 
            className={`absolute transform -translate-x-full w-64 pr-1
            `}>
              <div className={`rounded px-2 py-1 ${error && "bg-white text-red-500 border border-red-500 font-semibold"}`}>{message}</div>
            </div>
        </div>
      </Transition>
      <button 
        className="cursor-pointer "
        onClick={(e)=> e.preventDefault()}
        onMouseOut={() => setShow(false)}
        onMouseOver={() => setShow(true)}
      >
        {icon}
      </button>
    </div>
  );
}

export default HelpTip;
