import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Photo } from '@/app/firebase/firestore/photo';

interface Props {
  onUploadDone: (photos: Photo[]) => void;
}

const UploadPhotos = ({ onUploadDone }: Props) => {
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const list: Photo[] = [];
    for (const file of acceptedFiles) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            list.push({ ref: storageRef.fullPath, link: downloadURL });

            if (list.length === acceptedFiles.length) {
              setUploaded(true);
              onUploadDone([...list]);
            }
          });
        }
      );
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='flex'>
      <div className='flex-1 p-5 pt-0'>
        <div className='grid grid-cols-1 space-y-2'>
          <span className='text-sm font-base text-gray-500 tracking-wide'>
            Upload property photos
          </span>
          <div
            className='flex items-center justify-center w-full'
            {...getRootProps()}
          >
            <div className='flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center'>
              <div className='h-full w-full text-center flex flex-col justify-center items-center'>
                {uploaded ? (
                  <div className='flex flex-auto mx-auto -mt-10'>
                    <img
                      className='has-mask object-center h-48 w-48 mt-8'
                      src='/buildings/ok.jpg'
                      alt='freepik image'
                    />
                  </div>
                ) : (
                  <>
                    <div className='flex flex-auto mx-auto -mt-10 cursor-pointer'>
                      <img
                        className='has-mask object-center h-36 w-32 mt-8'
                        src='/buildings/upload.jpg'
                        alt='freepik image'
                      />
                    </div>
                    <p className='pointer-none text-gray-500 font-light text-sm mt-2'>
                      <span className='text-sm'>Drag and drop</span> images here{' '}
                      <br /> or{' '}
                      <span className='text-cyan-600 hover:underline cursor-pointer'>
                        select from your device
                      </span>
                      <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        {...getInputProps()}
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className='text-sm text-gray-300'>
          <span>Image type: jpeg, png, jpg</span>
        </p>
      </div>
    </div>
  );
};

export default UploadPhotos;
