import React, {useState} from 'react';
import { Transition } from '@headlessui/react';

const HelpTip = ({icon, message}) => {
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
          <div className="absolute transform -translate-x-full w-64 bg-black text-white rounded px-3 py-2">{message} lorem ipsum sum amet sie te</div>
        </div>
      </Transition>
      <button 
        className="cursor-pointer "
        onClick={(e)=> e.preventDefault()}
        onMouseOut={() => setShow(false)}
        onMouseOver={() => setShow(true)}
      >
        <i className={`${icon} `}></i>
      </button>
    </div>
  );
}

export default HelpTip;
