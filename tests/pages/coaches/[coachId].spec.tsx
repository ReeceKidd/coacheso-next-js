import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../../pages/coaches/[coachId]'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { coachId: 'coachId' } })),
}))

jest.mock('../../../lib/graphql/Coach.graphql', () => ({
  useCoachQuery: jest.fn().mockResolvedValue({ name: 'Coach', email: 'test@gmail.com' }),
}))

describe('App', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<App />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<App />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
