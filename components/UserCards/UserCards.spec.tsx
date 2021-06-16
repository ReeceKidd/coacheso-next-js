import React from 'react'
import renderer from 'react-test-renderer'

import UserCards, { UserCardsProps } from './UserCards'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

describe('UserCards', () => {
  let mockProps: UserCardsProps
  beforeEach(() => {
    mockProps = {
      coaches: [],
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<UserCards coaches={mockProps.coaches} />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<UserCards coaches={mockProps.coaches} />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
