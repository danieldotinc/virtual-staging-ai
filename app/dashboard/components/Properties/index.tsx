'use client';
import React from 'react';

import { properties } from '@/app/data';
import PropertyCard from '../PropertyCard';

const Properties = () => {
  return (
    <div className="flex justify-center flex-wrap">
      {properties.map((property, i) => (
        <PropertyCard key={i} property={property} />
      ))}
    </div>
  );
};

export default Properties;
