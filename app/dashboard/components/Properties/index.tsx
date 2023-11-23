import React from 'react';

import PropertyCard from '../PropertyCard';
import { Property } from '@/app/firebase/firestore/property';
import { sortAlphabetically } from '@/app/utils';

interface Props {
  properties: Property[];
}

const Properties = ({ properties }: Props) => (
  <div className='flex justify-center flex-wrap'>
    {sortAlphabetically(properties, 'title').map((property, i) => (
      <PropertyCard key={i} property={property} />
    ))}
  </div>
);

export default Properties;
