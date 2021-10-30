import React, { useState, useEffect } from 'react';
import InlineInput from '@Components/Styled/InlineInput';
import { maskOnlyNumbers } from '@Utils/Helpers/masks';
import * as schemas from '@Utils/Schemas/User';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import _ from 'lodash';
import Confirm from '@Components/Styled/Confirm';
import { deleteProfessionalProfile } from '@Utils/DefaultQueries/Delete';
import Checkbox from '@Components/Styled/Checkbox';

const ProfessionalItem = ({
  data,
  onChange,
  onCurrentChange,
  onAdd,
  onRemove,
  index,
  item,
}) => {
  const [form, setForm] = useState(_form);
  const [error, setError] = useState(schemas.ProfessionalItem.check(form));
  const client = useQueryClient();
  const handshake = client.getQueryData('handshake');
  const uid = handshake.data.id || '';
  const queryKey = ['professional-profile', uid];
  const mutation = useMutation(deleteProfessionalProfile, {
    mutationKey: 'professional',
    onSuccess: () => {
      onRemove(index);
      client.invalidateQueries(queryKey);
      client.invalidateQueries(['professional-profile', uid]);
    },
  });

  useEffect(() => setForm(item), [item]);
  useEffect(() => setError(schemas.ProfessionalItem.check(form)), [form]);

  const hasError = Object.values(error).filter((e) => e.hasError).length > 0;
  const hasCurrent = data.filter((i) => i.current_job).length > 0;

  const onSingleChange = (val, name) => {
    const newForm = { ...form, [name]: val };
    setForm(newForm);
    onChange(newForm, index);
    console.log(val, index);
  };

  const onCurrentJobChange = (val, name) => {
    const newForm = {
      ...form,
      [name]: val,
      end_year: val ? parseInt(moment().format('YYYY')) : '',
    };
    setForm(newForm);
    onCurrentChange(newForm, index);
  };

  const onNumberChange = (val, name) => {
    const newForm = { ...form, [name]: parseInt(val) };
    setForm(newForm);
    onChange(newForm, index);
  };

  const onAddNew = () => onAdd(_form, index);

  const onRemoveItem = async () => {
    if (data.length > 1) onRemove(index);
    else {
      const res = await Confirm.show(_confirm);
      if (res) {
        mutation.mutate();
      }
    }
  };

  return (
    <div
      className={`w-full flex flex-nowrap px-3 border focus-within:border-sky-400 border-white`}
    >
      <button
        className={`py-auto px-0.5 md:px-1 bg-gray-100 hover:bg-gray-200 text-gray-300 hover:text-gray-700 border-r-2 my-4 disabled:cursor-not-allowed transition duration-40 ease-in-out transform hover:scale-110`}
        onClick={onAddNew}
        disabled={data.length > 4}
        type="button"
      >
        <i
          className={`ri-number-${index + 1} text-blueGray-500 block text-lg `}
        ></i>
        <i
          className={`${
            data.length > 4
              ? 'ri-forbid-2-fill'
              : 'ri-add-box-fill text-blueGray-700'
          } block text-lg `}
        ></i>
      </button>
      <div className="flex-grow pl-2 pb-5">
        <div>
          📅 De:
          <InlineInput
            inline
            placeholder="Ano de ingresso"
            schema={schemas.ProfessionalItem}
            name="start_year"
            mask={maskOnlyNumbers}
            value={parseInt(form.start_year) || ''}
            onChange={onNumberChange}
            maxLength={4}
            options={getValidYears()}
            type="number"
            min={1920}
            max={parseInt(moment().format('YYYY')) + 5}
          />
          {error?.start_year.hasError && (
            <ErrorDot msg={error.start_year?.errorMessage || ''} />
          )}{' '}
          a{' '}
          <InlineInput
            inline
            placeholder="Ano de saída"
            schema={schemas.ProfessionalItem}
            name="end_year"
            mask={maskOnlyNumbers}
            value={parseInt(form.end_year) || ''}
            onChange={onNumberChange}
            maxLength={4}
            options={getValidYears()}
            type="number"
            min={1920}
            max={parseInt(moment().format('YYYY')) + 5}
            disabled={form.current_job}
          />
          {error?.end_year.hasError && (
            <ErrorDot msg={error.end_year?.errorMessage || ''} />
          )}
          {(form.current_job && hasCurrent) || !hasCurrent ? (
            <div className="inline ml-1.5">
              <Checkbox
                name="current_job"
                checked={form.current_job}
                labels={['Atual', 'Atual']}
                onChange={onCurrentJobChange}
                id={index + 'index'}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="pt-3 sm:pt-1.5">
          👩‍🚀 Cargo/Posição
          <InlineInput
            inline
            placeholder="ex: Engenheiro Elétrico"
            schema={schemas.ProfessionalItem}
            name="position"
            value={form.position}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.position.hasError && <ErrorDot />}
        </div>
        <div className="pt-3 sm:pt-3">
          🏢 Empresa:
          <InlineInput
            inline
            placeholder="ex: Empresa"
            schema={schemas.ProfessionalItem}
            name="company_name"
            value={form.company_name}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.company_name.hasError && <ErrorDot />}
        </div>
      </div>
      <button
        className="py-auto px-1 text-red-700 hover:bg-red-50 my-4 transition duration-75 ease-in-out transform hover:scale-110"
        onClick={onRemoveItem}
        type="button"
      >
        <i className="ri-close-circle-fill text-lg"></i>
      </button>
    </div>
  );
};

export default ProfessionalItem;

const _form = {
  start_year: '',
  end_year: '',
  position: '',
  company_name: '',
  current_job: false,
};

const getValidYears = () =>
  _.range(1920, parseInt(moment().format('YYYY')) + 5);

const ErrorDot = ({ msg }) => (
  <div
    className="rounded-full h-1 w-1 ml-1 bg-red-500 inline-block transform -translate-y-3"
    title={msg}
  ></div>
);

const noError = { hasError: false };

const _confirm = {
  title: 'Tem certeza que quer apagar?',
  message: 'ATENÇÃO: Seus dados preenchidos serão apagados',
  confirmBtn: (
    <div className="w-12 inline-flex">
      <i className="ri-check-line mr-3"></i> Sim
    </div>
  ),
  cancelBtn: (
    <div className="w-12 inline-flex">
      <i className="ri-delete-back-2-line mr-3"></i> Não
    </div>
  ),
};
