import React, { useState, useEffect } from 'react';
import ExchangeItem from './ExchangeItem';
import {
  useQuery,
  useQueryClient,
  useMutation,
  useIsMutating,
} from 'react-query';
import { getExchangeProfile } from '@Utils/defaultQueries/UserQueries';
import Skeleton from 'react-loading-skeleton';
import * as schemas from '@Utils/Schemas/User';
import { Transition } from '@headlessui/react';
import { updateExchangeProfile } from '@Utils/defaultQueries/Mutations';
import { RoundButton } from '@Components/Styled/Button';
import _ from 'lodash';

const ExchangeInfo = () => {
  const [form, setForm] = useState(_form);
  const [hasError, setHasError] = useState(false);
  const client = useQueryClient();
  const handshake = client.getQueryData('handshake');
  const queryKey = ['exchange-profile', handshake?.data.id];
  const exchange = useQuery(queryKey, getExchangeProfile, {
    staleTime: Infinity,
  });
  const mutation = useMutation(updateExchangeProfile, {
    onSuccess: (e) => {
      client.setQueryData(queryKey, e.data);
    },
  });

  const isMutatingExchange = useIsMutating('exchange');

  useEffect(() => setForm(exchange?.data || []), [exchange.data]);

  const hasChanged = !_.isEqual(
    _.map(form, (i) => _.pick(i, toPick)),
    _.map(exchange?.data, (i) => _.pick(i, toPick))
  );

  const onExchangeChange = (val, index) => {
    let newForm = [...form];
    newForm.splice(index, 1, val);
    const error = schemas.ExchangeList.check(newForm);
    let hasErr =
      error.array.filter(
        (item) => Object.values(item).filter((e) => e.hasError).length > 0
      ).length > 0;
    setHasError(hasErr);
    setForm(newForm);
  };

  const onAdd = (val, index) => {
    let newForm = [...form];
    newForm.splice(index + 1, 0, val);
    const error = schemas.ExchangeList.check(newForm);
    let hasErr = error.array
      ? error.array.filter(
          (item) => Object.values(item).filter((e) => e.hasError).length > 0
        ).length > 0
      : error.hasError;
    setHasError(hasErr);
    setForm(newForm);
  };

  const onRemove = (index) => {
    let newForm = [...form];
    newForm.splice(index, 1);
    const error = schemas.ExchangeList.check(newForm);
    let hasErr = error.array
      ? error.array.filter(
          (item) => Object.values(item).filter((e) => e.hasError).length > 0
        ).length > 0
      : error.hasError;
    setHasError(hasErr);
    setForm(newForm);
  };

  const onReset = (e) => {
    setForm(exchange?.data);
  };

  const onSubmit = (e) => {
    mutation.mutate({ ...form });
  };

  const onInitForm = (e) => {
    setForm([_item]);
    setHasError(true);
  };

  const isAwaiting =
    exchange.isLoading ||
    exchange.isFetching ||
    mutation.isLoading ||
    mutation.isFetching ||
    isMutatingExchange;

  return (
    <>
      <h2 className="font-semibold inline-flex align-middle pt-7 pl-2 pb-4">
        <i className="ri-flight-takeoff-line mr-2 text-2xl"></i>{' '}
        <span className="my-auto text-xl">Bolsas no Japão</span>
      </h2>
      <div className="flex flex-wrap px-1 w-full">
        {form.length > 0 ? (
          form.map((item, index) =>
            !isAwaiting ? (
              <ExchangeItem
                key={index}
                item={item}
                onChange={onExchangeChange}
                index={index}
                onAdd={onAdd}
                onRemove={onRemove}
                data={form}
              />
            ) : (
              <div
                className="w-full pt-5 px-3"
                style={{ height: 472 }}
                key={index}
              >
                <Skeleton width="100%" height={438} className="" />
              </div>
            )
          )
        ) : (
          <button
            className="ml-8 mt-4 px-4 py-1 bg-slate-100 inline-flex font-thin hover:bg-slate-200 transition duration-200 transform hover:scale-95"
            onClick={onInitForm}
          >
            <i className="ri-edit-2-fill mr-3 text-sky-400 my-auto text-3xl md:text-base"></i>{' '}
            Preencher informações sobre intercâmbios no Japão
          </button>
        )}
      </div>
      <Transition
        show={hasChanged && !isAwaiting}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="pr-4 mt-3 w-full space-x-2 flex justify-end">
          {hasChanged && (
            <>
              <RoundButton
                className="text-sm min-w-90px"
                onClick={onReset}
                disabled={isAwaiting}
              >
                <i className="ri-restart-line text-base text-amber-400 mr-2"></i>
                <span className="my-auto">Restaurar</span>
              </RoundButton>
              <RoundButton
                className="text-sm min-w-90px"
                onClick={onSubmit}
                disabled={hasError || isAwaiting}
                isLoading={isAwaiting}
                variant={hasError ? 'error' : 'secondary'}
                tooltip={
                  hasError
                    ? 'Preencha os campos corretamente para poder salvar esta seção'
                    : ''
                }
              >
                <i
                  className={`${
                    hasError
                      ? 'ri-error-warning-fill text-red-500'
                      : isAwaiting
                      ? 'ri-loader-5-line animate-spin'
                      : 'ri-save-3-fill'
                  } text-base mr-2 `}
                ></i>
                <span className="my-auto">Salvar</span>
              </RoundButton>
            </>
          )}
        </div>
      </Transition>
    </>
  );
};

export default ExchangeInfo;

const _form = [];

export const _item = {
  year: '',
  type: 1,
  started_month: '',
  started_year: '',
  ended_month: '',
  ended_year: '',
  org_name: '',
  org_exch_ref: '',
  org_exch_title: '',
  exchange_place: '',
  study_area: 1,
  study_title: '',
  study_url: '',
  province_name: 'Japão',
};

const toPick = Object.keys(_item);
