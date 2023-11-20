'use client';
import React, { useEffect, useState } from 'react';

import Photos from './components/Photos';
import DropDown from './components/DropDown';
import Properties from './components/Properties';
import AddProperty from './components/AddProperty';
import UploadPhotos from './components/UploadPhotos';

import property, { Property } from '../firebase/firestore/property';
import photo, { Photo } from '../firebase/firestore/photo';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const [properties, setProperties] = useState<Property[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleSelect = (selected: string[]) => {
    setSelectedPhotos(selected);
  };

  const handleAddToProperty = (title: string) => {
    const index = properties.findIndex(p => p.title === title);
    const imgList = photos.filter(img => selectedPhotos.includes(img.ref));
    properties[index].images.push(...imgList);
    setSelectedPhotos([]);
  };

  useEffect(() => {
    const fetchState = async () => {
      const propertyList = await property.list();
      const photoList = await photo.list();

      setPhotos(photoList);
      setProperties(propertyList);
    };

    fetchState();
  }, []);

  useEffect(() => {
    if (photos.length) {
      const mappedPhotos = photos.map(item => ({
        ...item,
        assignedProperty: properties.find(p => p.images.some(i => i.ref === item.ref))?.title,
      }));
      setPhotos(mappedPhotos);
    }
  }, [photos.length]);

  return (
    <div className="flex flex-col pt-24">
      <div className="flex justify-between w-9/12 self-center align-middle">
        <div className="align-middle">
          <span
            className={`cursor-pointer text-base border-b-2 pb-1 pr-5 mr-5  hover:text-cyan-500 hover:border-cyan-500 font-light ${
              activeTab === 'photos' ? 'border-cyan-500 text-cyan-600' : 'border-gray-200 text-gray-400'
            }`}
            onClick={() => setActiveTab('photos')}
          >
            All Photos
          </span>
          <span
            className={`cursor-pointer text-base border-b-2 pb-1 pr-5 mr-5  hover:text-cyan-500 hover:border-cyan-500 font-light ${
              activeTab === 'properties' ? 'border-cyan-500 text-cyan-600' : 'border-gray-200 text-gray-400'
            }`}
            onClick={() => {
              setActiveTab('properties');
              setSelectedPhotos([]);
            }}
          >
            Properties
          </span>
        </div>

        <div className="w-2/3 flex justify-end">
          {activeTab === 'photos' && !!selectedPhotos.length && (
            <div className="">
              <DropDown properties={properties} count={selectedPhotos.length} onSelect={handleAddToProperty} />
              {/* <button
                type="button"
                className="bg-[#eab308] ml-2 text-white hover:bg-[#fbbf24] font-light rounded-lg text-sm py-2 w-44 text-center shadow-lg"
              >
                + Add to property ({selectedPhotos.length})
              </button> */}
            </div>
          )}

          {activeTab === 'properties' ? <AddProperty /> : <UploadPhotos />}
        </div>
      </div>
      {activeTab === 'properties' ? (
        <Properties properties={properties} />
      ) : (
        <Photos photos={photos} selected={selectedPhotos} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default Dashboard;
