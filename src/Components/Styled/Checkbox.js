import React from 'react';
import styled from 'styled-components';

const Checkbox = ({ className, checked, labels, name,...props }) => {
  return (
  <Container>
    <HiddenCheckbox 
      checked={checked} 
      id={name}
    />
    <StyledCheckbox checked={checked}>
      {checked 
        ? <i className="ri-checkbox-fill text-sky-500"></i>
        : <i className="ri-checkbox-blank-line"></i>
      }
    </StyledCheckbox>
    <label 
      htmlFor={name} 
      className="pt-1"  
    >{checked ? labels[1] :  labels[0]}</label>
  </Container>
)}

const Container = styled.div.attrs(props=> ({
  className: `inline-flex`
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
}))`
  display: inline-block;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`

export default Checkbox
