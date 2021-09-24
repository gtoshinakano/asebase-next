import React, {useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash'
import HelpTip from '@Styled/HelpTip';
import { useMutation, useQueryClient } from 'react-query';

const InlineInput = ({mutationFn, invalidate, placeholder, resetable, inputCSS, type, value, schema, name}) => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputErr, setInputErr] = useState({hasError: false});
  const [inputVal, setInputVal] = useState(value);
  const [serverMsg, setServerMsg] = useState("");
  const client = useQueryClient()

  const { isLoading, isSuccess, mutate} = useMutation((data) => mutationFn(data), {
    onSuccess: (data) => {
      if(invalidate && invalidate !== "") client.invalidateQueries(invalidate)
      if(data?.serverMessage) setServerMsg(data.serverMessage)
    }
  })


  React.useEffect(() => setInputVal(value), [value])

  const valueChange = ({target}) => {
    const error = schema.checkForField(name, {[name]: target.value})
    setInputErr(error)
    setInputVal(target.value)
  }

  const onInputBlur = () => {
  
    if(inputVal !== value) {
      if(!inputErr.hasError) {
        mutate({[name]: inputVal})
      }
      //onBlur()
    }else{
      setInputErr(noError)
    }
  }

  const resetInput = (e) => {
    e.preventDefault()
    setInputVal(value)
    setInputErr(noError)
  }

  return (
    <div className={`p-1`}>
      <div className="relative">
        <div className="absolute right-2 font-thin z-10 inline-flex">
          {inputErr.hasError && 
            <HelpTip 
              icon={<i className="text-lg text-red-300 ri-alert-fill"></i>} 
              message={<><i className=" ri-error-warning-line mr-2"></i>{inputErr.errorMessage}</>}
              error
            />
          }
          {inputVal !== value && resetable && !serverMsg && 
            <HelpTip 
              icon={<i className="ri-arrow-go-back-line text-lg hover:text-blueGray-900"></i>} 
              message={<><i className="ri-eraser-fill mr-1"></i> Desfazer</>}
              warning
            />
          }
          {serverMsg &&
            <HelpTip 
              icon={<i className="ri-feedback-fill text-lg hover:text-blueGray-900"></i>} 
              message={<>{serverMsg}</>}
              onClick={resetInput}
            />
          }
          { isLoading &&
            <i className="ri-loader-5-line text-lg animate-spin"></i>
          }
        </div>
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
        disabled={isLoading}
      />
      
    </div>
  );
}

const IInput = styled.input.attrs(props => ({
  className: `w-full focus:outline-none text-gray-700 hover:bg-gray-100 focus:bg-blueGray-100 py-1 px-0.5 font-notoJP font-thin ${props.inputCSS} 
  ${props.error?.hasError && "ring-1 ring-red-200"}`,
}))`

`

const noError = {hasError: false}

export default InlineInput;
