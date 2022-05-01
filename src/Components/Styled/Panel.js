import React from 'react';
import styled from 'styled-components';

const Panel = ({ children, ...rest }) => {
  return <PanelContainer {...rest}>{children}</PanelContainer>;
};

const PanelContainer = ({
  children,
  bordered,
  header,
  collapsible,
  shaded,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={`w-full rounded-md bg-white
    ${bordered && 'border border-slate-200'} ${shaded && 'shadow'}
  `}
    >
      <div className="w-full p-5 flex">
        <div className="grow">{header}</div>
        <div className="w-1/5 sm:w-4">
          {collapsible && expanded && (
            <ExpandButton onClick={() => setExpanded(false)}>
              <i className="ri-arrow-down-s-line"></i>
            </ExpandButton>
          )}
          {collapsible && !expanded && (
            <ExpandButton onClick={() => setExpanded(true)}>
              <i className="ri-arrow-up-s-line"></i>
            </ExpandButton>
          )}
        </div>
      </div>
      <div
        className={`w-full px-5 pb-5 ${
          collapsible && expanded ? 'overflow-hidden h-0' : 'h-auto'
        } ${!collapsible && 'h-auto'}`}
      >
        {children}
      </div>
    </div>
  );
};

const ExpandButton = styled.button.attrs({
  className: ``,
})``;

export default Panel;
