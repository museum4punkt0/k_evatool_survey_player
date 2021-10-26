<template>
    <div class="flex justify-between items-center px-5 py-2 mx-5 z-50">
        <div class="left-menu">
            <a href="http://localhost:3001/#/?id=2">
                <img src="../assets/logo.svg" class="inline" />
            </a>
        </div>
        <div class="right-menu">
            <button class="ml-5 rounded-md p-2 bg-gray-200">
                <!--                <arrow-left-icon class="h-4 w-4 inline"></arrow-left-icon>-->
                <x-icon class="h-4 w-4 inline"></x-icon>
                <span class="hidden md:inline-block">Umfrage schließen</span>
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

export default {
    name: 'HeaderMenu',
    components: {
        // ArrowLeftIcon,
        XIcon,
        ShareIcon,
        MenuIcon,
        HomeIcon,
    },
}
</script>

<style scoped></style>
