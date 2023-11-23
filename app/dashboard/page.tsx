'use client';
import React, { useEffect } from 'react';

import Tabs from './components/Tabs';
import Photos from './components/Photos';
import Actions from './components/Actions';
import Properties from './components/Properties';

import photoService from '../firebase/firestore/photoService';
import propertyService from '../firebase/firestore/propertyService';

import usePhotos from '../store/photos';
import useActivity from '../store/activity';
import useProperties from '../store/properties';

import { sortAlphabetically } from '../utils';

const Dashboard = () => {
  const activeTab = useActivity(state => state.activeTab);

  const [photos, setPhotos] = usePhotos(state => [state.photos, state.setPhotos]);
  const [properties, setProperties] = useProperties(state => [state.properties, state.setProperties]);

  const fetchState = async () => {
    const propertyList = await propertyService.list();
    const photoList = await photoService.list();

    setPhotos(photoList);
    setProperties(propertyList);
  };

  useEffect(() => {
    fetchState();
  }, []);

  useEffect(() => {
    if (photos.length) {
      const mappedPhotos = photos.map(item => ({
        ...item,
        assignedProperty: properties.find(p => p.images.some(i => i.ref === item.ref))?.title || '',
      }));

      setPhotos(sortAlphabetically(mappedPhotos, 'assignedProperty'));
    }
  }, [photos.length]);

  return (
    <div className="flex-1 flex flex-col pt-24">
      <div className="flex justify-between w-9/12 self-center align-middle flex-col md:flex-row">
        <Tabs />
        <Actions />
      </div>
      {activeTab === 'properties' ? <Properties /> : <Photos />}
    </div>
  );
};

export default Dashboard;
