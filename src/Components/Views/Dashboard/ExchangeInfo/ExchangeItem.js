import React, { useState, useEffect } from 'react';
import InlineInput from '@Components/Styled/InlineInput';
import { maskOnlyNumbers } from '@Utils/Helpers/masks';
import * as schemas from '@Utils/Schemas/User';
import { useMutation, useQueryClient } from 'react-query';
import { TripleToggle } from '@Styled/TripleToggle';
import moment from 'moment';
import _ from 'lodash';
import Confirm from '@Components/Styled/Confirm';
import { deleteExchangeProfile } from '@Utils/DefaultQueries/Delete';
import {
  AREAS,
  EXCHANGE_TYPES,
  JAPAN_PROVINCES,
} from '@Utils/StaticData/json-data';
import { _item } from '.';

const ExchangeItem = ({ data, onChange, onAdd, onRemove, index, item }) => {
  const _form = _item;

  const [form, setForm] = useState(_form);
  const [error, setError] = useState(schemas.ExchangeItem.check(form));
  const client = useQueryClient();
  const handshake = client.getQueryData('handshake');
  const uid = handshake.data.id || '';
  const queryKey = ['personal-profile', uid];
  const mutation = useMutation(deleteExchangeProfile, {
    mutationKey: 'exchange',
    onSuccess: () => {
      onRemove(index);
      client.invalidateQueries(queryKey);
      client.invalidateQueries(['exchange-profile', uid]);
    },
  });

  useEffect(() => setForm(item), [item]);
  useEffect(() => setError(schemas.ExchangeItem.check(form)), [form]);

  const onSingleChange = (val, name) => {
    const newForm = { ...form, [name]: val };
    setForm(newForm);
    onChange(newForm, index);
    setError(schemas.ExchangeItem.check(newForm));
  };

  const onNumberChange = (val, name) => {
    const newForm = { ...form, [name]: parseInt(val) };
    setForm(newForm);
    onChange(newForm, index);
    setError(schemas.ExchangeItem.check(newForm));
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
        {makeYearIndex(index, form.year, error?.year.hasError, data)}
      </button>
      <div className="flex-grow pl-2 pb-5">
        <div>
          ????
          <InlineInput
            inline
            placeholder="Ano Fiscal Japon??s"
            schema={schemas.ExchangeItem}
            name="year"
            mask={maskOnlyNumbers}
            value={parseInt(form.year) || ''}
            onChange={onNumberChange}
            maxLength={4}
            options={getValidYears()}
            type="number"
            min={1920}
            max={thisYear + 5}
          />
          {error?.year.hasError && (
            <ErrorDot msg={error.year?.errorMessage || ''} />
          )}
          {error && error.province_name.hasError ? (
            <img
              src={`/assets/img/jp-flags/Flag_of_Jap??o_Prefecture.svg`}
              className={flag_css}
            />
          ) : (
            <img
              src={`/assets/img/jp-flags/Flag_of_${form.province_name}_Prefecture.svg`}
              className={flag_css}
            />
          )}
          <InlineInput
            inline
            placeholder="Prov??ncia"
            name={'province_name'}
            value={form.province_name}
            minSuggestionLength={1}
            options={JAPAN_PROVINCES.map((i) => i.name)}
            onChange={onSingleChange}
          />
          {error?.province_name.hasError && (
            <ErrorDot msg={error.province_name?.errorMessage || ''} />
          )}
        </div>
        <div className="pt-3 sm:pt-1.5">
          ???? In??cio em
          <InlineInput
            inline
            placeholder="M??s"
            name={'started_in'}
            value={form.started_in}
            type="number"
            min="1"
            max="12"
            onChange={onSingleChange}
          />
          de
          <InlineInput
            inline
            placeholder="Ano"
            name={'started_year'}
            value={form.started_year}
            type="number"
            min={form.year || 1920}
            max={thisYear + 5}
            onChange={onSingleChange}
          />
          {error.started_in.hasError && (
            <ErrorDot msg={error.started_in?.errorMessage || ''} />
          )}
          {error.started_year.hasError && (
            <ErrorDot msg={error.started_year?.errorMessage || ''} />
          )}
        </div>
        <div className="pt-3 sm:pt-1.5">
          ???? T??rmino em
          <InlineInput
            inline
            placeholder="M??s"
            name={'ended_in'}
            value={form.ended_in}
            type="number"
            min={form.started_year === form.ended_year ? form.started_in : 1}
            max="12"
            onChange={onSingleChange}
          />
          de
          <InlineInput
            inline
            placeholder="Ano"
            name={'ended_year'}
            value={form.ended_year}
            type="number"
            min={form.started_year || 1920}
            max={thisYear + 5}
            onChange={onSingleChange}
          />
          {error.ended_in.hasError && (
            <ErrorDot msg={error.ended_in.errorMessage || ''} />
          )}
          {error.ended_year.hasError && (
            <ErrorDot msg={error.ended_year.errorMessage || ''} />
          )}
        </div>
        <div>
          <TripleToggle
            value={form?.type || 1}
            onChange={onSingleChange}
            name="type"
            options={EXCHANGE_TYPES}
          />
        </div>

        <div className="pt-3 sm:pt-1.5">
          ???? Entidade Organizadora:
          <InlineInput
            inline
            placeholder="ex: JICA, Governo de Prov??ncia, etc."
            schema={schemas.ExchangeItem}
            name="org_name"
            value={form.org_name}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.org_name.hasError && (
            <ErrorDot msg={error.org_name.errorMessage || ''} />
          )}
        </div>
        <div className="pt-3 sm:pt-1.5">
          ????
          <InlineInput
            inline
            placeholder="C??d."
            schema={schemas.ExchangeItem}
            name="org_exch_ref"
            value={form.org_exch_ref}
            onChange={onSingleChange}
            maxLength={150}
          />
          <InlineInput
            inline
            placeholder="Nome do Programa"
            schema={schemas.ExchangeItem}
            name="org_exch_title"
            value={form.org_exch_title}
            onChange={onSingleChange}
            maxLength={150}
          />
        </div>
        <div className="pt-6 sm:pt-1.5">
          {form.type === 1
            ? '???? Institui????o de Ensino'
            : form.type === 2
            ? '???? Empresa'
            : '???? Local'}
          <InlineInput
            inline
            placeholder="frequentado(a) no Jap??o"
            schema={schemas.ExchangeItem}
            name="exchange_place"
            value={form.exchange_place}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.exchange_place.hasError && (
            <ErrorDot msg={error.exchange_place.errorMessage || ''} />
          )}
        </div>
        <div>
          <TripleToggle
            value={form?.study_area || 1}
            onChange={onSingleChange}
            name="study_area"
            options={AREAS}
          />
        </div>
        <div>
          ????
          <InlineInput
            inline
            placeholder="T??tulo ou Assunto do estudo"
            schema={schemas.ExchangeItem}
            name="study_title"
            value={form.study_title}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.study_title.hasError && (
            <ErrorDot msg={error.study_title.errorMessage || ''} />
          )}
        </div>
        <div className="pt-3 sm:pt-1.5">
          ????
          <InlineInput
            inline
            placeholder="Link para refer??ncia"
            schema={schemas.ExchangeItem}
            name="study_url"
            value={form.study_url}
            onChange={onSingleChange}
            maxLength={150}
          />
          {error.study_url.hasError && (
            <ErrorDot msg={error.study_url.errorMessage || ''} />
          )}
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

export default ExchangeItem;

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
  message: 'ATEN????O: Seus dados preenchidos ser??o apagados',
  confirmBtn: (
    <div className="w-12 inline-flex">
      <i className="ri-check-line mr-3"></i> Sim
    </div>
  ),
  cancelBtn: (
    <div className="w-12 inline-flex">
      <i className="ri-delete-back-2-line mr-3"></i> N??o
    </div>
  ),
};

const flag_css = 'inline w-6 h-4 mx-2.5 border border-gray-600';

const thisYear = parseInt(moment().format('YYYY'));

const makeYearIndex = (index, year, hasError, data) => {
  return (
    <>
      {hasError ? (
        <i
          className={`ri-number-${index + 1} text-blueGray-500 block text-lg `}
        ></i>
      ) : (
        [...(year + '')].map((num, index) => (
          <i
            className={`ri-number-${num} text-blueGray-500 block text-lg `}
            key={num + '-' + index}
          ></i>
        ))
      )}
      <i
        className={`${
          data.length > 4
            ? 'ri-forbid-2-fill'
            : 'ri-add-box-fill text-blueGray-700'
        } block text-lg `}
      ></i>
    </>
  );
};
