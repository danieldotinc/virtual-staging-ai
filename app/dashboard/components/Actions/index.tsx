import React from 'react';

import AddToProperty from '../AddToProperty';
import AddPropertyBtn from '../AddPropertyBtn';
import UploadPhotosBtn from '../UploadPhotosBtn';

import usePhotos from '@/app/store/photos';
import useActivity from '@/app/store/activity';

const Actions = () => {
  const selected = usePhotos(state => state.selected);
  const activeTab = useActivity(state => state.activeTab);

  return (
    <div className="flex flex-1 justify-end flex-col md:flex-row">
      {!!selected.length && <AddToProperty />}
      {activeTab === 'properties' ? <AddPropertyBtn /> : <UploadPhotosBtn />}
    </div>
  );
};

export default Actions;
