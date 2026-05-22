import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type ToastStatus = "loading" | "success" | "error";

interface ToastState {
  status: ToastStatus | null;
  message: string | null;
  id: number;
}

interface ToastActions {
  show: (status: ToastStatus, message?: string) => void;
  hide: () => void;
}

const storeAPI: StateCreator<
  ToastState & ToastActions,
  [["zustand/devtools", never]]
> = (set) => ({
  status: null,
  message: null,
  id: 0,

  show: (status, message) => {
    set(
      (state) => ({
        status,
        message: message ?? null,
        id: state.id + 1,
      }),
      false,
      `show/${status}`,
    );
  },

  hide: () => {
    set({ status: null, message: null }, false, "hide");
  },
});

const useToastStore = create<ToastState & ToastActions>()(
  devtools(storeAPI, { name: "toast-store" }),
);

export { useToastStore };
export type { ToastStatus };
