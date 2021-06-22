import React from 'react'
import renderer from 'react-test-renderer'

import CoachingDashboard from '../../pages/coaching-dashboard'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))
jest.mock('../../lib/graphql/CoachingDashboard.graphql', () => ({
  useCoachingDashboardQuery: jest.fn(() => ({
    data: {
      currentCoach: {
        title: 'Tennis coach',
        description: 'Experienced tennis  coach',
        skills: [{ skill: 'tennis' }],
        picture: '',
        name: 'Reece',
        username: 'reece',
        students: [],
      },
      skills: [],
      coachingRequests: [],
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
jest.mock('../../lib/graphql/RespondToRequest.graphql', () => ({
  useRespondToRequestMutation: jest.fn(() => [jest.fn(), { data: { request: {} } }]),
}))

describe('CoachingDashboard', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<CoachingDashboard />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<CoachingDashboard />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
