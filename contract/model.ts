export const STORAGE_COST: bigint = BigInt('1000000000000000000000')

export class Project {
  storeId: string

  constructor({ storeId }: { storeId: string }) {
    this.storeId = storeId
  }
}
