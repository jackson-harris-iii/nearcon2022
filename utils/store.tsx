import create from 'zustand'
import { persist } from 'zustand/middleware'

type aStoreState = {
  aStore: any | null
  setAstore: (storeUpdate: any) => void
}

const useStore = create(
  persist(
    (set, get) => ({
      //vars
      aStore: null,

      //methods
      setAstore: async (storeUpdate) => {
        set((state) => ({
          aStore: storeUpdate,
        }))
      },
    }),
    {
      name: 'alignmint-local', // unique name
    }
  )
)

export default useStore
