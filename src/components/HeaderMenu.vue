<template>
    <div
        v-if="route.query.noframe !== 'true'"
        class="survey-header-menu fixed w-full bg-white flex justify-between items-center px-5 py-2 z-50"
    >
        <div class="left-menu flex-1 h-16 flex items-center">
            <img
                v-if="surveySetting.logoImageUrl"
                alt="logo"
                :src="surveySetting.logoImageUrl"
                class="object-contain h-[60px] inline tabindex-focus-nopadding"
                tabindex="0"
            />

            <p v-else class="font-semibold text-lg py-2">
                {{ surveySetting.companyName[currentLang] }}
            </p>
        </div>
        <div class="right-menu flex justify-center items-center">
            <button
                v-if="backlink"
                class="ml-5 rounded-md p-2 pr-3 bg-gray-200"
                @click="openPage"
            >
                <!--                <arrow-left-icon class="h-4 w-4 inline"></arrow-left-icon>-->
                <x-icon class="h-4 w-4 inline mr-1 mb-0.5"></x-icon>
                <span class="hidden md:inline-block">
                    {{ t('close_survey') }}
                </span>
            </button>
            <div
                v-if="languages && languages.length > 1"
                class="inline-block h-6"
            >
                <div v-for="(lang, l) in languages" :key="l" class="inline">
                    <button
                        tabindex="0"
                        class="tabindex-focus-nopadding rounded inline uppercase mx-2"
                        :class="{ active: currentLang === lang }"
                        :aria-pressed="currentLang === lang"
                        :aria-label="
                            t('language') + ' ' + t('language_' + lang)
                        "
                        @click="setLanguage(lang)"
                    >
                        {{ lang }}
                    </button>
                </div>
            </div>

            <button
                class="ml-4 md:mr-2 inline rounded tabindex-focus-nopadding"
                aria-label="Menu"
                aria-pressed="false"
            >
                <menu-icon tabindex="0" class="h-6 w-6"></menu-icon>
            </button>
            <button
                class="ml-4 md:mr-2 inline rounded tabindex-focus-nopadding"
                aria-label="Share"
                aria-pressed="false"
            >
                <share-icon tabindex="0" class="h-6 w-6"></share-icon>
            </button>
            <button
                class="ml-4 md:mr-2 hidden md:inline rounded tabindex-focus-nopadding"
                aria-label="Home"
                aria-pressed="false"
            >
                <home-icon tabindex="0" class="h-6 w-6 mx-2"></home-icon>
            </button>
        </div>
    </div>
</template>

<script>
import {
    // ArrowLeftIcon,
    XIcon,
    ShareIcon,
    MenuIcon,
} from '@heroicons/vue/outline'
import { HomeIcon } from '@heroicons/vue/solid'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
    name: 'HeaderMenu',
    components: {
        // ArrowLeftIcon,
        XIcon,
        ShareIcon,
        MenuIcon,
        HomeIcon,
    },

    setup() {
        const backlink = ref()
        const store = useStore()
        const { t } = useI18n()
        const i18n = useI18n()
        const route = useRoute()

        const languages = computed(() => store.getters.languages)
        const languageNames = computed(() => store.getters.languageNames)
        const currentLang = computed(() => store.state.lang)
        const surveySetting = computed(
            () => store.getters['surveyResults/surveySetting'],
        )

        backlink.value = localStorage.getItem('surveyBacklink')

        const openPage = () => (window.location.href = backlink.value)

        const setLanguage = (lang) => store.commit('setLang', lang)

        return {
            i18n,
            backlink,
            openPage,
            setLanguage,
            store,
            t,
            route,
            currentLang,
            surveySetting,
            languages,
            languageNames,
        }
    },
}
</script>

<style scoped>
button.active {
    font-weight: bold;
    text-decoration: underline;
}
</style>
