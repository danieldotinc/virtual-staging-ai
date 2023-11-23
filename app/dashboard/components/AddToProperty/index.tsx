import React from 'react';
import { Dropdown } from 'flowbite-react';

import usePhotos from '@/app/store/photos';
import useProperties from '@/app/store/properties';

import propertyService from '@/app/firebase/firestore/propertyService';

const AddToProperty = () => {
  const [properties, setProperties] = useProperties(state => [state.properties, state.setProperties]);
  const [photos, setPhotos, selected, setSelected] = usePhotos(state => [
    state.photos,
    state.setPhotos,
    state.selected,
    state.setSelected,
  ]);

  const handleAddToProperty = async (propertyId: string) => {
    const clonedPhotos = [...photos];
    const clonedProperties = [...properties];

    const { id: sid, ...found } = properties.find(p => p.id === propertyId)!;
    const newImages = photos.filter(img => selected.includes(img.ref));
    const images = [...found.images, ...newImages];
    await propertyService.update(propertyId, { ...found, images, cover: images[0] });

    const mappedProperties = clonedProperties.map(cp =>
      cp.id === propertyId ? { ...cp, images, cover: images[0] } : cp
    );

    const mappedPhotos = clonedPhotos.map(cp =>
      selected.includes(cp.ref) ? { ...cp, assignedProperty: found.title } : cp
    );

    setSelected([]);
    setPhotos(mappedPhotos);
    setProperties(mappedProperties);
  };

  return (
    <div className="mb-3 md:mb-0 flex justify-center">
      <Dropdown
        label={`+ Add to property (${selected.length})`}
        style={{
          backgroundColor: '#eab308',
          fontWeight: '300',
          height: '36px',
          width: '200px',
        }}
        className="overflow-scroll max-h-60 z-50 text-black"
      >
        {properties.map((p, i) => (
          <Dropdown.Item key={i} onClick={() => handleAddToProperty(p.id)}>
            {p.title}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default AddToProperty;
