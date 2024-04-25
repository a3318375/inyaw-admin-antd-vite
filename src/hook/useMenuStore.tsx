import { create, StateCreator } from 'zustand'
import { MenuDataItem } from "@ant-design/pro-components";
import { createJSONStorage, persist } from "zustand/middleware";

interface BearState {
    menu: MenuDataItem[]
    setMenu: (menu: MenuDataItem[]) => void
}

const menuPersist = (initializer: StateCreator<BearState>) =>
    persist(initializer, {
        name: 'menu',
        storage: createJSONStorage(() => sessionStorage),
    })

const menuOnePersist = (initializer: StateCreator<BearState>) =>
    persist(initializer, {
        name: 'menu-one',
        storage: createJSONStorage(() => sessionStorage),
    })

export const useMenuStore = create<BearState>()(
    menuPersist((set) => ({
        menu: [],
        setMenu: (menu: MenuDataItem[]) => set({ menu: menu }),
    })),
)

export const useMenuOneStore = create<BearState>()(
    menuOnePersist((set) => ({
        menu: [],
        setMenu: (menu: MenuDataItem[]) => set({ menu: menu }),
    })),
)
