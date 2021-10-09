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
    <div className="mt-2">
      <button
        className="inline-flex min-w-max font-thin pt-2 pb-0.5 hover:bg-gray-100 print:hidden disabled:cursor-not-allowed "
        onClick={toggleArea}
        disabled={disabled}
      >
        <span className="">{val.label}</span>
      </button>
    </div>
  );
}

export default StudyAreaToggle;
