import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      //vars
      store: null,

      //methods
      setStore: async (storeUpdate) => {
        set((state) => ({
          store: storeUpdate,
        }))
      },
    }),
    {
      name: 'alignmint-local', // unique name
    }
  )
)

export default useStore
