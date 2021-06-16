import React from 'react'
import renderer from 'react-test-renderer'

import StudentDashboard from '../../pages/student-dashboard'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))
jest.mock('../../lib/graphql/StudentDashboard.graphql', () => ({
  useStudentDashboardQuery: jest.fn(() => ({
    data: {
      currentUser: {
        name: 'Reece Kidd',
        username: 'reece',
        picture:
          'https://lh3.googleusercontent.com/a-/AOh14GhoDg_ewwIbsb4vMRZ_-i2CjiiiWCxd09V1RTV1Aw=s96-c',
      },
      skills: [],
    },
    loading: false,
  })),
}))

describe('StudentDashboard', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<StudentDashboard />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<StudentDashboard />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
