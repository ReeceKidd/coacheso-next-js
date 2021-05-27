import React from 'react'
import renderer from 'react-test-renderer'

import CoachingProfile from '../../pages/coaching-profile'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockResolvedValue({ username: 'user' }),
}))
jest.mock('../../lib/graphql/UpdateCoach.graphql', () => ({
  useUpdateCoachMutation: jest.fn(() => [
    jest.fn(),
    { data: { currentCoach: { title: 'Tennis coach ' } } },
  ]),
}))
jest.mock('../../lib/graphql/CurrentCoach.graphql', () => ({
  useCurrentCoachQuery: jest.fn(() => ({
    data: { name: 'Coach', email: 'test@gmail.com' },
    loading: false,
  })),
}))

describe('CoachingProfile', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<CoachingProfile />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<CoachingProfile />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
