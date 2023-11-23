import { create } from 'zustand';
import { Photo } from '../firebase/firestore/photoService';

interface State {
  photos: Photo[];
  selected: string[];
  setPhotos: (photos: Photo[]) => void;
  setSelected: (photos: string[]) => void;
}

const usePhotos = create<State>(set => ({
  photos: [],
  selected: [],
  setPhotos: (photos: Photo[]) => set(state => ({ photos })),
  setSelected: (selected: string[]) => set(state => ({ selected })),
}));

export default usePhotos;
