import { render, waitFor } from '@testing-library/react'

import PrefectureFilter from './PrefectureFilter'

describe('PrefectureFilter', () => {
  it('should have 47 prefectures', async () => {
    const { container } = render(<PrefectureFilter />)

    await waitFor(() => {
      expect(container.querySelectorAll('label > span')).toHaveLength(47)
    })
  })
})
