import { createContentLoader } from 'vitepress'

export default createContentLoader(['**/*.md', '!index.md'], {
  includeSrc: true,
  transform(rawData) {
    const wordMap = {}
    const tagCountMap = {}
    const categorySet = new Set()
    let reviewCount = 0

    rawData.forEach(page => {
      // 1. 采集与去重全站所有标签 tags 并统计对应文章频次
      if (page.frontmatter.tags) {
        let tagArr = []
        if (Array.isArray(page.frontmatter.tags)) {
          tagArr = page.frontmatter.tags
        } else if (typeof page.frontmatter.tags === 'string') {
          tagArr = page.frontmatter.tags.split(',').map(t => t.trim())
        }
        tagArr.forEach(t => {
          if (t) {
            tagCountMap[t] = (tagCountMap[t] || 0) + 1
          }
        })
      }

      // 2. 采集全站分类 category
      if (page.frontmatter.category) {
        categorySet.add(page.frontmatter.category)
      }

      // 3. 统计单篇测评文章数量 (/reviews/)
      if (page.url.startsWith('/reviews/') && page.url !== '/reviews/' && page.url !== '/reviews/index.html') {
        reviewCount++
      }

      // 4. 字数与阅读时间
      if (!page.src) return
      const srcWithoutFrontmatter = page.src.replace(/^---[\s\S]*?---/, '')
      const cleanSrc = srcWithoutFrontmatter.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')
      
      const chineseChars = (cleanSrc.match(/[\u4e00-\u9fa5]/g) || []).length
      const englishWords = (cleanSrc.match(/[a-zA-Z0-9]+/g) || []).length
      const totalWords = chineseChars + englishWords
      const readTime = Math.max(1, Math.ceil(totalWords / 380))

      let key = page.url.replace(/\.html$/, '')
      if (key.endsWith('/')) key = key.slice(0, -1)
      if (!key) key = '/'

      wordMap[key] = {
        wordCount: totalWords,
        readTime
      }
    })

    const allTagList = Object.keys(tagCountMap).map(tagName => ({
      name: tagName,
      count: tagCountMap[tagName]
    }))

    return {
      wordMap,
      totalTags: allTagList.length,
      allTags: allTagList,
      totalCategories: categorySet.size || 4,
      totalReviews: reviewCount || 20
    }
  }
})
