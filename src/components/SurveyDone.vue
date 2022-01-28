<template>
    <div class="survey-done">
        <h1
            tabindex="0"
            class="tabindex-focus animate__animated animate__fadeInDown"
        >
            {{ t('survey_complete') }}
        </h1>
        <h4
            tabindex="0"
            class="tabindex-focus mt-2 animate__animated animate__fadeInUp"
        >
            {{ t('survey_complete_thank_you') }}
        </h4>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

export default {
    name: 'SurveyDone',
    setup() {
        const { t } = useI18n()

        onMounted(() => {
            document.querySelector('h1').focus()
        })
        return { t }
    },
}
</script>

<style scoped></style>
