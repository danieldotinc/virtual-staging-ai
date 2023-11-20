'use client';
import React from 'react';

import PhotoItem from '../PhotoItem';
import { Photo } from '@/app/firebase/firestore/photo';

interface Props {
  photos: Photo[];
  selected?: string[];
  onSelect?: (selected: string[]) => void;
}

const Photos = ({ photos, selected, onSelect }: Props) => {
  const handleSelect = (ref: string) => {
    if (!onSelect || !selected) return;
    const isAlreadySelected = selected.some((s) => s === ref);
    const updatedSelected = isAlreadySelected
      ? [...selected].filter((s) => s !== ref)
      : [...selected, ref];
    onSelect(updatedSelected);
  };

  return (
    <div className='flex justify-center flex-wrap'>
      {photos.map((image, i) => (
        <PhotoItem
          key={i}
          image={image}
          onSelect={handleSelect}
          isSelected={!!selected?.some((s) => s === image.ref)}
        />
      ))}
    </div>
  );
};

export default Photos;
