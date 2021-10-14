<template>
    <div class="flex justify-between items-center px-5 py-2 mx-5">
        <div class="left-menu">
            <img src="../assets/logo.svg" class="inline" />
        </div>
        <div class="right-menu">
            <button class="ml-5 rounded-md p-2 bg-gray-200">
                <!--                <arrow-left-icon class="h-4 w-4 inline"></arrow-left-icon>-->
                <x-icon class="h-4 w-4 inline"></x-icon>
                Umfrage schießen
            </button>
            <menu-icon class="h-6 w-6 mx-4 inline"></menu-icon>
            <share-icon class="h-6 w-6 mx-4 inline"></share-icon>
            <home-icon class="h-6 w-6 mx-2 inline"></home-icon>
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
