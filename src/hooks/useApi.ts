import { type SWRConfiguration, useSWRConfig } from 'swr/_internal'
import useSWRImmutable from 'swr/immutable'
import useSWRInfinite from 'swr/infinite'

import {
  ResasResponse,
  ResasResult,
  isResasError,
  isResasErrorUnrecoverable,
} from '@/types/ResasResponse'
import { fetcher } from '@/utils/api'

export const useApi = <T>(path: string) => {
  const config = useSWRConfig() as SWRConfiguration
  const result = useSWRImmutable<ResasResponse<T>>(path, fetcher, {
    ...config,
    shouldRetryOnError(error) {
      return isResasError(error) && isResasErrorUnrecoverable(error)
    },
  })

  return { ...result, data: (result.data as ResasResult<T>)?.result }
}

export const useApiMultiple = <T>(paths: string[]) => {
  const config = useSWRConfig() as SWRConfiguration
  // フックをループ内で呼び出してはいけない
  // 一度に複数のAPI呼び出し（回数不定）をするため
  // useSWRInfinite を使用
  const result = useSWRInfinite<ResasResponse<T>>(
    (idx) => paths[idx],
    fetcher,
    {
      ...config,
      shouldRetryOnError(error) {
        return isResasError(error) && isResasErrorUnrecoverable(error)
      },
      revalidateFirstPage: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  )

  return {
    ...result,
    data: result.data?.map((resp) => (resp as ResasResult<T>)?.result),
  }
}
