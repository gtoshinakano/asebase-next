import React, {useState, useEffect} from 'react';
import AcademicItem from './AcademicItem';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getAcademicProfile } from '@Utils/DefaultQueries/UserQueries'
import Skeleton from 'react-loading-skeleton';
import * as schemas from '@Utils/Schemas/User'
import { Transition } from '@headlessui/react';

const AcademicProfile = () => {

  const [form, setForm] = useState(_form);
  const [hasError, setHasError] = useState(false)
  const client = useQueryClient()
  const handshake = client.getQueryData("handshake")
  const queryKey = ["academic-profile", handshake?.data.id]
  const academic = useQuery(queryKey, getAcademicProfile, {staleTime: Infinity})
  const mutation = useMutation()

  useEffect(() => setForm(academic?.data || []), [academic.data])

  const hasChanged = !_.isEqual(_.map(form, i=> _.pick(i, toPick)), _.map(academic?.data, i=>_.pick(i, toPick)))
  //console.log(hasChanged, _.map(form, i=> _.pick(i, toPick)), _.map(academic?.data, i=>_.pick(i, toPick)))
  
  const onAcademicChange = (val, index) => {
    let newForm = [...form]
    newForm.splice(index, 1, val)
    const error = schemas.AcademicList.check(newForm)
    let hasErr = error.array.filter(item=> Object.values(item).filter(e=> e.hasError).length > 0).length > 0
    setHasError(hasErr)
    setForm(newForm)
  }

  const onAdd = (val, index) => {
    let newForm = [...form]
    newForm.splice(index+1, 0, val)
    const error = schemas.AcademicList.check(newForm)
    let hasErr = error.array ? error.array.filter(item=> Object.values(item).filter(e=> e.hasError).length > 0).length > 0 : error.hasError
    setHasError(hasErr)
    setForm(newForm)
  }

  const onRemove = (index) => {
    let newForm = [...form]
    newForm.splice(index,1)
    const error = schemas.AcademicList.check(newForm)
    let hasErr = error.array ? error.array.filter(item=> Object.values(item).filter(e=> e.hasError).length > 0).length > 0 : error.hasError
    setHasError(hasErr)
    setForm(newForm)
  }

  const onReset =  (e) => {
    setForm(academic?.data)
  }

  const onSubmit = (e) => {
    mutation.mutate({...form})
  }

  if (academic.isLoading || academic.isFetching ) return <Skeleton width="100%" height={195} />

  return (
    <>
      <h2 className="font-semibold inline-flex align-middle pt-3 pl-2 pb-4">
        <i className="ri-book-open-line mr-2 text-xl"></i> <span className="my-auto">Formação Acadêmica</span>
      </h2>
      <div className="flex flex-wrap pl-1">
        {form.map((item, index) => 
          <AcademicItem 
            key={index} 
            item={item} 
            onChange={onAcademicChange} 
            index={index}
            onAdd={onAdd}
            onRemove={onRemove}
            data={form}
          />)}
      </div>
      <Transition
        show={hasChanged}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full px-7 mt-7 sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto flex flex-col">
          <div className="ml-3 w-full flex flex-wrap px-1 justify-end">
            {hasChanged &&
              <>
                <button 
                  className={`py-3 px-4 inline-flex tracking-widest bg-blueGray-300 text-black w-full sm:w-auto hover:bg-blueGray-200`}
                  onClick={onReset} 
                  type="button"
                  disabled={mutation.isLoading}
                >
                  <i className="ri-arrow-go-back-line mr-5 text-lg"></i>
                  <span className="my-auto">
                    Redefinir
                  </span>
                </button>
                <button 
                  className={`py-3 px-4 inline-flex tracking-widest
                    ${hasError ? "bg-blueGray-200 font-thin text-gray-500 flex-grow cursor-not-allowed text-xs" : "bg-sky-500 font-semibold text-white hover:bg-sky-400"}
                  `}
                  onClick={onSubmit}
                  disabled={hasError || mutation.isLoading}
                >
                  <i className={`${hasError ? "ri-error-warning-fill" : mutation.isLoading || academic.isLoading || academic.isFetching ? "ri-loader-5-line animate-spin" :"ri-save-3-fill"} mr-5 text-lg`}></i>
                  <span className="my-auto">
                    {hasError ? "Preencha os campos corretamente para poder salvar esta seção" : "SALVAR"}
                  </span>
                </button>
              </>
            }
          </div>
        </div>
      </Transition>
    </>
  );
}

export default AcademicProfile;

const _form = []

const toPick = ["year", "study_area", "subject", "institution_name"]