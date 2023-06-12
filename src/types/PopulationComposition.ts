export type PeoplePerYear = {
  year: number
  value: number
  rate?: number
}

export type CompositionData = {
  label: string
  data: PeoplePerYear[]
}

// 人口構成 (年単位)
export type PopulationComposition = {
  // 実績値と推計値の区切り年
  boundaryYear: number
  data: CompositionData[]
}
