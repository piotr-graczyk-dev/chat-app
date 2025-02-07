import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './storePersister';

type BearState = {
  bears: number;
  increase: (by: number) => void;
};

export const useBearStore = create<BearState>()(
  persist(
    set => ({
      bears: 0,
      increase: by => set(state => ({ bears: state.bears + by })),
    }),
    {
      name: 'bear-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
