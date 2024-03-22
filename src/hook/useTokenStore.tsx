import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface BearState {
    token: string
    setToken: (token: string) => void
}

const middlewares = (initializer: StateCreator<BearState>) =>
    devtools(
        persist(initializer, {
            name: 'toekn',
            storage: createJSONStorage(() => sessionStorage),
        }),
    )

export const useTokenStore = create<BearState>()(
    middlewares((set) => ({
        token: '',
        setToken: (token: any) => set({ token: token }),
    })),
);