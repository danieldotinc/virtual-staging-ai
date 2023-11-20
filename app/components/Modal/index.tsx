import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  text: string;
  title: string;
  classes: string;
  children: ReactNode;
  closed: boolean;
}

const Modal = ({ text, title, classes, children, closed }: Props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (closed) setShowModal(false);
  }, [closed]);

  return (
    <>
      <button
        type='button'
        onClick={() => setShowModal(true)}
        className={`bg-cyan-600 ml-6 text-white hover:bg-cyan-500 font-light rounded-lg text-sm ${classes} h-[36px] text-center shadow-lg ease-linear transition-all duration-150 `}
      >
        {text}
      </button>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-4 rounded-t'>
                  <h3 className='self-center text-xl whitespace-nowrap font-light tracking-widest text-black'>
                    {title}
                  </h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-base outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='flex justify-end align-top items-end bg-transparent text-gray-500  h-6 w-6 text-2xl outline-none focus:outline-none hover:text-gray-400'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='relative p-6 pt-4 flex-auto'>{children}</div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
