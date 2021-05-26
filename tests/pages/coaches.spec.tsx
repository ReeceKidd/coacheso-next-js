import React from 'react'
import renderer from 'react-test-renderer'

import Coaches from '../../pages/coaches'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { activity: 'tennis' } })),
}))
jest.mock('../../lib/graphql/Coaches.graphql', () => ({
  useCoachesQuery: jest.fn(() => ({
    data: { name: 'Coach', email: 'test@gmail.com' },
    loading: false,
  })),
}))

describe('Coaches', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<Coaches />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<Coaches />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
