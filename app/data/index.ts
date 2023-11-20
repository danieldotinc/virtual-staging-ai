export type Property = {
  title: string;
  rent: string;
  areaCode: string;
  street: string;
  numberOfRooms: string;
  numberOfBaths: string;
  cover: { id: string; link: string };
  images: { id: string; link: string }[];
};

export const properties: Property[] = [
  {
    title: 'Modern 4-room apartment',
    rent: '$1800',
    areaCode: '80539',
    street: 'Maximilian St.',
    numberOfRooms: '4',
    numberOfBaths: '2',
    cover: { id: 'a', link: '/buildings/building-0.jpeg' },
    images: [{ id: 'a', link: '/buildings/building-0.jpeg' }],
  },
  {
    title: 'Spacious with underfloor heating',
    rent: '$2040',
    areaCode: '80687',
    street: 'Nymphenburger St.',
    numberOfRooms: '3',
    numberOfBaths: '2',
    cover: { id: 'b', link: '/buildings/building-1.jpeg' },
    images: [{ id: 'b', link: '/buildings/building-1.jpeg' }],
  },
  {
    title: 'A beautiful, large corner balcony',
    rent: '$1940',
    areaCode: '80303',
    street: 'Erika-Mann-St.',
    numberOfRooms: '2',
    numberOfBaths: '1',
    cover: { id: 'c', link: '/buildings/building-2.jpeg' },
    images: [{ id: 'c', link: '/buildings/building-2.jpeg' }],
  },
];

export const images = [
  {
    id: 'a',
    link: '/buildings/building-0.jpeg',
  },
  {
    id: 'b',
    link: '/buildings/building-1.jpeg',
  },
  {
    id: 'c',
    link: '/buildings/building-2.jpeg',
  },
  {
    id: 'd',
    link: '/buildings/building-3.jpeg',
  },
  {
    id: 'e',
    link: '/buildings/building-4.jpeg',
  },
];
