import React,{useState} from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import Confirm from '@Styled/Confirm'
import Skeleton from 'react-loading-skeleton';

const Checkbox = ({ className, checked, labels, name, disabled, loading, mutationFn, callback, invalidate, confirm, ...props }) => {

  const [isChecked, setIsChecked] = useState(checked);
  const [serverMsg, setServerMsg] = useState("");

  React.useEffect(() => setIsChecked(checked), [checked])

  const client = useQueryClient()
  const { isLoading, mutate } = useMutation((data) => mutationFn(data), {
    onSuccess: (data) => {
      if(invalidate && invalidate !== "") client.invalidateQueries(invalidate)
      if(data?.serverMessage) setServerMsg(data.serverMessage)
      if(callback) callback()
    }
  })

  const onCheck = async () => {
    const val = !isChecked
    if(confirm && confirm.when === isChecked){
      const res = await Confirm.show(confirm)
      if(res) {
        console.log("yes")
        mutate({[name]: val ? 1 : 0})
        setIsChecked(val)
      }
    }else {
      mutate({[name]: val ? 1 : 0})
      setIsChecked(val)
    }
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
      className={`pt-1` } 
    >{isLoading ? <Skeleton width={250} height={20} /> : isChecked ? labels[1] :  labels[0]}</label>
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

// const confirm = {
//   when: true,
//   message: "",
//   title: ""
// }

export default Checkbox
