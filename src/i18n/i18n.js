import { createI18n } from 'vue-i18n'
import messages from './localizations'

export default createI18n({
    messages,
    locale: 'de',
    fallbackLocale: 'de',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
    fallbackWarn: false,
})
