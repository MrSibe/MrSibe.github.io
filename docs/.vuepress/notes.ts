import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const CS_61B = defineNoteConfig({
  dir: 'CS_61B',
  link: '/CS_61B',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [CS_61B],
})
