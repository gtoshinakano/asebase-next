import React, {useState} from 'react';
import styled from 'styled-components';
import { Popover, Transition } from '@headlessui/react';

const InlineInput = ({onChange, onBlur, mutation, placeholder, required, deletable, inputCSS}) => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="inline-flex w-full p-1">
      <IInput
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        onMouseOver={() => setMenuOpen(!menuOpen)}
        onMouseOut={() => setMenuOpen(!menuOpen)}
        disabled={false} //TODO disable when loading
        placeholder={placeholder}
        inputCSS={inputCSS}
      />
    </div>
  );
}

const IInput = styled.input.attrs(props => ({
  className: `flex-grow focus:outline-none text-gray-700 focus:bg-blueGray-50 py-1 ${props.inputCSS}`,
}))`

`

export default InlineInput;
