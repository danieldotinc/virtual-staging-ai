import React from 'react';

import useActivity from '@/app/store/activity';

const Tabs = () => {
  const [activeTab, setActive] = useActivity(state => [state.activeTab, state.setActive]);

  return (
    <div className="align-middle mb-6 md:mb-0">
      <span
        className={`cursor-pointer text-base border-b-2 pb-1 pr-5 mr-5  hover:text-cyan-500 hover:border-cyan-500 font-light ${
          activeTab === 'properties' ? 'border-cyan-500 text-cyan-600' : 'border-gray-200 text-gray-400'
        }`}
        onClick={() => setActive('properties')}
      >
        Properties
      </span>

      <span
        className={`cursor-pointer text-base border-b-2 pb-1 pr-5 mr-5  hover:text-cyan-500 hover:border-cyan-500 font-light ${
          activeTab === 'photos' ? 'border-cyan-500 text-cyan-600' : 'border-gray-200 text-gray-400'
        }`}
        onClick={() => setActive('photos')}
      >
        All Photos
      </span>
    </div>
  );
};

export default Tabs;
