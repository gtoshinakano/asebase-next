import React, { useState } from 'react';
import styled from 'styled-components';

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || 'top'}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
      <style jsx global>{`
        :root {
          --tooltip-text-color: white;
          --tooltip-background-color: black;
          --tooltip-margin: 30px;
          --tooltip-arrow-size: 6px;
        }

        /* Wrapping */
        .Tooltip-Wrapper {
          display: inline-block;
          position: relative;
        }

        /* Absolute positioning */
        .Tooltip-Tip {
          position: absolute;
          border-radius: 4px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px;
          color: var(--tooltip-text-color);
          background: var(--tooltip-background-color);
          font-size: 14px;
          font-family: sans-serif;
          line-height: 1;
          z-index: 100;
          white-space: nowrap;
        }

        /* CSS border triangles */
        .Tooltip-Tip::before {
          content: ' ';
          left: 50%;
          border: solid transparent;
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-width: var(--tooltip-arrow-size);
          margin-left: calc(var(--tooltip-arrow-size) * -1);
        }

        /* Absolute positioning */
        .Tooltip-Tip.top {
          top: calc(var(--tooltip-margin) * -1);
        }
        /* CSS border triangles */
        .Tooltip-Tip.top::before {
          top: 100%;
          border-top-color: var(--tooltip-background-color);
        }

        /* Absolute positioning */
        .Tooltip-Tip.right {
          left: calc(100% + var(--tooltip-margin));
          top: 50%;
          transform: translateX(0) translateY(-50%);
        }
        /* CSS border triangles */
        .Tooltip-Tip.right::before {
          left: calc(var(--tooltip-arrow-size) * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: var(--tooltip-background-color);
        }

        /* Absolute positioning */
        .Tooltip-Tip.bottom {
          bottom: calc(var(--tooltip-margin) * -1);
        }
        /* CSS border triangles */
        .Tooltip-Tip.bottom::before {
          bottom: 100%;
          border-bottom-color: var(--tooltip-background-color);
        }

        /* Absolute positioning */
        .Tooltip-Tip.left {
          left: auto;
          right: calc(100% + var(--tooltip-margin));
          top: 50%;
          transform: translateX(0) translateY(-50%);
        }
        /* CSS border triangles */
        .Tooltip-Tip.left::before {
          left: auto;
          right: calc(var(--tooltip-arrow-size) * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: var(--tooltip-background-color);
        }
      `}</style>
    </div>
  );
};

export default Tooltip;

const Wrapper = styled.div`
  :root {
    --tooltip-text-color: white;
    --tooltip-background-color: black;
    --tooltip-margin: 30px;
    --tooltip-arrow-size: 6px;
  }

  /* Wrapping */
  .Tooltip-Wrapper {
    display: inline-block;
    position: relative;
  }

  /* Absolute positioning */
  .Tooltip-Tip {
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    color: var(--tooltip-text-color);
    background: var(--tooltip-background-color);
    font-size: 14px;
    font-family: sans-serif;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;
  }

  /* CSS border triangles */
  .Tooltip-Tip::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
  }

  /* Absolute positioning */
  .Tooltip-Tip.top {
    top: calc(var(--tooltip-margin) * -1);
  }
  /* CSS border triangles */
  .Tooltip-Tip.top::before {
    top: 100%;
    border-top-color: var(--tooltip-background-color);
  }

  /* Absolute positioning */
  .Tooltip-Tip.right {
    left: calc(100% + var(--tooltip-margin));
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  .Tooltip-Tip.right::before {
    left: calc(var(--tooltip-arrow-size) * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: var(--tooltip-background-color);
  }

  /* Absolute positioning */
  .Tooltip-Tip.bottom {
    bottom: calc(var(--tooltip-margin) * -1);
  }
  /* CSS border triangles */
  .Tooltip-Tip.bottom::before {
    bottom: 100%;
    border-bottom-color: var(--tooltip-background-color);
  }

  /* Absolute positioning */
  .Tooltip-Tip.left {
    left: auto;
    right: calc(100% + var(--tooltip-margin));
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  .Tooltip-Tip.left::before {
    left: auto;
    right: calc(var(--tooltip-arrow-size) * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: var(--tooltip-background-color);
  }
`;
