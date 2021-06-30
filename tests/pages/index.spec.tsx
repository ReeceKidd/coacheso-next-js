import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../pages/index'

jest.mock('../../lib/graphql/CurrentUser.graphql', () => ({
  useUserContext: jest.fn(() => ({
    user: {
      name: 'Reece Kidd',
      mode: 'student',
      username: 'reece',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhoDg_ewwIbsb4vMRZ_-i2CjiiiWCxd09V1RTV1Aw=s96-c',
    },

    loading: false,
  })),
  UserMode: {
    Student: 'student',
  },
}))
jest.mock('../../pages/student-dashboard', () => () => 'StudentDashboard')
jest.mock('../../pages/coaching-dashboard', () => () => 'CoachingDashboard')
jest.mock('../../pages/landing', () => () => 'Landing')

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
