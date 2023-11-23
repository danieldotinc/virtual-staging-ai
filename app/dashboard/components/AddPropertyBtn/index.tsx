import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import UploadPhotos from '@/app/components/UploadPhotos';
import Modal from '@/app/components/Modal';

import { Photo } from '@/app/firebase/firestore/photoService';
import propertyService, { Property } from '@/app/firebase/firestore/propertyService';

import useProperties from '@/app/store/properties';
import usePhotos from '@/app/store/photos';

const AddPropertyBtn = () => {
  const [closed, setClosed] = useState(false);
  const [images, setImages] = useState<Photo[]>([]);

  const [photos, setPhotos] = usePhotos(state => [state.photos, state.setPhotos]);
  const [properties, setProperties] = useProperties(state => [state.properties, state.setProperties]);

  const handleUploadDone = (photos: Photo[]) => setImages(photos);

  const handleSubmit = async (values: Omit<Property, 'cover' | 'images' | 'id'>) => {
    const newProperty = {
      ...values,
      cover: images[0] ? { ...images[0] } : { ref: '', link: '' },
      images,
    };

    const { result, error } = await propertyService.create(newProperty);
    if (error) return console.log(error);

    setProperties([result, ...properties]);
    setPhotos([...result.images, ...photos]);

    setClosed(true);
  };

  return (
    <Modal text="+ Add property" title="New Property" classes="w-[300px]" closed={closed}>
      <Formik
        initialValues={{
          title: '',
          rent: '',
          street: '',
          areaCode: '',
          numberOfRooms: '',
          numberOfBaths: '',
        }}
        onSubmit={values => handleSubmit(values)}
      >
        <Form className="flex flex-col md:flex-row">
          <UploadPhotos onUploadDone={handleUploadDone} />
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
                onClick={() => setClosed(true)}
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
      </Formik>
    </Modal>
  );
};

export default AddPropertyBtn;
