import React, { useCallback, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDropzone } from 'react-dropzone';

import { Property, properties } from '@/app/data';
import property from '@/app/firebase/firestore/property';

const AddProperty = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setUploaded(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (values: Omit<Property, 'cover'>) => {
    console.log(values.images);
    const newProperty = { ...values, cover: { id: '', link: '' }, images: [] };
    properties.push(newProperty);

    const { result, error } = await property.create(newProperty);

    if (error) return console.log(error);
    else console.log(result);

    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-cyan-600 ml-6 text-white hover:bg-cyan-500 font-light rounded-lg text-sm px-20 py-2 w-72 text-center shadow-lg ease-linear transition-all duration-150"
      >
        + Add property
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 rounded-t">
                  <h3 className="self-center text-xl whitespace-nowrap dark:text-white font-light tracking-widest">
                    New Property
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-base outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="flex justify-end align-top items-end bg-transparent text-gray-500  h-6 w-6 text-2xl outline-none focus:outline-none hover:text-gray-400">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 pt-4 flex-auto">
                  <Formik
                    initialValues={{
                      title: '',
                      rent: '',
                      street: '',
                      areaCode: '',
                      numberOfRooms: '',
                      numberOfBaths: '',
                      images: [],
                    }}
                    onSubmit={values => handleSubmit(values)}
                  >
                    {({ setFieldValue }) => (
                      <Form className="flex">
                        <div className="flex-1 p-5 pt-0">
                          <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-base text-gray-500 tracking-wide">
                              Upload property photos
                            </label>
                            <div className="flex items-center justify-center w-full" {...getRootProps()}>
                              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col justify-center items-center">
                                  {uploaded ? (
                                    <div className="flex flex-auto mx-auto -mt-10">
                                      <img
                                        className="has-mask object-center h-48 w-48 mt-8"
                                        src="/buildings/ok.jpg"
                                        alt="freepik image"
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex flex-auto mx-auto -mt-10">
                                        <img
                                          className="has-mask object-center h-36 w-32 mt-8"
                                          src="/buildings/upload.jpg"
                                          alt="freepik image"
                                        />
                                      </div>
                                      <p className="pointer-none text-gray-500 font-light text-sm mt-2">
                                        <span className="text-sm">Drag and drop</span> images here <br /> or{' '}
                                        <label className="text-cyan-600 hover:underline cursor-pointer">
                                          select from your device
                                        </label>
                                        <input type="file" accept="image/*" className="hidden" {...getInputProps()} />
                                      </p>
                                    </>
                                  )}
                                </div>
                              </label>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">
                            <span>Image type: jpeg, png, jpg</span>
                          </p>
                        </div>
                        <div className="flex-1">
                          <Field
                            id="title"
                            name="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mb-4"
                            placeholder="Property title"
                          />

                          <Field
                            id="rent"
                            name="rent"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mb-4"
                            placeholder="Rent $"
                          />

                          <Field
                            id="street"
                            name="street"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mb-4"
                            placeholder="Street"
                          />
                          <Field
                            id="areaCode"
                            name="areaCode"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mb-4"
                            placeholder="Postcode"
                          />

                          <section className="flex mb-6">
                            <Field
                              id="numberOfRooms"
                              name="numberOfRooms"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mr-2"
                              placeholder="Num of rooms"
                            />

                            <Field
                              id="numberOfBaths"
                              name="numberOfBaths"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                              placeholder="Num of baths"
                            />
                          </section>
                          <div className="flex justify-end">
                            <button
                              className="text-gray-500 background-transparent font-base uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              close
                            </button>
                            <button
                              type="submit"
                              className="bg-cyan-600 ml-6 text-white hover:bg-cyan-500 font-light rounded-lg text-sm px-20 py-2 w-34 text-center shadow-lg ease-linear transition-all duration-150"
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddProperty;
