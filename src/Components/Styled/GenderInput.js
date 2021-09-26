import React, {useState} from 'react';

const GenderInput = ({value, mutationFn, invalidate, name, loading}) => {

  const [inputVal, setInputVal] = useState(null);
  React.useEffect(() => setInputVal(value), [value])

  return (
    <div className="mt-2 pl-2">
      <span 
        className={`text-gray-400 ${inputVal === null && "print:hidden"}`}
      >Gênero</span>
      {inputVal === null && <button 
        className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 p-1 print:hidden"
        onClick={() => setInputVal(0)}
      ><span className="ml-1 mr-2 w-7">🧍</span> <span className="border-b">Indefinido</span></button>}
      {inputVal === 0 && <button 
        className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 p-1 "
        onClick={() => setInputVal(1)}
      ><span className="ml-1 mr-2 w-7">🧍‍♂️</span> <span className="border-b">Masculino</span></button>}
      {inputVal === 1 && <button 
        className="text-xl inline-flex min-w-max font-thin hover:bg-gray-100 p-1 "
        onClick={() => setInputVal(null)}
        ><span className="ml-1 mr-2 w-7">🧍‍♀️</span> <span className="border-b">Feminino</span></button>}
    </div>
  );
}

export default GenderInput;