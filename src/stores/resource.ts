import text from "../resource/text.js"
import { defineStore } from 'pinia'
import type { RouteRecordName } from "vue-router"

/* 
    import this from some dynamic store
    which reacts to user changes of lang
*/
const language = "cs";


export const useResourceStore = defineStore('resource', () => {
    
  function getPageLabel(id: string | RouteRecordName | undefined | null ) {
      return text[language].pages[id]
  }

  function getAccountLabel(id: string) {
    return text[language].account[id]
  }

  return {
    getPageLabel,
    getAccountLabel
  }
})
