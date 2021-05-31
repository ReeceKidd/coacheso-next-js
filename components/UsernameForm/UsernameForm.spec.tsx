import React from 'react'
import renderer from 'react-test-renderer'

import { UsernameForm, UsernameFormProps } from './UsernameForm'

describe('UsernameForm', () => {
  let mockProps: UsernameFormProps
  beforeEach(() => {
    mockProps = {
      showUsernameForm: true,
      setShowUsernameForm: jest.fn(),
      onSubmit: jest.fn(),
      setUsername: jest.fn(),
      username: 'Tennis coach',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <UsernameForm
            showUsernameForm={mockProps.showUsernameForm}
            setShowUsernameForm={mockProps.setShowUsernameForm}
            onSubmit={mockProps.onSubmit}
            setUsername={mockProps.setUsername}
            username={mockProps.username}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <UsernameForm
          showUsernameForm={mockProps.showUsernameForm}
          setShowUsernameForm={mockProps.setShowUsernameForm}
          onSubmit={mockProps.onSubmit}
          setUsername={mockProps.setUsername}
          username={mockProps.username}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
