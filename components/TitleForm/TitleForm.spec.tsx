import React from 'react'
import renderer from 'react-test-renderer'

import { TitleForm, TitleFormProps } from '../../components/TitleForm/TitleForm'

describe('TitleForm', () => {
  let mockProps: TitleFormProps
  beforeEach(() => {
    mockProps = {
      onSubmit: jest.fn(),
      setShowTitleForm: jest.fn(),
      setTitle: jest.fn(),
      showTitleForm: false,
      title: 'Tennis coach',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <TitleForm
            onSubmit={mockProps.onSubmit}
            setShowTitleForm={mockProps.setShowTitleForm}
            setTitle={mockProps.setTitle}
            showTitleForm={mockProps.showTitleForm}
            title={mockProps.title}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <TitleForm
          onSubmit={mockProps.onSubmit}
          setShowTitleForm={mockProps.setShowTitleForm}
          setTitle={mockProps.setTitle}
          showTitleForm={mockProps.showTitleForm}
          title={mockProps.title}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
