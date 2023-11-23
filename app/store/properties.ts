import { create } from 'zustand';
import { Property } from '../firebase/firestore/propertyService';

interface State {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
}

const useProperties = create<State>(set => ({
  properties: [],
  setProperties: (properties: Property[]) => set(state => ({ properties })),
}));

export default useProperties;
