import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import Confirm from '@Styled/Confirm';
import Skeleton from 'react-loading-skeleton';

const Checkbox = ({
  className,
  checked,
  labels,
  name,
  disabled,
  loading,
  mutationFn,
  callback,
  invalidate,
  confirm,
  onChange,
  id,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [serverMsg, setServerMsg] = useState('');

  React.useEffect(() => setIsChecked(checked), [checked]);

  const client = useQueryClient();
  const { isLoading, mutate } = useMutation((data) => mutationFn(data), {
    onSuccess: (data) => {
      if (invalidate && invalidate !== '') client.invalidateQueries(invalidate);
      if (data?.serverMessage) setServerMsg(data.serverMessage);
      if (callback) callback();
    },
    mutationKey: name,
  });

  const onCheck = async () => {
    const val = !isChecked;
    if (mutationFn) {
      if (confirm && confirm.when === isChecked) {
        const res = await Confirm.show(confirm);
        if (res) {
          mutate({ [name]: val ? 1 : 0 });
          setIsChecked(val);
        }
      } else {
        mutate({ [name]: val ? 1 : 0 });
        setIsChecked(val);
      }
    } else {
      if (onChange) onChange(val, name);
    }
  };

  const isDisabled = disabled || loading || isLoading;

  return (
    <Container className={className}>
      <HiddenCheckbox
        checked={isChecked}
        name={name}
        id={id}
        onChange={onCheck}
        disabled={isDisabled}
      />
      <StyledCheckbox
        checked={isChecked}
        onClick={onCheck}
        disabled={isDisabled}
      >
        {isChecked ? (
          <i className="ri-checkbox-fill text-sky-500"></i>
        ) : (
          <i className="ri-checkbox-blank-line"></i>
        )}
      </StyledCheckbox>
      <label
        htmlFor={id}
        className={`p-1 pr-4 ${
          !isLoading && 'hover:bg-gray-100'
        } transition duration-200 ease-in-out transform hover:scale-95`}
      >
        {isLoading ? (
          <Skeleton width={250} height={20} />
        ) : isChecked ? (
          labels[1]
        ) : (
          labels[0]
        )}
      </label>
    </Container>
  );
};

const Container = styled.div.attrs((props) => ({
  className: `inline-flex ${props.disabled && 'cursor-not-allowed'} ${
    props.className
  }`,
}))``;

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
`;

const StyledCheckbox = styled.div.attrs((props) => ({
  className: 'text-2xl mr-0.5',
}))``;

// const confirm = {
//   when: true,
//   message: "",
//   title: ""
// }

export default Checkbox;
