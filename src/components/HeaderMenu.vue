<template>
    <div
        class="
            survey-header-menu
            fixed
            w-full
            bg-white
            flex
            justify-between
            items-center
            px-5
            py-2
            z-50
        "
    >
        <div class="left-menu">
            <img src="../assets/logo.svg" class="inline" />
        </div>
        <div class="right-menu">
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
                <div v-for="lang in languages" class="inline">
                    <p
                        class="inline uppercase mx-2"
                        :class="{ active: currentLang === lang }"
                        @click="setLanguage(lang)"
                    >
                        {{ lang }}
                    </p>
                </div>
            </div>
            <menu-icon class="h-6 w-6 ml-4 md:mr-2 inline"></menu-icon>
            <share-icon class="h-6 w-6 mx-4 hidden md:inline"></share-icon>
            <home-icon class="h-6 w-6 mx-2 hidden md:inline"></home-icon>
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
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

export default {
    name: 'HeaderMenu',
    components: {
        // ArrowLeftIcon,
        XIcon,
        ShareIcon,
        MenuIcon,
        HomeIcon,
    },
    props: {
        languages: {
            type: Array,
            default: null,
        },
    },
    setup() {
        const backlink = ref()
        const currentLang = ref()
        const store = useStore()
        const { t } = useI18n()
        const i18n = useI18n()
        backlink.value = localStorage.getItem('ev-tool-backlink')
        const openPage = () => {
            window.location.href = backlink.value
        }
        const setLanguage = async (lang) => {
            await store.dispatch('setUserLanguage', lang)
            i18n.locale.value = lang
            currentLang.value = lang
        }
        onMounted(async () => {
            currentLang.value = await store.state.lang
            i18n.locale.value = currentLang.value
        })

        return {
            i18n,
            backlink,
            openPage,
            setLanguage,
            store,
            t,
            currentLang,
        }
    },
}
</script>

<style scoped>
p.active {
    font-weight: bold;
    text-decoration: underline;
}
</style>
