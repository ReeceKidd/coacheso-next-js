import React from 'react'
import renderer from 'react-test-renderer'

import { NameForm, NameFormProps } from './NameForm'

describe('NameForm', () => {
  let mockProps: NameFormProps
  beforeEach(() => {
    mockProps = {
      showNameForm: true,
      setShowNameForm: jest.fn(),
      onSubmit: jest.fn(),
      setName: jest.fn(),
      name: 'Tennis coach',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <NameForm
            showNameForm={mockProps.showNameForm}
            setShowNameForm={mockProps.setShowNameForm}
            onSubmit={mockProps.onSubmit}
            setName={mockProps.setName}
            name={mockProps.name}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <NameForm
          showNameForm={mockProps.showNameForm}
          setShowNameForm={mockProps.setShowNameForm}
          onSubmit={mockProps.onSubmit}
          setName={mockProps.setName}
          name={mockProps.name}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
