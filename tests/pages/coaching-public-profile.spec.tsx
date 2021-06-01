import React from 'react'
import renderer from 'react-test-renderer'

import CoachingProfilePublic from '../../pages/coaching-profile-public'

jest.mock('../../lib/graphql/CurrentUser.graphql', () => ({
  useCurrentUserQuery: jest.fn(() => ({
    data: {
      currentUser: {
        name: 'Reece Kidd',
        username: 'reece',
        picture:
          'https://lh3.googleusercontent.com/a-/AOh14GhoDg_ewwIbsb4vMRZ_-i2CjiiiWCxd09V1RTV1Aw=s96-c',
      },
    },
    loading: false,
  })),
}))
jest.mock('../../lib/graphql/CurrentCoach.graphql', () => ({
  useCurrentCoachQuery: jest.fn(() => ({
    data: {
      currentCoach: {
        title: 'Tennis coach',
        description: 'Experienced tennis  coach',
        skills: [{ skill: 'tennis' }],
      },
    },
    loading: false,
  })),
}))

describe('CoachingProfilePublic', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<CoachingProfilePublic />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<CoachingProfilePublic />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
