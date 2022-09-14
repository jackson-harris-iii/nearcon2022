import {
  NearBindgen,
  near,
  call,
  view,
  initialize,
  UnorderedMap,
  Vector,
} from 'near-sdk-js'
import { Entries, Entry, STORAGE_COST } from './model'

@NearBindgen({})
class AlignmintProxyContract {
  proxyMap: UnorderedMap = new UnorderedMap('map-uid-1')
  // proxyVector = new Vector('unique-id-vector1')
  proxyEntries: Entry[] = []

  @call({ payableFunction: true })
  // entryKey: storename_nftname
  // entry: metaData(JSON) as a String
  updateProxyMapEntry(
    { entryKey, entry } = { entryKey: String, entry: String }
  ) {
    // let owner = near.predecessorAccountId()
    let id = `${entryKey}`
    let entryData = `${entry}`
    let existingEntry = (this.proxyMap.get(id) as string) || undefined

    let list = []
    const newEntry = new Entry({ id, entry: entryData })

    if (typeof existingEntry === 'string') {
      near.log(existingEntry)
      near.log('match found')
      list = JSON.parse(existingEntry)
      near.log(list)
      const update = list.push(entryData)
      this.proxyMap.set(id, `${update}`)
    } else {
      this.proxyMap.set(id, `${[newEntry]}`)
    }

    near.log(entryData)
    near.log(newEntry)

    this.proxyMap.set(id, `${[JSON.stringify(newEntry)]}`)

    // Return the total number of proxyMap created so far
    return {
      key: id,
      list,
      value: this.proxyMap.get(id) as string,
      total: Object.keys(this.proxyMap).length,
    }
  }

  @view({})
  get_proxyMap({ id } = { id: String }) {
    const lookup = `${id}`
    const entry = this.proxyMap.get(lookup) as string
    near.log(lookup)
    near.log(entry)
    return entry
  }

  //might need single read request from contract

  @view({})
  number_of_proxies() {
    return Object.keys(this.proxyMap).length
  }
}
