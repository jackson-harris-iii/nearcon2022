import { NearBindgen, near, call, view, initialize, UnorderedMap } from 'near-sdk-js'
import { Project, STORAGE_COST } from './model'

export function assert(statement, message) {
  if (!statement) {
    throw Error(`Assertion failed: ${message}`)
  }
}

@NearBindgen({})
class AlignmintContract {
  projects: UnorderedMap = new UnorderedMap('map-uid-1');


  @call({payableFunction: true})
  createProject({storeId}={storeId:String}) {

    let owner = near.predecessorAccountId();
    let ownerProjects = this.projects.get(owner)

    let list = []
    if (typeof ownerProjects === 'string') {
      list = JSON.parse(ownerProjects)
    }

    const update = list.push(storeId)


    this.projects.set(owner, JSON.stringify(update))
    
    // Return the total number of projects created so far
    return Object.keys(this.projects).length
  }
  

  @view({})
  get_projects(){ return this.projects }

  // @view({})
  // number_of_projects() { return Object.keys(this.projects).length }