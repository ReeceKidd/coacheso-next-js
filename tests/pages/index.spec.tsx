import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../pages/index'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn(() => ({ name: 'Reece' })),
}))
jest.mock('../../pages/student-dashboard', () => () => 'StudentDashboard')
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
