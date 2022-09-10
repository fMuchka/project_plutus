
import type { ThemeDefinition } from "vuetify"

const DARK_THEME: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#222831',
    surface: '#393E46',
    primary: '#B55400',
    secondary: '#EEEEEE',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const LIGHT_THEME: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#EFFFFB',
    surface: '#50D890',
    primary: '#4F98CA',
    secondary: '#272727',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}


export const themes = {
  DARK_THEME,
  LIGHT_THEME,
}