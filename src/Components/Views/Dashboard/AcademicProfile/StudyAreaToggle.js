import React, {useState, useEffect} from 'react';
import {AREAS} from '@Utils/StaticData/json-data'

const StudyAreaToggle = ({disabled, value, onChange}) => {

  const [inputVal, setInputVal] = useState(1)
  useEffect(() => setInputVal(value), [value])

  const toggleArea = () => {
    setInputVal(inputVal === 1 ? 2 : inputVal === 2 ? 3 : 1);
  }

  const [val] = AREAS.filter(f=> f.value === inputVal)
  return (

    <button
      className="inline-flex min-w-max mt-3.5 pr-3 py-2 hover:bg-gray-100 disabled:cursor-not-allowed "
      onClick={toggleArea}
      disabled={disabled}
    >
      <span className="">{val.label}</span>
    </button>
  );
}

export default StudyAreaToggle;
