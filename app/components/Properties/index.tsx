import React from 'react';
import PropertyCard from '../PropertyCard';

const Properties = () => {
  const properties = new Array(5).fill(1);
  return (
    <div className="flex flex-col pt-24">
      <div className="flex justify-between w-9/12 self-center align-middle">
        <div className="align-middle">
          <span className="cursor-pointer text-base border-b-2 pb-1 border-gray-200 pr-5 mr-5 text-gray-400 hover:text-cyan-500 hover:border-cyan-500 font-light">
            All Photos
          </span>
          <span className="cursor-pointer text-base border-b-2 pb-1 border-cyan-500 pr-5 mr-5 text-cyan-600 hover:text-cyan-500 hover:border-cyan-500 font-light">
            Properties
          </span>
        </div>
        <button
          type="button"
          className="bg-cyan-600 ml-6 text-white hover:bg-cyan-500 font-light rounded-lg text-sm px-20 py-2 text-center"
        >
          + Upload photo
        </button>
      </div>
      <div className="flex justify-center flex-wrap">
        {properties.map((name, i) => (
          <PropertyCard key={i} property={{ img: `/buildings/building-${i}.jpeg` }} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
