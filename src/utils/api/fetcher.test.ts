import { fetcher } from './fetcher'

describe('fetcher', () => {
  it('should throw', async () => {
    await expect(
      fetcher('/api/v1/population/composition/perYear')
    ).rejects.toThrow()
  })
})
