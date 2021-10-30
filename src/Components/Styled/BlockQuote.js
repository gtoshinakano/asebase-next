import React from 'react';

const Blockquote = ({ errorMessage, icon, children, className }) => {
  return (
    <div
      className={
        'py-2 px-4 w-full  text-xs inline-flex border-l-4 ml-3  ' + className
      }
    >
      <i className={icon + ' mr-3 text-base'}></i>{' '}
      <span className="my-auto">{errorMessage || children}</span>
    </div>
  );
};

export default Blockquote;
