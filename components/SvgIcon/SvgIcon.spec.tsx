import React from 'react'
import renderer from 'react-test-renderer'

import SvgIcon, { SvgIconProps } from '../../components/SvgIcon/SvgIcon'

describe('SvgIcon', () => {
  let mockProps: SvgIconProps
  beforeEach(() => {
    mockProps = {
      height: '100%',
      width: '100%',
      src: 'product-launch.svg',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <SvgIcon height={mockProps.height} width={mockProps.width} src={mockProps.src} />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <SvgIcon height={mockProps.height} width={mockProps.width} src={mockProps.src} />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
