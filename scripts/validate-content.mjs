import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'src', 'content')
const projectsDir = path.join(contentDir, 'projects')
const publicDir = path.join(rootDir, 'public')

const errors = []

function fail(message) {
  errors.push(message)
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    fail(`[JSON 파싱 실패] ${path.relative(rootDir, filePath)}: ${error.message}`)
    return null
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isArrayOfNonEmptyString(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString)
}

function isNonEmptyRichText(value) {
  if (isNonEmptyString(value)) return true

  if (!Array.isArray(value) || value.length === 0) {
    return false
  }

  return value.some((segment) => isNonEmptyString(segment?.text))
}

function isArrayOfNonEmptyRichText(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyRichText)
}

function isValidPeriodToken(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}(-\d{2})?$/.test(value)
}

function validateAssetPath(assetPath, sourcePath) {
  if (!isNonEmptyString(assetPath)) {
    fail(`[에셋 경로 누락] ${sourcePath}`)
    return
  }

  if (!assetPath.startsWith('/assets/')) {
    fail(`[에셋 경로 규칙 위반] ${sourcePath}: ${assetPath}`)
    return
  }

  const localAssetPath = path.join(publicDir, assetPath.replace(/^\//, ''))

  if (!fs.existsSync(localAssetPath)) {
    fail(`[에셋 파일 없음] ${sourcePath}: ${assetPath}`)
  }
}

function validateSiteContent() {
  const filePath = path.join(contentDir, 'site.json')
  const data = readJson(filePath)

  if (!data) {
    return
  }

  if (!isNonEmptyString(data.siteTitle)) {
    fail('[site.json] siteTitle은 필수 문자열입니다.')
  }

  if (!isNonEmptyString(data.siteDescription)) {
    fail('[site.json] siteDescription은 필수 문자열입니다.')
  }

  if (!Array.isArray(data.nav?.items) || data.nav.items.length === 0) {
    fail('[site.json] nav.items는 1개 이상이어야 합니다.')
    return
  }

  for (const item of data.nav.items) {
    if (!isNonEmptyString(item.label) || !isNonEmptyString(item.sectionId)) {
      fail('[site.json] nav.items 항목은 label/sectionId가 필요합니다.')
    }
  }
}

function validateProfileContent() {
  const filePath = path.join(contentDir, 'profile.json')
  const data = readJson(filePath)

  if (!data) {
    return
  }

  if (!isNonEmptyString(data.about?.title)) {
    fail('[profile.json] about.title은 필수 문자열입니다.')
  }

  if (!isArrayOfNonEmptyString(data.about?.body)) {
    fail('[profile.json] about.body는 1개 이상 문자열 배열이어야 합니다.')
  }

  if (isNonEmptyString(data.profileImageSrc)) {
    validateAssetPath(data.profileImageSrc, 'profile.json profileImageSrc')
  }
}

function validateSkillsContent() {
  const filePath = path.join(contentDir, 'skills.json')
  const data = readJson(filePath)

  if (!data) {
    return
  }

  if (!Array.isArray(data.rows) || data.rows.length === 0) {
    fail('[skills.json] rows는 1개 이상이어야 합니다.')
    return
  }

  for (const row of data.rows) {
    if (!isNonEmptyString(row.category)) {
      fail('[skills.json] row.category는 필수 문자열입니다.')
    }

    if (!isArrayOfNonEmptyString(row.skills)) {
      fail('[skills.json] row.skills는 1개 이상 문자열 배열이어야 합니다.')
    }
  }
}

function validateExperienceContent() {
  const filePath = path.join(contentDir, 'experience.json')
  const data = readJson(filePath)

  if (!data) {
    return
  }

  if (!isNonEmptyString(data.title)) {
    fail('[experience.json] title은 필수 문자열입니다.')
  }

  if (!Array.isArray(data.companies)) {
    return
  }

  for (const company of data.companies) {
    if (!isNonEmptyString(company.companyName)) {
      fail('[experience.json] companyName은 필수 문자열입니다.')
    }

    if (company.period) {
      if (!isValidPeriodToken(company.period.start)) {
        fail(
          '[experience.json] companies.period.start는 YYYY-MM 또는 YYYY-MM-DD 형식이어야 합니다.',
        )
      }

      if (
        company.period.end !== undefined &&
        company.period.end !== null &&
        !isValidPeriodToken(company.period.end)
      ) {
        fail('[experience.json] companies.period.end는 YYYY-MM 또는 YYYY-MM-DD 형식이어야 합니다.')
      }
    }

    if (isNonEmptyString(company.heroImageSrc)) {
      validateAssetPath(company.heroImageSrc, 'experience.json companies.heroImageSrc')
    }
  }
}

function validateEducationContent() {
  const filePath = path.join(contentDir, 'education.json')
  const data = readJson(filePath)

  if (!data) {
    return
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    fail('[education.json] items는 1개 이상이어야 합니다.')
    return
  }

  for (const item of data.items) {
    if (!isNonEmptyString(item.name ?? item.title)) {
      fail('[education.json] item.name 또는 item.title은 필수 문자열입니다.')
    }

    if (isNonEmptyString(item.iconSrc)) {
      validateAssetPath(item.iconSrc, 'education.json items.iconSrc')
    }
  }
}

function validateOthersContent() {
  const filePath = path.join(contentDir, 'others.json')
  const data = readJson(filePath)

  if (!data) {
    return
  }

  if (!Array.isArray(data.rows) || data.rows.length === 0) {
    fail('[others.json] rows는 1개 이상이어야 합니다.')
    return
  }

  for (const row of data.rows) {
    if (!isNonEmptyString(row.periodText)) {
      fail('[others.json] row.periodText는 필수 문자열입니다.')
    }

    if (!isNonEmptyString(row.activity ?? row.description)) {
      fail('[others.json] row.activity 또는 row.description은 필수 문자열입니다.')
    }
  }
}

function validateProjects() {
  if (!fs.existsSync(projectsDir)) {
    fail('[projects] src/content/projects 폴더가 없습니다.')
    return
  }

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith('.json'))

  if (files.length < 2) {
    fail('[projects] 프로젝트 JSON은 최소 2개 이상이어야 합니다.')
    return
  }

  const slugSet = new Set()

  for (const fileName of files) {
    const filePath = path.join(projectsDir, fileName)
    const data = readJson(filePath)

    if (!data) {
      continue
    }

    const sourcePath = `projects/${fileName}`
    const expectedSlug = fileName.replace(/\.json$/, '')

    if (!isNonEmptyString(data.slug)) {
      fail(`[${sourcePath}] slug는 필수 문자열입니다.`)
    } else {
      if (data.slug !== expectedSlug) {
        fail(`[${sourcePath}] slug(${data.slug})와 파일명(${expectedSlug})이 일치해야 합니다.`)
      }

      if (slugSet.has(data.slug)) {
        fail(`[${sourcePath}] slug(${data.slug})가 중복됩니다.`)
      }
      slugSet.add(data.slug)
    }

    if (!isNonEmptyString(data.title)) {
      fail(`[${sourcePath}] title은 필수 문자열입니다.`)
    }

    if (!isNonEmptyString(data.summary)) {
      fail(`[${sourcePath}] summary는 필수 문자열입니다.`)
    }

    if (!data.period || typeof data.period !== 'object') {
      fail(`[${sourcePath}] period 객체는 필수입니다.`)
    } else {
      if (!isValidPeriodToken(data.period.start)) {
        fail(`[${sourcePath}] period.start는 YYYY-MM 또는 YYYY-MM-DD 형식이어야 합니다.`)
      }

      if (
        data.period.end !== undefined &&
        data.period.end !== null &&
        !isValidPeriodToken(data.period.end)
      ) {
        fail(`[${sourcePath}] period.end는 YYYY-MM 또는 YYYY-MM-DD 형식이어야 합니다.`)
      }
    }

    if (!isArrayOfNonEmptyString(data.tags)) {
      fail(`[${sourcePath}] tags는 1개 이상 문자열 배열이어야 합니다.`)
    }

    if (!isArrayOfNonEmptyString(data.stack)) {
      fail(`[${sourcePath}] stack은 1개 이상 문자열 배열이어야 합니다.`)
    }

    if (!isArrayOfNonEmptyString(data.roles)) {
      fail(`[${sourcePath}] roles는 1개 이상 문자열 배열이어야 합니다.`)
    }

    validateAssetPath(data.coverImageSrc, `${sourcePath} coverImageSrc`)

    if (Array.isArray(data.visuals)) {
      for (const visual of data.visuals) {
        validateAssetPath(visual?.src, `${sourcePath} visuals.src`)
        if (!isNonEmptyString(visual?.alt)) {
          fail(`[${sourcePath}] visuals.alt는 필수 문자열입니다.`)
        }
      }
    }

    if (Array.isArray(data.sections)) {
      for (const section of data.sections) {
        if (!isNonEmptyString(section?.type)) {
          fail(`[${sourcePath}] sections.type은 필수 문자열입니다.`)
        }

        const hasBody = isArrayOfNonEmptyRichText(section?.body)
        const hasBullets = isArrayOfNonEmptyRichText(section?.bullets)
        const hasTable =
          section?.table && Array.isArray(section.table.rows) && section.table.rows.length > 0
        const hasVisuals = Array.isArray(section?.visuals) && section.visuals.length > 0
        const isSeparator = section?.type === 'separator'
        const hasTitle = isNonEmptyRichText(section?.title)

        if (!hasBody && !hasBullets && !hasTable && !hasVisuals && !hasTitle && !isSeparator) {
          fail(
            `[${sourcePath}] sections는 title, body, bullets, table, visuals 중 하나 이상의 유효한 콘텐츠를 포함해야 합니다 (separator 제외).`,
          )
        }
      }
    }
  }
}

function validateAll() {
  const requiredFiles = [
    'site.json',
    'profile.json',
    'experience.json',
    'skills.json',
    'education.json',
    'others.json',
  ]

  for (const fileName of requiredFiles) {
    const targetPath = path.join(contentDir, fileName)
    if (!fs.existsSync(targetPath)) {
      fail(`[필수 파일 없음] src/content/${fileName}`)
    }
  }

  validateSiteContent()
  validateProfileContent()
  validateExperienceContent()
  validateSkillsContent()
  validateEducationContent()
  validateOthersContent()
  validateProjects()

  if (errors.length > 0) {
    console.error('content validation failed:')
    for (const message of errors) {
      console.error(`- ${message}`)
    }
    process.exit(1)
  }

  console.log('content validation passed')
}

validateAll()
