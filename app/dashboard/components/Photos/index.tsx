import React from 'react';

import { images } from '@/app/data';
import ImageItem from '../ImageItem';

type Props = {
  selected: string[];
  onSelect: (selected: string[]) => void;
};

const Photos: React.FC<Props> = ({ onSelect, selected }) => {
  const handleSelect = (id: string) => {
    const isAlreadySelected = selected.some(s => s === id);
    const updatedSelected = isAlreadySelected ? [...selected].filter(s => s !== id) : [...selected, id];
    onSelect(updatedSelected);
  };

  return (
    <div className="flex justify-center flex-wrap">
      {images.map((image, i) => (
        <ImageItem key={i} image={image} onSelect={handleSelect} isSelected={selected.some(s => s === image.id)} />
      ))}
    </div>
  );
};

export default Photos;
