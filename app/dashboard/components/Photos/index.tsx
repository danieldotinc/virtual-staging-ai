import React from 'react';

import PhotoItem from '../PhotoItem';
import { Photo } from '@/app/firebase/firestore/photo';

type Props = {
  photos: Photo[];
  selected: string[];
  onSelect: (selected: string[]) => void;
};

const Photos: React.FC<Props> = ({ photos, selected, onSelect }) => {
  const handleSelect = (ref: string) => {
    const isAlreadySelected = selected.some(s => s === ref);
    const updatedSelected = isAlreadySelected ? [...selected].filter(s => s !== ref) : [...selected, ref];
    onSelect(updatedSelected);
  };

  return (
    <div className="flex justify-center flex-wrap">
      {photos.map((image, i) => (
        <PhotoItem key={i} image={image} onSelect={handleSelect} isSelected={selected.some(s => s === image.ref)} />
      ))}
    </div>
  );
};

export default Photos;
