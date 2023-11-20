import React from 'react';

import PropertyCard from '../PropertyCard';
import { Property } from '@/app/firebase/firestore/property';

interface Props {
  properties: Property[];
}

const Properties = ({ properties }: Props) => (
  <div className='flex justify-center flex-wrap'>
    {properties.map((property, i) => (
      <PropertyCard key={i} property={property} />
    ))}
  </div>
);

export default Properties;
