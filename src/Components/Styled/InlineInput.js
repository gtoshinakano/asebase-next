import React, {useState} from 'react';
import styled from 'styled-components';
import { Popover, Transition } from '@headlessui/react';
import _ from 'lodash'

const InlineInput = ({onChange, onBlur, mutation, placeholder, required, deletable, inputCSS, type, value, schema, name, message, inline}) => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputErr, setInputErr] = useState({hasError: false});
  const [inputVal, setInputVal] = useState(value);

  React.useEffect(() => setInputVal(value), [value])

  const valueChange = ({target}) => {
    const error = schema.checkForField(name, {[name]: target.value})
    setInputErr(error)
    setInputVal(target.value)
  }

  const onInputBlur = () => {
  
    if(inputVal !== value) {
      if(!inputErr.hasError) {
        //TODO Mutation
      }
      //onBlur()
    }else{
      setInputErr({hasError: false})
    }
  }

  return (
    <div className={`p-1`}>
      <div className="relative">
        <div className="absolute right-1 top-1 text-xs font-thin z-10">{message}</div>
      </div>
      <IInput
        type={type}
        onChange={valueChange}
        onBlur={onInputBlur}
        onMouseOver={() => setMenuOpen(!menuOpen)}
        onMouseOut={() => setMenuOpen(!menuOpen)}
        disabled={false} //TODO disable when loading
        placeholder={placeholder}
        inputCSS={inputCSS}
        value={inputVal}
        error={inputErr}
      />
      
    </div>
  );
}

const IInput = styled.input.attrs(props => ({
  className: `w-full focus:outline-none text-gray-700 hover:bg-gray-100 focus:bg-blueGray-100 py-1 px-0.5 font-notoJP font-thin ${props.inputCSS} 
  ${props.error?.hasError && "ring-1 ring-rose-400"}`,
}))`

`

export default InlineInput;
