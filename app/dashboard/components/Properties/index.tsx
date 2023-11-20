'use client';
import React, { useEffect, useState } from 'react';

import PropertyCard from '../PropertyCard';
import property, { Property } from '@/app/firebase/firestore/property';

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const list = await property.list();
      setProperties(list);
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex justify-center flex-wrap">
      {properties.map((property, i) => (
        <PropertyCard key={i} property={property as unknown as Property} />
      ))}
    </div>
  );
};

export default Properties;
