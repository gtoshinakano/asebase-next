import React, {useState} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateGender } from '@Utils/DefaultQueries/Mutations'

const GenderInput = ({value}) => {

  const [inputVal, setInputVal] = useState(null);
  const {mutate, isLoading} = useMutation(updateGender)
  React.useEffect(() => setInputVal(value), [value])

  const toggleGender = () => {
    setInputVal(inputVal===null ? "0" : inputVal==="0" ? "1" : null)
    mutate({gender: inputVal===null ? "0" : inputVal==="0" ? "1" : null})
  }

  return (
    <div className="mt-2 pl-2">
      <span 
        className={`text-gray-400 ${inputVal === null && "print:hidden"}`}
      >Gênero</span>
      {inputVal === null && <button 
        className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 p-1 print:hidden disabled:cursor-not-allowed"
        onClick={toggleGender} disabled={isLoading}
      ><span className="ml-1 mr-2 w-7">🧍</span> <span className="border-b print:border-b-0">Indefinido</span></button>}
      {inputVal === "0" && <button 
        className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 p-1 disabled:cursor-not-allowed"
        onClick={toggleGender} disabled={isLoading}
      ><span className="ml-1 mr-2 w-7">🧍‍♂️</span> <span className="border-b print:border-b-0">Masculino</span></button>}
      {inputVal === "1" && <button 
        className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 p-1 disabled:cursor-not-allowed"
        onClick={toggleGender} disabled={isLoading}
        ><span className="ml-1 mr-2 w-7">🧍‍♀️</span> <span className="border-b print:border-b-0">Feminino</span></button>}
    </div>
  );
}

export default GenderInput;