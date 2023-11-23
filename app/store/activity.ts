import { create } from 'zustand';

interface State {
  activeTab: 'properties' | 'photos';
  setActive: (val: 'properties' | 'photos') => void;
}

const useActivity = create<State>(set => ({
  activeTab: 'properties',
  setActive: (activeTab: 'properties' | 'photos') => set(state => ({ activeTab })),
}));

export default useActivity;
