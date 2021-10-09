import React, {useState, useEffect} from 'react';
import AcademicItem from './AcademicItem';
import { useQuery, useQueryClient } from 'react-query';
import { getAcademicProfile } from '@Utils/DefaultQueries/UserQueries'
import Skeleton from 'react-loading-skeleton';


const AcademicProfile = () => {

  const [form, setForm] = useState(_form);
  const client = useQueryClient()
  const {data} = client.getQueryData("handshake")
  const queryKey = ["academic-profile", data.id]
  const academic = useQuery(queryKey, getAcademicProfile, {staleTime: Infinity})

  useEffect(() => setForm(academic?.data || []), [academic.data])


  const onAcademicChange = (e) => console.log(e)

  if (academic.isLoading || academic.isFetching ) return <Skeleton width="100%" height={195} />

  return (
    <>
      <h2 className="font-semibold inline-flex align-middle pl-2 pb-4">
        <i className="ri-book-open-line mr-2 text-xl"></i> <span className="my-auto">Formação Acadêmica</span>
      </h2>
      <div className="flex flex-wrap mb-44 pl-1">
        {form.map((item, index) => <AcademicItem key={index} data={item} onChange={onAcademicChange} index={index} />)}
      </div>
    </>
  );
}

export default AcademicProfile;

const _form = []
