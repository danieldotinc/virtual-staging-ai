'use client';
import React, { useEffect, useState } from 'react';

import Photos from './components/Photos';
import AddToProperty from './components/AddToProperty';
import Properties from './components/Properties';
import AddPropertyBtn from './components/AddPropertyBtn';
import UploadPhotosBtn from './components/UploadPhotosBtn';

import property, { Property } from '../firebase/firestore/property';
import photo, { Photo } from '../firebase/firestore/photo';
import { sortAlphabetically } from '../utils';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const [properties, setProperties] = useState<Property[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleSelect = (selected: string[]) => {
    setSelectedPhotos(selected);
  };

  const handlePropertyAdded = (p: Property) => {
    setProperties([p, ...properties]);
    setPhotos([...p.images, ...photos]);
  };

  const handlePhotosUploaded = (ps: Photo[]) => {
    setPhotos([...ps, ...photos]);
  };

  const handleAddToProperty = async (propertyId: string) => {
    const clonedPhotos = [...photos];
    const clonedProperties = [...properties];

    const { id: sid, ...found } = properties.find((p) => p.id === propertyId)!;
    const newImages = photos.filter((img) => selectedPhotos.includes(img.ref));
    const images = [...found.images, ...newImages];
    await property.update(propertyId, { ...found, images, cover: images[0] });

    const mappedProperties = clonedProperties.map((cp) =>
      cp.id === propertyId ? { ...cp, images, cover: images[0] } : cp
    );

    const mappedPhotos = clonedPhotos.map((cp) =>
      selectedPhotos.includes(cp.ref)
        ? { ...cp, assignedProperty: found.title }
        : cp
    );

    setSelectedPhotos([]);
    setPhotos(mappedPhotos);
    setProperties(mappedProperties);
  };

  const fetchState = async () => {
    const propertyList = await property.list();
    const photoList = await photo.list();

    setPhotos(photoList);
    setProperties(propertyList);
  };

  useEffect(() => {
    fetchState();
  }, []);

  useEffect(() => {
    if (photos.length) {
      const mappedPhotos = photos.map((item) => ({
        ...item,
        assignedProperty:
          properties.find((p) => p.images.some((i) => i.ref === item.ref))
            ?.title || '',
      }));

      setPhotos(sortAlphabetically(mappedPhotos, 'assignedProperty'));
    }
  }, [photos.length]);

  return (
    <div className='flex-1 flex flex-col pt-24'>
      <div className='flex justify-between w-9/12 self-center align-middle flex-col md:flex-row'>
        <div className='align-middle mb-6 md:mb-0'>
          <span
            className={`cursor-pointer text-base border-b-2 pb-1 pr-5 mr-5  hover:text-cyan-500 hover:border-cyan-500 font-light ${
              activeTab === 'properties'
                ? 'border-cyan-500 text-cyan-600'
                : 'border-gray-200 text-gray-400'
            }`}
            onClick={() => {
              setActiveTab('properties');
              setSelectedPhotos([]);
            }}
          >
            Properties
          </span>

          <span
            className={`cursor-pointer text-base border-b-2 pb-1 pr-5 mr-5  hover:text-cyan-500 hover:border-cyan-500 font-light ${
              activeTab === 'photos'
                ? 'border-cyan-500 text-cyan-600'
                : 'border-gray-200 text-gray-400'
            }`}
            onClick={() => setActiveTab('photos')}
          >
            All Photos
          </span>
        </div>

        <div className='flex flex-1 justify-end flex-col md:flex-row'>
          {activeTab === 'photos' && !!selectedPhotos.length && (
            <div className='mb-3 md:mb-0 flex justify-center'>
              <AddToProperty
                properties={properties}
                count={selectedPhotos.length}
                onSelect={handleAddToProperty}
              />
            </div>
          )}

          {activeTab === 'properties' ? (
            <AddPropertyBtn onPropertyAdded={handlePropertyAdded} />
          ) : (
            <UploadPhotosBtn onPhotosUploaded={handlePhotosUploaded} />
          )}
        </div>
      </div>

      {activeTab === 'properties' ? (
        <Properties properties={properties} />
      ) : (
        <Photos
          photos={photos}
          selected={selectedPhotos}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Dashboard;
