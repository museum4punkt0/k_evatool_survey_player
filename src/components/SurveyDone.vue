<template>
    <div class="survey-done">
        <h1 class="animate__animated animate__fadeInDown">
            {{ t('survey_complete') }}
        </h1>
        <h4 class="mt-2 animate__animated animate__fadeInUp">
            {{ t('survey_complete_thank_you') }}
        </h4>
    </div>
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
