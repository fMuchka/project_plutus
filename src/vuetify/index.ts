import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import { themes } from "../themes/index"

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles' // Global CSS has to be imported
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "DARK_THEME",
        themes: themes
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
})