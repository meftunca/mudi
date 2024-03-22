import { create } from 'zustand';

export const usePageController = create<{
  title: string
  setTitle: (title: string) => void
}>((set) => ({
  title: 'Maple',
  setTitle: (title: string) => set({ title }),
}))
