import React from 'react';
import InlineInput from '@Styled/InlineInput';
import { familyLabels } from '@Utils/StaticData/family-data';
import { JAPAN_PROVINCES } from '@Utils/StaticData/json-data';
import Blockquote from '@Styled/BlockQuote';

const NikkeiOrigins = ({ form, error, originChange }) => {
  const { jpFamilyMembers, jpFamilyOrigins } = form;
  return (
    <div className="border border-white focus-within:border-sky-400 pl-7 pb-3 flex flex-wrap">
      <h2 className="p-2 mb-1">3. De qual ou quais províncias eles vieram?</h2>
      {jpFamilyMembers.length > 0 && error.jpFamilyMembers.hasError ? (
        <Blockquote
          errorMessage={error.jpFamilyMembers.errorMessage}
          icon="ri-feedback-fill text-red-600"
          className="text-red-300 border-red-400"
        />
      ) : error.jpFamilyOrigins.hasError ? (
        <Blockquote
          errorMessage={error.jpFamilyOrigins.errorMessage}
          icon="ri-feedback-fill text-red-600"
          className="text-red-300 border-red-400"
        />
      ) : null}
      {jpFamilyMembers.map((i) => (
        <div className="w-3/4 m-2 font-extralight flex" key={i}>
          <span className="pt-4">{familyLabels[i]} é imigrante de</span>
          <div className="grow">
            <InlineInput
              inline
              placeholder="Província"
              name={i}
              value={jpFamilyOrigins[i]}
              minSuggestionLength={1}
              options={JAPAN_PROVINCES.map((i) => i.name)}
              onChange={(v) => originChange(v, i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NikkeiOrigins;
