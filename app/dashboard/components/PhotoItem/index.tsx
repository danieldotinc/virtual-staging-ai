'use client';
import React from 'react';
import Image from 'next/image';

import { Photo } from '@/app/firebase/firestore/photoService';

interface Props {
  image: Photo;
  isSelected: boolean;
  onSelect: (ref: string) => void;
}

const PhotoItem = ({ image, isSelected, onSelect }: Props) => (
  <div
    className="relative antialiased text-gray-900 cursor-pointer"
    onClick={!!image.assignedProperty ? () => null : () => onSelect(image.ref)}
  >
    <Image
      src={image.link}
      alt="random image"
      width={600}
      height={400}
      className={`m-5 w-[400px] max-h-[260px] md:w-[600px] md:max-h-[400px] object-cover object-center rounded-lg shadow-lg ${
        isSelected ? 'border-2 border-[#eab308]' : 'hover:border-2 hover:border-cyan-500'
      }`}
    />
    {!!image.assignedProperty && (
      <span className="absolute text-sm top-5 left-1/2 -translate-x-1/2 bg-gray-600 w-[400px] md:w-[600px] text-center text-white opacity-60 rounded-tl-lg rounded-tr-lg p-1 truncate">
        {image.assignedProperty}
      </span>
    )}
    {isSelected && (
      <span className="absolute text-sm top-5 left-1/2 -translate-x-1/2 bg-[#eab308] w-[400px] md:w-[600px] text-right text-white opacity-60 rounded-tl-lg rounded-tr-lg p-1 truncate">
        ✔️
      </span>
    )}
  </div>
);

export default PhotoItem;
