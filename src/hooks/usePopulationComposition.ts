import { useApi, useApiMultiple } from './useApi'
import type { PopulationComposition } from '@/types/PopulationComposition'

export const usePopulationComposition = (
  prefCode: number,
  cityCode: number | '-'
) => {
  const {
    data: comp,
    error,
    isLoading,
  } = useApi<PopulationComposition>(
    `/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=${cityCode}`
  )

  return { comp, error, isLoading }
}

export const usePopulationCompositions = (prefCodes: number[]) => {
  const {
    data: comps,
    size,
    setSize,
    error,
    isLoading,
  } = useApiMultiple<PopulationComposition>(
    prefCodes.map(
      (c) => `/api/v1/population/composition/perYear?prefCode=${c}&cityCode=-`
    )
  )

  return { comps, size, setSize, error, isLoading }
}
