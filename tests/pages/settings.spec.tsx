import React from 'react'
import renderer from 'react-test-renderer'

import Settings from '../../pages/settings'

jest.mock('../../lib/graphql/CurrentUser.graphql', () => ({
  useUserContext: jest.fn(() => ({
    user: {
      name: 'Reece Kidd',
      username: 'reece',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhoDg_ewwIbsb4vMRZ_-i2CjiiiWCxd09V1RTV1Aw=s96-c',
    },
  })),
}))
jest.mock('../../lib/graphql/UpdateCurrentUser.graphql', () => ({
  useUpdateCurrentUserMutation: jest.fn(() => [
    jest.fn(),
    { data: { currentUser: { name: 'Reece Kidd', username: 'reece' } } },
  ]),
}))

describe('Settings', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<Settings />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<Settings />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
