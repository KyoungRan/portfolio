export function assetPath(src?: string | null): string | undefined {
  if (!src) return undefined

  const trimmed = src.trim()
  if (!trimmed) return undefined

  if (/^(https?:)?\/\//.test(trimmed) || trimmed.startsWith('data:')) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    const base = import.meta.env.BASE_URL ?? '/'
    return `${base}${trimmed.replace(/^\/+/, '')}`
  }

  return trimmed
}
