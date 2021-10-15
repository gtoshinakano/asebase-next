import React, {useState, useEffect} from 'react';

const TripleToggle = ({disabled, value, onChange, name, options}) => {

  const [inputVal, setInputVal] = useState(1)
  useEffect(() => setInputVal(value), [value])

  const toggle = () => {
    const newVal = inputVal === 1 ? 2 : inputVal === 2 ? 3 : 1
    setInputVal(newVal);
    onChange(newVal, name)
  }

  const [val] = options.filter(f=> f.value === inputVal)
  return (

    <button
      className="inline-flex min-w-max mt-4 pr-3 py-2 hover:bg-gray-100 disabled:cursor-not-allowed transform duration-100"
      onClick={toggle}
      disabled={disabled}
      type="button"
    >
      <span className="">{val.label}</span>
    </button>
  );
}

export {TripleToggle};
