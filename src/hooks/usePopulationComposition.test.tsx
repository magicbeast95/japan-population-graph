import { renderHook, waitFor } from '@testing-library/react'

import {
  usePopulationComposition,
  usePopulationCompositions,
} from './usePopulationComposition'

describe('usePopulationComposition', () => {
  it('should return population composition', async () => {
    const { result } = renderHook(() => usePopulationComposition(13, '-'))

    await waitFor(() => {
      expect(result.current.comp?.boundaryYear).toBe(2020)
      expect(result.current.comp?.data).toHaveLength(4)
    })
  })
})

describe('usePopulationCompositions', () => {
  it('should return multiple population composition', async () => {
    const { result } = renderHook(() => usePopulationCompositions([13, 14, 15]))

    await waitFor(() => {
      expect(result.current.comps).toHaveLength(3)
    })
  })
})
