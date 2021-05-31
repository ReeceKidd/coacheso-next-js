import React from 'react'
import renderer from 'react-test-renderer'

import CoachingProfile from '../../pages/coaching-profile'

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
jest.mock('../../lib/graphql/UpdateCoach.graphql', () => ({
  useUpdateCoachMutation: jest.fn(() => [
    jest.fn(),
    { data: { currentCoach: { title: 'Tennis coach ' } } },
  ]),
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
jest.mock('../../lib/graphql/Skills.graphql', () => ({
  useSkillsQuery: jest.fn().mockResolvedValue({ data: { skills: [{ skill: 'tennis' }] } }),
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
