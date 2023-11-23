import React from 'react';

import PropertyCard from '../PropertyCard';
import useProperties from '@/app/store/properties';
import { sortAlphabetically } from '@/app/utils';

const Properties = () => {
  const properties = useProperties(state => state.properties);

  return (
    <div className="flex justify-center flex-wrap">
      {sortAlphabetically(properties, 'title').map((property, i) => (
        <PropertyCard key={i} property={property} />
      ))}
    </div>
  );
};

export default Properties;
