import React from 'react';
import { Property } from '@/app/firebase/firestore/property';

type Props = {
  property: Property;
};

const PropertyCard: React.FC<Props> = ({ property }) => {
  return (
    <div className="m-6 antialiased text-gray-900">
      <div>
        <img
          src={property.cover.link || '/buildings/default.jpg'}
          alt=" random imgee"
          className="w-[350px] object-cover object-center rounded-lg shadow-md"
        />

        <div className="px-4 relative -mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                New
              </span>
              <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                {property.numberOfBaths} baths &bull; {property.numberOfRooms} rooms
              </div>
            </div>

            <h4 className="mt-1 text-sm font-semibold uppercase leading-tight truncate w-64">{property.title}</h4>

            <div className="mt-1">
              {property.rent}
              <span className="text-gray-600 text-sm"> /mo</span>
            </div>
            <div className="mt-4">
              <span className="text-teal-600 text-md font-semibold">{property.areaCode} </span>
              <span className="text-sm text-gray-600">({property.street})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
