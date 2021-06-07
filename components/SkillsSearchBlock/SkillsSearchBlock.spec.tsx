import React from 'react'
import renderer from 'react-test-renderer'

import SkillsSearchBlock, {
  SkillsSearchBlockProps,
} from '../../components/SkillsSearchBlock/SkillsSearchBlock'

jest.mock('../../lib/graphql/Skills.graphql', () => ({
  useSkillsQuery: jest.fn().mockResolvedValue({ data: { skills: [{ skill: 'tennis' }] } }),
}))
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { activity: 'tennis' } })),
}))

describe('SkillsSearchBlock', () => {
  let mockProps: SkillsSearchBlockProps
  beforeEach(() => {
    mockProps = {
      title: 'Find a coach',
      content: 'Coaches available anywhere',
      icon: 'product-launch.svg',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <SkillsSearchBlock
            title={mockProps.title}
            content={mockProps.content}
            icon={mockProps.icon}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <SkillsSearchBlock
          title={mockProps.title}
          content={mockProps.content}
          icon={mockProps.icon}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
