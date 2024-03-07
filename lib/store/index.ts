import {create} from "zustand";
import {createUserSlice, UserSlice} from "@/lib/store/user";

export const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a)
}))