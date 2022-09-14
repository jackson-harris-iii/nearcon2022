export const STORAGE_COST: bigint = BigInt('1000000000000000000000')

export class Entries {
  entries: Entry[]

  constructor() {
    this.entries = []
  }
}

export class Entry {
  id: string
  entry: string

  constructor({ id, entry }: { id: string; entry: string }) {
    this.id = id
    this.entry = entry
  }
}
