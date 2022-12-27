import React from 'react';
import {PropTypes} from 'prop-types';

function Modal({children, text, show, onClose}) {
  if (!show) {
    return null;
  }
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center'
      onClick={onClose}>
      <div className='bg-white rounded-lg p-4'>
        <div className='flex flex-col justify-end'>
          <p className='text-sm text-center mb-5'>{text}</p>
          <button
            className='text-2xl font-bold'
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  text: PropTypes.string,
};

export default Modal;
