import { create } from 'zustand'
import { MenuDataItem } from "@ant-design/pro-components";

interface BearState {
    menu: MenuDataItem[]
    setMenu: (menu: MenuDataItem[]) => void
}

export const useMenuStore = create<BearState>()(
    (set) => ({
        menu: [],
        setMenu: (menu) => set({ menu: menu }),
    }))