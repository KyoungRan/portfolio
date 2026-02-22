// src/lib/parseRichText.tsx
import React from 'react'

/**
 * JSON의 텍스트에서 **Bold**, <purple>Color</purple>, 그리고 [Link](url) 마크업을 해석하여 React 노드로 반환합니다.
 */
export function parseRichText(text: string): React.ReactNode[] {
  if (!text) return []
  
  const parts = text.split(/(\*\*.*?\*\*|<purple>.*?<\/purple>|<gray>.*?<\/gray>|\[.*?\]\(.*?\))/g)
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 800 }}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('<purple>') && part.endsWith('</purple>')) {
      return <span key={i} style={{ color: '#A173BF', fontWeight: 700 }}>{part.slice(8, -9)}</span>
    }
    if (part.startsWith('<gray>') && part.endsWith('</gray>')) {
      return <span key={i} style={{ color: '#787774' }}>{part.slice(6, -7)}</span>
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
