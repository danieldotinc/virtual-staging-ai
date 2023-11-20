import React from 'react';

import UploadPhotos from '@/app/components/UploadPhotos';
import Modal from '@/app/components/Modal';
import { Photo } from '@/app/firebase/firestore/photo';

interface Props {
  onPhotosUploaded: (ph: Photo[]) => void;
}

const UploadPhotosBtn = ({ onPhotosUploaded }: Props) => {
  return (
    <Modal
      text='+ Upload photos'
      title='Upload photos'
      classes='w-[300px]'
      closed={false}
    >
      <UploadPhotos onUploadDone={onPhotosUploaded} />
    </Modal>
  );
};

export default UploadPhotosBtn;
