import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateGender } from '@Utils/DefaultQueries/Mutations';

const GenderInput = ({ value, queryKey }) => {
  const [inputVal, setInputVal] = useState(null);
  const { mutate, isLoading } = useMutation(updateGender);
  React.useEffect(() => setInputVal(value), [value]);
  const client = useQueryClient();

  const toggleGender = () => {
    setInputVal(inputVal === null ? 'm' : inputVal === 'm' ? 'f' : null);
    mutate({ gender: inputVal === null ? 'm' : inputVal === 'm' ? 'f' : null });
    client.setQueryData(queryKey, {
      ...client.getQueryData(queryKey),
      gender: inputVal === null ? 'm' : inputVal === 'm' ? 'f' : null,
    });
  };

  return (
    <div className="mt-2 pl-2">
      <span className={`text-gray-400 ${inputVal === null && 'print:hidden'}`}>
        Gênero
      </span>
      {inputVal === null && (
        <button
          className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 pl-2 pr-3 transition duration-200 py-1.5  print:hidden disabled:cursor-not-allowed"
          onClick={toggleGender}
          disabled={isLoading}
        >
          <span className="mr-2 w-7">🧍</span>{' '}
          <span className="">Indefinido</span>
        </button>
      )}
      {inputVal === 'm' && (
        <button
          className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 pl-2 pr-3 transition duration-200 py-1.5  disabled:cursor-not-allowed"
          onClick={toggleGender}
          disabled={isLoading}
        >
          <span className="mr-2 w-7">🧍‍♂️</span>{' '}
          <span className="">Masculino</span>
        </button>
      )}
      {inputVal === 'f' && (
        <button
          className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 pl-2 pr-3 transition duration-200 py-1.5  disabled:cursor-not-allowed"
          onClick={toggleGender}
          disabled={isLoading}
        >
          <span className="mr-2 w-7">🧍‍♀️</span>{' '}
          <span className="">Feminino</span>
        </button>
      )}
    </div>
  );
};

export default GenderInput;
