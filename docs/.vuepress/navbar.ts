import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  {
    text: '笔记',
    items: [
      { text: 'CS 61B', link: 'notes/CS_61B/CS_61B_0.md' },
      { text: 'CS 168', link: 'notes/CS_168/CS_168_1.md' },
    ]
  },
  {
    text: '友情链接🔗',
    link: '/friends.md',
  }
])
