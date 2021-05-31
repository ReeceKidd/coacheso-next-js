import React from 'react'
import renderer from 'react-test-renderer'

import StudentProfile from '../../pages/student-profile'

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

describe('StudentProfile', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<StudentProfile />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<StudentProfile />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
