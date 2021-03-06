import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import HelpTip from '@Styled/HelpTip';
import { useMutation, useQueryClient } from 'react-query';
import AutoComplete from '@Styled/AutoComplete';

const InlineInput = ({
  mutationFn,
  invalidate,
  placeholder,
  inputCSS,
  type,
  value,
  schema,
  name,
  onMessageClick,
  loading,
  disabled,
  inline,
  mask,
  options,
  minSuggestionLength,
  onChange,
  maxLength,
  min,
  max,
}) => {
  const [width, setWidth] = useState(0);
  const [inputErr, setInputErr] = useState({ hasError: false });
  const [inputVal, setInputVal] = useState(value);
  const [serverMsg, setServerMsg] = useState('');
  const [focused, setFocused] = useState(false);
  const [acFocus, setAcFocus] = useState(-1);
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation((data) => mutationFn(data), {
    onSuccess: (data) => {
      if (invalidate && invalidate !== '') client.invalidateQueries(invalidate);
      if (data?.serverMessage) setServerMsg(data.serverMessage);
    },
  });
  const span = useRef();

  React.useEffect(() => setInputVal(value), [value]);
  React.useEffect(() => {
    const { offsetWidth } = span.current;
    setWidth(type === 'number' ? offsetWidth + 22 : offsetWidth);
  }, [inputVal, placeholder]);

  const valueChange = ({ target }) => {
    const error =
      schema?.checkForField(name, { [name]: target.value }) || noError;
    setInputErr(error);
    setAcFocus(-1);
    let val = target.value;
    if (mask) val = mask(val);
    setInputVal(val);
    if (onChange) onChange(val, name);
  };

  const onInputBlur = (e) => {
    setFocused(false);
    if (inputVal !== value) {
      if (!inputErr.hasError) {
        if (mutationFn) mutate({ [name]: inputVal });
      }
    } else {
      setInputErr(noError);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) e.target.blur();
  };

  const onSuggestionSelect = (val) => {
    setFocused(false);
    setInputVal(val);
    setInputErr(noError);
    setAcFocus(-1);
    if (mutationFn) mutate({ [name]: val });
    if (onChange) onChange(val, name);
  };

  const onKeyDown = ({ keyCode, target }) => {
    if (keyCode === 40) setAcFocus(acFocus + 1);
    if (keyCode === 38) setAcFocus(acFocus - 1);
    if (keyCode === 13 && activeIndex > -1)
      onSuggestionSelect(opts[activeIndex]);
  };

  const re = new RegExp(_.escapeRegExp(inputVal), 'i');
  const matches = (result) => re.test(result);
  const opts = minSuggestionLength === 0 ? options : _.filter(options, matches);
  const activeIndex = acFocus % opts.length;

  return (
    <>
      <div
        className="invisible fixed px-1.5 font-notoJP font-thin whitespace-pre"
        ref={span}
      >
        {inputVal ? inputVal : placeholder}
      </div>
      <div
        className={`p-1 ${
          inline && 'inline-flex max-w-xxs sm:max-w-none flex-wrap'
        }`}
        style={inline && { width }}
      >
        <div className="relative">
          <div
            className={`absolute right-2 font-thin z-10 inline-flex ${
              inline && 'top-3'
            }`}
          >
            {inputErr.hasError && (
              <HelpTip
                icon={<i className={`text-lg text-red-300 ri-alert-fill`}></i>}
                message={
                  <>
                    <i className={`ri-error-warning-line mr-2`}></i>
                    {inputErr.errorMessage}
                  </>
                }
                error
              />
            )}
            {serverMsg && (
              <HelpTip
                icon={
                  <i className="ri-feedback-fill text-lg hover:text-blueGray-900"></i>
                }
                message={<>{serverMsg}</>}
                onClick={onMessageClick}
              />
            )}
            {(isLoading || loading) && (
              <i className="ri-loader-5-line text-lg animate-spin translate"></i>
            )}
          </div>
        </div>
        <IInput
          type={type}
          onChange={valueChange}
          onBlur={onInputBlur}
          onKeyUp={handleKeyPress}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          inputCSS={inputCSS}
          value={inputVal}
          error={inputErr}
          disabled={disabled || isLoading || loading}
          inline={inline}
          width={width}
          maxLength={maxLength}
          min={min}
          max={max}
        />
        <AutoComplete
          inputVal={inputVal}
          width={width}
          open={focused}
          onSelect={onSuggestionSelect}
          minSuggestionLength={minSuggestionLength}
          focus={acFocus}
          options={opts}
        />
      </div>
    </>
  );
};

const IInput = styled.input.attrs((props) => ({
  className: `focus:outline-none text-gray-700 hover:bg-gray-100 focus:bg-blueGray-100 py-1 px-0.5 font-notoJP font-thin tracking-wide transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-trueGray-100
  ${props.inputCSS} 
  ${
    props.inline
      ? 'transform translate-y-input border-b print:border-b-0 w-full'
      : 'w-full'
  }
  ${props.error?.hasError && 'ring-1 ring-red-200'}`,
}))``;

const noError = { hasError: false };

export default InlineInput;
