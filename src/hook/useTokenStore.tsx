import { create } from 'zustand'

interface BearState {
    token: string
    setToken: (token: string) => void
}

export const useTokenStore = create<BearState>()(
    (set) => ({
        token: '',
        setToken: (token) => set({ token: token }),
    }))