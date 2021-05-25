import React from 'react'
import renderer from 'react-test-renderer'

import Posts, { PostsProps } from '../../components/Posts/Posts'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

describe('Posts', () => {
  let mockProps: PostsProps
  beforeEach(() => {
    mockProps = {
      coaches: [],
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<Posts coaches={mockProps.coaches} />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<Posts coaches={mockProps.coaches} />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
