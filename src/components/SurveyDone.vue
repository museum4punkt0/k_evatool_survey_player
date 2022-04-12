<template>
    <div class="survey-done">
        <h1
            tabindex="0"
            class="tabindex-focus"
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeInDown'
            "
        >
            {{ t('survey_complete') }}
        </h1>
        <h4
            tabindex="0"
            class="tabindex-focus mt-2"
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeInUp'
            "
        >
            {{ t('survey_complete_thank_you') }}
        </h4>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'SurveyDone',
    setup() {
        const { t } = useI18n()
        const store = useStore()

        onMounted(() => {
            setTimeout(() => {
                document.querySelector('h1').focus()
            }, 1000)
            if (parseInt(window.localStorage.getItem('surveyKiosk')) > 0) {
                setTimeout(() => {
                    window.location.reload()
                }, 10000)
            }
        })
        return { t, store }
    },
}
</script>

<style scoped></style>
