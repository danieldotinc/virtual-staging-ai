import React from 'react';
import { Dropdown } from 'flowbite-react';
import { properties } from '@/app/data';

type Props = {
  count: number;
  onSelect: (title: string) => void;
};

const DropDown: React.FC<Props> = ({ count, onSelect }) => {
  return (
    <Dropdown
      label={`+ Add to property (${count})`}
      style={{ backgroundColor: '#eab308', fontWeight: '300', height: '36px', width: '200px' }}
      className="overflow-scroll max-h-60"
    >
      {properties.map((p, i) => (
        <Dropdown.Item key={i} onClick={() => onSelect(p.title)}>
          {p.title}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default DropDown;
