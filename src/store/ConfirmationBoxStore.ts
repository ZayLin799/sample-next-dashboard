import { create } from "zustand";

type ConfirmDialogState = {
  open: boolean;
  title: string;
  description: string;
  callback: () => void;
  openConfirmDialog: (
    callback: () => void,
    title: string,
    text: string
  ) => void;
  closeConfirmDialog: () => void;
  onConfirm: () => void;
};

const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  open: false,
  title: "",
  description: "",
  callback: () => {},

  openConfirmDialog: (callback, title, description) => {
    set({ open: true, title, description, callback });
  },

  closeConfirmDialog: () => {
    set({ open: false, title: "", description: "", callback: () => {} });
  },

  onConfirm: () => {
    set((state) => {
      state.callback();
      return { open: false, title: "", description: "", callback: () => {} };
    });
  },
}));

export default useConfirmDialogStore;
