import React, {useState} from 'react';
import moment from 'moment'
import EducationalItem from './EducationalItem';


const EducationalProfile = () => {

  const [form, setForm] = useState([]);

  return (
    <>
      <h2 className="font-semibold inline-flex align-middle pl-2">
        <i className="ri-book-open-line mr-2 text-xl"></i> <span className="my-auto">Formação Acadêmica</span>
      </h2>
      <div className="flex flex-wrap mb-44 pl-1">
        <EducationalItem />
      </div>
    </>
  );
}

export default EducationalProfile;

const _form = [
  {
    year: 2020,
    study_area: 1,
    subject: "",
    institution: ""
  }
]
