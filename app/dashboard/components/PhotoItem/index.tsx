import React from 'react';
import { Photo } from '@/app/firebase/firestore/photo';
import { Property } from '@/app/firebase/firestore/property';

type Props = {
  image: Photo;
  isSelected: boolean;
  onSelect: (ref: string) => void;
};

const PhotoItem: React.FC<Props> = ({ image, isSelected, onSelect }) => {
  return (
    <div
      className="relative cursor-pointer"
      onClick={!!image.assignedProperty ? () => null : () => onSelect(image.ref)}
    >
      <img
        src={image.link}
        alt="random image"
        className={`m-5 w-[350px] object-cover object-center rounded-lg shadow-lg ${
          isSelected ? 'border-2 border-[#eab308]' : 'hover:border-2 hover:border-cyan-500'
        }`}
      />
      {!!image && (
        <span className="absolute text-sm top-5 left-1/2 -translate-x-1/2 bg-gray-600 w-[350px] text-center text-white opacity-60 rounded-tl-lg rounded-tr-lg p-1 truncate">
          {image.assignedProperty}
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

export default PhotoItem;
