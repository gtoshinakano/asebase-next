import React from 'react';
import OrgChart from 'react-orgchart';
import * as schemas from '@Utils/Schemas/User';

const NikkeiBranch = ({
  jpFamilyMembers,
  error,
  familyTree,
  familySelect,
  form,
}) => {
  return (
    <>
      <div className="relative">
        {jpFamilyMembers.length > 0 && error.jpFamilyMembers.hasError && (
          <div className="absolute left-0 p-2 text-red-600 text-xs font-extralight w-5/12 md:w-1/3">
            <i className="ri-feedback-fill mr-2"></i>{' '}
            {error.jpFamilyMembers.errorMessage}
          </div>
        )}
        <div className="absolute right-0 p-2 border-2 border-gray-500 bg-white text-xs font-semibold opacity-70 w-1/3 sm:w-1/4 md:w-auto hover:opacity-10">
          🍙 Imigrantes japoneses
        </div>
      </div>
      <OrgChart
        tree={familyTree}
        NodeComponent={({ node }) => (
          <NikkeiButton
            node={node}
            onSelect={familySelect}
            formValue={form}
            hasError={
              jpFamilyMembers.length > 0 && error.jpFamilyMembers.hasError
            }
          />
        )}
      />
    </>
  );
};

export default NikkeiBranch;

const NikkeiButton = ({ node, onSelect, formValue, hasError }) => {
  const gen = formValue.jp_generation;
  const shouldError =
    hasError && schemas.generationLengths[gen] === node.value?.length;
  return (
    <div className="">
      <button
        className={`py-1.5 px-1.5 min-w-90px whitespace-nowrap mx-1 rounded-lg text-sm shadow-lg focus:bg-sky-600 focus:text-white inline-flex items-center justify-center transition duration-75 ease-in-out transform hover:scale-110
          ${
            node.selected
              ? 'bg-sky-500 text-white ring-2 ring-offset-2 ring-offset-sky-500 ring-white ring-opacity-60'
              : 'font-extralight bg-white text-black'
          }
          ${
            shouldError &&
            'ring-2 ring-offset-2 ring-offset-red-300 ring-white ring-opacity-60'
          }
        `}
        onClick={node.value ? () => onSelect(node.value, node.label) : null}
      >
        {node.selected && <span className="mr-1">🍙</span>} {node.label}
      </button>
    </div>
  );
};
