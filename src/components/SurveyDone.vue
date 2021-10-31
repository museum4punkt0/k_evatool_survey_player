<template>
    <h1>{{ t('survey_complete') }}</h1>
    <h4>{{ t('survey_complete_thank_you') }}</h4>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
    name: 'SurveyDone',
    setup() {
        const { t } = useI18n()
        return { t }
    },
}
</script>

<style scoped></style>
