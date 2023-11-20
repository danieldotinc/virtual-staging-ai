import React from 'react';
import property from '@/app/firebase/firestore/property';

interface Props {
  params: { id: string };
}

const Property = async ({ params }: Props) => {
  const current = await property.get(params.id);
  return (
    <div className='flex-1 pt-24 self-start'>
      <div className='flex w-full text-black '>
        <div className='px-8 ml-20'>
          <div className='flex items-baseline'>
            <span className='bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide'>
              New
            </span>
            <div className='ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider'>
              {current.numberOfBaths} baths &bull; {current.numberOfRooms} rooms
            </div>
          </div>

          <h4 className='mt-3 text-sm font-semibold uppercase leading-tight truncate w-48'>
            {current.title}
          </h4>
        </div>
        <div>
          <div>
            {current.rent}
            <span className='text-gray-600 text-sm'> /mo</span>
          </div>
          <div>
            <span className='text-teal-600 text-md font-semibold'>
              {current.areaCode}{' '}
            </span>
            <span className='text-sm text-gray-600'>({current.street})</span>
          </div>
        </div>
      </div>
      <div className='flex justify-center flex-wrap'>
        {current.images.map((im) => (
          <div key={im.ref}>
            <img
              src={im.link}
              alt='random image'
              className='m-5 w-[350px] object-cover object-center rounded-lg shadow-l'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
