import React from 'react'
import renderer from 'react-test-renderer'

import CoachId from '../../../pages/coaches/[coachId]'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { coachId: 'coachId' } })),
}))

jest.mock('../../../lib/graphql/Coach.graphql', () => ({
  useCoachQuery: jest.fn().mockResolvedValue({ name: 'Coach', email: 'test@gmail.com' }),
}))

describe('CoachId', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<CoachId />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<CoachId />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
