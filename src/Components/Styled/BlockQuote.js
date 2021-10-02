import React from 'react';

const Blockquote = ({errorMessage, icon, children, className}) => {
  return (
    <div className={"py-2 px-4 w-full  text-xs inline-flex border-l-4 ml-3 align-middle "+className}>
      <i className={icon+" mr-3 text-base"}></i> {errorMessage || children}
    </div>
  );
}

export default Blockquote;
