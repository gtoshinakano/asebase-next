import React,{useState} from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';

const Checkbox = ({ className, checked, labels, name, disabled, loading, mutationFn, callback, invalidate, ...props }) => {

  const [isChecked, setIsChecked] = useState(checked);
  const [serverMsg, setServerMsg] = useState("");

  React.useEffect(() => setIsChecked(checked), [checked])

  const { isLoading, mutate } = useMutation((data) => mutationFn(data), {
    onSuccess: (data) => {
      if(invalidate && invalidate !== "") client.invalidateQueries(invalidate)
      if(data?.serverMessage) setServerMsg(data.serverMessage)
      if(callback) callback()
    }
  })

  const onCheck = () => {
    console.log("check")
    setIsChecked(!isChecked)
    // TODO mutate(data)
  }

  const isDisabled = disabled || loading || isLoading

  return (
  <Container>
    <HiddenCheckbox 
      checked={isChecked} 
      id={name}
      onChange={onCheck}
      disabled={isDisabled}
    />
    <StyledCheckbox 
      checked={isChecked}
      onClick={onCheck}
    >
      {isChecked 
        ? <i className="ri-checkbox-fill text-sky-500"></i>
        : <i className="ri-checkbox-blank-line"></i>
      }
    </StyledCheckbox>
    <label 
      htmlFor={name} 
      className={`pt-1 ${isDisabled ? "text-gray-200":""}` } 
    >{isChecked ? labels[1] :  labels[0]}</label>
  </Container>
)}

const Container = styled.div.attrs(props=> ({
  className: `inline-flex ${props.isDisabled && "cursor-not-allowed"}`
}))``

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div.attrs(props => ({
  className: "text-2xl mr-0.5"
}))``

export default Checkbox
