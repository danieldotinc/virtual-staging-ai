import React from 'react';

import Modal from '@/app/components/Modal';
import UploadPhotos from '@/app/components/UploadPhotos';

import { Photo } from '@/app/firebase/firestore/photoService';
import usePhotos from '@/app/store/photos';

const UploadPhotosBtn = () => {
  const [photos, setPhotos] = usePhotos(state => [state.photos, state.setPhotos]);

  const handleUploadDone = (ps: Photo[]) => setPhotos([...ps, ...photos]);

  return (
    <Modal text="+ Upload photos" title="Upload photos" classes="w-[300px]" closed={false}>
      <UploadPhotos onUploadDone={handleUploadDone} />
    </Modal>
  );
};

export default UploadPhotosBtn;
