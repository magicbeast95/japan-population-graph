import { useApi } from './useApi'
import type { Prefecture } from '@/types/Prefecture'

export const usePrefectures = () => {
  const {
    data: prefs,
    isLoading,
    error,
  } = useApi<Prefecture[]>('/api/v1/prefectures')

  return { prefs, isLoading, error }
}
