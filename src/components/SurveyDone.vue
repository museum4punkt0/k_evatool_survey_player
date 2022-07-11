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

        <a
            v-if="autoCloseTimeout >= 0"
            id="autoclose"
            href="gpwebevent:window.close"
            class="invisible"
        >
            {{ t('close_survey') }}
        </a>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
    name: 'SurveyDone',
    setup() {
        const { t } = useI18n()
        const store = useStore()
        const route = useRoute()

        // handle close
        const autoCloseTimeout = ref(-1)
        if (
            route.query.autoclose &&
            !isNaN(route.query.autoclose) &&
            parseInt(route.query.autoclose) >= 0 &&
            parseInt(route.query.autoclose) < 30
        ) {
            autoCloseTimeout.value = parseInt(route.query.autoclose)
        }

        onMounted(() => {
            setTimeout(() => {
                document.querySelector('h1').focus()
            }, 1000)
            if (parseInt(window.localStorage.getItem('surveyKiosk')) > 0) {
                setTimeout(() => {
                    window.location.reload()
                }, 10000)
            }

            // send close command
            if (autoCloseTimeout.value >= 0) {
                setTimeout(() => {
                    document.getElementById('autoclose').click()
                }, autoCloseTimeout.value * 1000)
            }
        })
        return { t, store, route, autoCloseTimeout }
    },
}
</script>

<style scoped></style>
