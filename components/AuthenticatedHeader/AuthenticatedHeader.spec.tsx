import React from 'react'
import renderer from 'react-test-renderer'

import AuthenticatedHeader, {
  AuthenticatedHeaderProps,
} from '../../components/AuthenticatedHeader/AuthenticatedHeader'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { activity: 'tennis' } })),
}))
jest.mock('../../lib/graphql/CurrentUser.graphql', () => ({
  UserMode: {
    coach: 'coach',
    student: 'student',
  },
  useCurrentUserQuery: jest.fn(() => ({
    data: {
      currentUser: {
        name: 'Reece Kidd',
        username: 'reece',
        mode: 'coach',
        picture:
          'https://lh3.googleusercontent.com/a-/AOh14GhoDg_ewwIbsb4vMRZ_-i2CjiiiWCxd09V1RTV1Aw=s96-c',
      },
    },
    loading: false,
  })),
}))
jest.mock('../../lib/graphql/UpdateCurrentUser.graphql', () => ({
  useUpdateCurrentUserMutation: jest.fn(() => [
    jest.fn(),
    { data: { currentUser: { name: 'Reece Kidd', username: 'reece', mode: 'student' } } },
  ]),
}))

describe('AuthenticatedHeader', () => {
  let mockProps: AuthenticatedHeaderProps
  beforeEach(() => {
    mockProps = {
      darkState: false,
      handleThemeChange: jest.fn(),
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <AuthenticatedHeader
            darkState={mockProps.darkState}
            handleThemeChange={mockProps.handleThemeChange}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <AuthenticatedHeader
          darkState={mockProps.darkState}
          handleThemeChange={mockProps.handleThemeChange}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})