export interface Menu {
  name: string
  url: string
  icon: string
  access: string | string[]
  blocked?: string
  except?: string
}

export interface RootMenu extends Menu {
  children?: Menu[]
}

export interface TableOptions {
  page?: number
  itemsPerPage?: number
  sortBy?: string[]
  sortDesc?: boolean[]
  groupBy?: string[]
  groupDesc?: boolean[]
  multiSort?: boolean
  mustSort?: boolean
}
