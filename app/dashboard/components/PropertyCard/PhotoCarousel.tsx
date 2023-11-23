'use client';

import { Carousel } from '@material-tailwind/react';
import { Photo } from '@/app/firebase/firestore/photo';

interface Props {
  images: Photo[];
}

interface NavProps {
  length: number;
  activeIndex: number;
  setActiveIndex: (v: number) => void;
}

const Navigation = ({ setActiveIndex, activeIndex, length }: NavProps) => (
  <div className='absolute top-5 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
    {new Array(length).fill('').map((_, i) => (
      <span
        key={i}
        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
          activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
        }`}
        onClick={() => setActiveIndex(i)}
      />
    ))}
  </div>
);

const PhotoCarousel = ({ images }: Props) => {
  return images.length <= 1 ? (
    <img
      src={images[0]?.link || '/buildings/default.jpg'}
      className={`rounded-xl shadow-md w-[400px] max-h-[260px] md:w-[${
        images.length === 1 ? '600' : '400'
      }px] md:max-h-[400px] overflow-hidden`}
    />
  ) : (
    <Carousel
      className='rounded-xl shadow-md w-[400px] max-h-[260px] md:w-[600px] md:max-h-[400px] overflow-hidden'
      navigation={Navigation}
    >
      {images.map((im) => (
        <img key={im.ref} src={im.link} />
      ))}
    </Carousel>
  );
};

export default PhotoCarousel;
