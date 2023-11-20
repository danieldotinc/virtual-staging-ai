import React from 'react';
import { Dropdown } from 'flowbite-react';
import { Property } from '@/app/firebase/firestore/property';

interface Props {
  count: number;
  properties: Property[];
  onSelect: (id: string) => void;
}

const AddToProperty = ({ properties, count, onSelect }: Props) => (
  <Dropdown
    label={`+ Add to property (${count})`}
    style={{
      backgroundColor: '#eab308',
      fontWeight: '300',
      height: '36px',
      width: '200px',
    }}
    className='overflow-scroll max-h-60 z-50 text-black'
  >
    {properties.map((p, i) => (
      <Dropdown.Item key={i} onClick={() => onSelect(p.id)}>
        {p.title}
      </Dropdown.Item>
    ))}
  </Dropdown>
);

export default AddToProperty;
