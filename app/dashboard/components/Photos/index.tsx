'use client';
import React from 'react';

import PhotoItem from '../PhotoItem';
import usePhotos from '@/app/store/photos';

const Photos = () => {
  const [photos, selected, setSelected] = usePhotos(state => [state.photos, state.selected, state.setSelected]);

  const handleSelect = (ref: string) => {
    const isAlreadySelected = selected.some(s => s === ref);
    const updatedSelected = isAlreadySelected ? [...selected].filter(s => s !== ref) : [...selected, ref];
    setSelected(updatedSelected);
  };

  return (
    <div className="flex justify-center flex-wrap">
      {photos.map((image, i) => (
        <PhotoItem key={i} image={image} onSelect={handleSelect} isSelected={!!selected?.some(s => s === image.ref)} />
      ))}
    </div>
  );
};

export default Photos;
