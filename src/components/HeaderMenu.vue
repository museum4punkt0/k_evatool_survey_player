<template>
    <div class="flex justify-between items-center px-5 py-2 mx-5 z-50">
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
        const { t } = useI18n()
        backlink.value = localStorage.getItem('ev-tool-backlink')
        const openPage = () => {
            window.location.href = backlink.value
        }
        return {
            backlink,
            openPage,
            t,
        }
    },
}
</script>

<style scoped></style>
