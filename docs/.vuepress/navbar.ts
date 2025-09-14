import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  {
    text: '笔记',
    items: [
      { text: 'CS 61B', link: 'notes/CS-61B/README.md' },
      { text: 'CS 168', link: 'notes/CS-168/01-intro.md' },
      { text: 'Leetcode Hot 100', link: 'notes/hot100/001-twosum.md' },
    ]
  },
  {
    text: '友情链接🔗',
    link: '/friends.md',
  }
])
