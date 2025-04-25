import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const ConfirmDialog = ({ resolver }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (document && containerRef.current) {
      document.body.appendChild(containerRef.current);
    }
    return () => {
      if (document && containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="sc-bkkeKt kBjSXI" style={{ opacity: 1 }}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={300}
        classNames={{
          appear: 'scale-appear',
          appearActive: 'scale-appear-active',
        }}
      >
        <div className="sc-dlVxhl gvBCkE" style={{ transform: 'scale(1)', opacity: 1 }}>
          <div className="sc-hGPBjI hyKsfV">
            <div className="message">
              Sorry! You need set up a new seed before validating the data (the server
              seed is encrypted)
            </div>
            <div className="btns">
              <button
                onClick={() => resolver(false)}
                className="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-normal cancle"
              >
                <div className="button-inner">Cancel</div>
              </button>
              <button
                onClick={() => resolver(true)}
                className="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal light"
              >
                <div className="button-inner">Confirm</div>
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ConfirmDialog;

const styles = `
    .kBjSXI {
      position: fixed;
      z-index: 9999;
      inset: 0px;
      background-color: rgba(0, 0, 0, 0.7);
      filter: none !important;
    }

    .gvBCkE {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0px;
      height: 0px;
    }
    .gvBCkE > div {
      transform: translate(-50%, -50%);
    }

    .hyKsfV {
      width: 26.25rem;
      background-color: rgb(30, 32, 36);
      border-radius: 1.25rem;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 0.125rem 1.25rem 0px;
    }
    .hyKsfV .message {
      font-size: 1rem;
      line-height: 1.25rem;
      min-height: 12.5rem;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 0px 1.875rem;
      text-align: center;
    }
    .hyKsfV .btns > button:last-child {
      margin-right: 0px;
    }
    .hyKsfV .btns {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 0px 0px 2.5rem;
    }
    .hyKsfV .btns button {
      width: 9.375rem;
      height: 2.75rem;
      margin-right: 1rem;
    }
    .gEBngo.button {
      color: rgb(245, 246, 247);
      box-shadow: rgba(29, 34, 37, 0.1) 0px 4px 8px 0px;
      background-color: rgb(107, 113, 128);
    }
    .scale-appear {
      opacity: 0.5;
      transform: scale(0.7);
    }
    .scale-appear-active {
      opacity: 1;
      transform: scale(1);
      transition: opacity 300ms, transform 300ms;
    }
`;

// You would need to add this style to your app, for example:
// <style>{styles}</style>
