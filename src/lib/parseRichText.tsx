// src/lib/parseRichText.tsx
import React from 'react'
import type { RichText, RichTextSegment } from '@/features/projects/model'

/**
 * JSON의 텍스트에서 **Bold**, <purple>Color</purple>, 그리고 [Link](url) 마크업을 해석하여 React 노드로 반환합니다.
 */
function renderSegment(segment: RichTextSegment, key: string | number): React.ReactNode {
  if (segment.color === 'purple') {
    return (
      <span key={key} style={{ color: '#A173BF', fontWeight: segment.bold ? 800 : 700 }}>
        {segment.text}
      </span>
    )
  }
  if (segment.color === 'gray') {
    return (
      <span key={key} style={{ color: '#787774', fontWeight: segment.bold ? 800 : 400 }}>
        {segment.text}
      </span>
    )
  }
  if (segment.color === 'muted') {
    return (
      <span key={key} style={{ color: '#868e96', fontWeight: segment.bold ? 800 : 400 }}>
        {segment.text}
      </span>
    )
  }
  if (segment.bold) {
    return (
      <strong key={key} style={{ fontWeight: 800 }}>
        {segment.text}
      </strong>
    )
  }
  return <span key={key}>{segment.text}</span>
}

export function parseRichText(text: RichText): React.ReactNode[] {
  if (!text) return []

  if (Array.isArray(text)) {
    return text.map((segment, idx) => renderSegment(segment, idx))
  }

  const parts = text.split(/(\*\*.*?\*\*|<purple>.*?<\/purple>|<gray>.*?<\/gray>|\[.*?\]\(.*?\))/g)

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('<purple>') && part.endsWith('</purple>')) {
      return (
        <span key={i} style={{ color: '#A173BF', fontWeight: 700 }}>
          {part.slice(8, -9)}
        </span>
      )
    }
    if (part.startsWith('<gray>') && part.endsWith('</gray>')) {
      return (
        <span key={i} style={{ color: '#787774' }}>
          {part.slice(6, -7)}
        </span>
      )
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/)
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A173BF] underline decoration-[rgba(161,115,191,0.4)] underline-offset-4 hover:text-[#8a5bab]"
          >
            {match[1]}
          </a>
        )
      }
    }
    return part
  })
}
