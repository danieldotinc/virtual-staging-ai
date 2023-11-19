import { properties } from '@/app/data';
import React from 'react';

type Props = {
  isSelected: boolean;
  image: { id: string; link: string };
  onSelect: (id: string) => void;
};

const ImageItem: React.FC<Props> = ({ image, isSelected, onSelect }) => {
  const assigned = properties.find(p => p.images.some(i => i.id === image.id));
  return (
    <div className="relative cursor-pointer" onClick={() => onSelect(image.id)}>
      <img
        src={image.link}
        alt="random image"
        className={`m-5 w-[350px] object-cover object-center rounded-lg shadow-lg ${
          isSelected ? 'border-2 border-[#eab308]' : 'hover:border-2 hover:border-cyan-500'
        }`}
      />
      {!!assigned && (
        <span className="absolute text-sm top-5 left-1/2 -translate-x-1/2 bg-gray-600 w-[350px] text-center text-white opacity-60 rounded-tl-lg rounded-tr-lg p-1 truncate">
          {assigned.title}
        </span>
      )}
      {isSelected && (
        <span className="absolute text-sm top-5 left-1/2 -translate-x-1/2 bg-[#eab308] w-[350px] text-right text-white opacity-60 rounded-tl-lg rounded-tr-lg p-1 truncate">
          ✔️
        </span>
      )}
    </div>
  );
};

export default ImageItem;
