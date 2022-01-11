<template>
    <div
        class="
            survey-footer-menu
            bg-white
            bottom-0
            fixed
            w-full
            md:w-screen
            z-100
        "
    >
        <div
            class="
                survey-navigation-inner
                flex
                items-center
                h-auto
                min-h-10
                py-2
            "
        >
            <div class="ml-3 text-xs text-gray-500 flex items-center relative">
                Version
                <strong>{{ version }}</strong>

                <button
                    v-if="demoMode"
                    class="
                        rounded
                        bg-green-400
                        text-white
                        px-3
                        md:whitespace-nowrap
                        py-2
                        ml-3
                    "
                    @click="resetUuid"
                >
                    {{ t('new_uuid') }}
                </button>
            </div>
            <div class="flex bg-white items-center justify-center w-full">
                <div class="flex justify-center items-center w-full">
                    <!--                    <button-->
                    <!--                        class="prev flex items-center rounded-md nav-button p-2"-->
                    <!--                        @click="prevStep()"-->
                    <!--                    >-->
                    <!--                        <chevron-double-left-icon-->
                    <!--                            class="h-5 w-5 mr-1"-->
                    <!--                        ></chevron-double-left-icon>-->

                    <!--                        {{ t('action_prev') }}-->
                    <!--                    </button>-->
                    <!--                    <span class="mx-4 p-0">-->
                    <!--                        &lt;!&ndash;                        {{ store.state.currentStep + 1 }}/{{ surveySteps }}&ndash;&gt;-->
                    <!--                    </span>-->
                    <!--                    <button-->
                    <!--                        class="next flex items-center rounded-md nav-button p-2"-->
                    <!--                        @click="nextStep()"-->
                    <!--                    >-->
                    <!--                        {{ t('action_next') }}-->
                    <!--                        <chevron-double-right-icon-->
                    <!--                            class="h-5 w-5 ml-2"-->
                    <!--                        ></chevron-double-right-icon>-->
                    <!--                    </button>-->
                </div>
                <div
                    class="
                        flex
                        relative
                        justify-center
                        xl:absolute xl:right-6
                        bg-white
                        md:bg-transparent
                    "
                >
                    <button
                        class="
                            imprint
                            flex
                            items-center
                            rounded-md
                            nav-button
                            p-2
                            ml-2
                        "
                        @click="openModal('privacy')"
                    >
                        <finger-print-icon
                            class="h-5 w-5 mr-2 invisible md:visible"
                        ></finger-print-icon>
                        {{ t('privacy') }}
                    </button>
                    <button
                        class="
                            imprint
                            flex
                            items-center
                            rounded-md
                            nav-button
                            p-2
                            ml-6
                        "
                        @click="openModal('imprint')"
                    >
                        <book-open-icon
                            class="h-5 w-5 mr-2 invisible md:visible"
                        ></book-open-icon>
                        {{ t('imprint') }}
                    </button>
                </div>
            </div>
        </div>
        <ImprintPrivacyModal
            :open="modalboxOpen"
            :type="modalboxType"
            @close-modal="closeModal"
        ></ImprintPrivacyModal>
    </div>
</template>

<script>
import { BookOpenIcon, FingerPrintIcon } from '@heroicons/vue/solid'
import { useRoute } from 'vue-router'

import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/outline'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { version } from '../../package.json'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import ImprintPrivacyModal from './ImprintPrivacyModal.vue'

export default {
    name: 'Navigation',
    components: {
        BookOpenIcon,
        FingerPrintIcon,
        ChevronDoubleLeftIcon,
        ChevronDoubleRightIcon,
        ImprintPrivacyModal,
    },
    props: {
        currentStep: {
            type: Number,
            default: 1,
        },
        surveySteps: {
            type: Number,
            default: 1,
        },
    },
    emits: ['next-step', 'prev-step'],
    setup(props, { emit }) {
        const store = useStore()
        const route = useRoute()
        const modalboxOpen = ref()
        const modalboxType = ref()
        const demoMode = ref(false)
        const { t } = useI18n()
        const nextStep = () => {
            if (props.currentStep < props.surveySteps) {
                console.log('nextStep')
                emit('next-step')
            }
        }
        const prevStep = () => {
            if (props.currentStep > 1) {
                console.log('prevStep')
                emit('prev-step')
            }
            store.dispatch('decCurrentStep')
        }

        const resetUuid = () => {
            window.localStorage.setItem('surveyUuid', '')
            window.location.reload()
        }

        const openModal = (type) => {
            console.log(type)
            modalboxOpen.value = true
            modalboxType.value = type
        }
        const closeModal = () => {
            modalboxOpen.value = false
        }

        onMounted(() => {
            if (route.query.demo && route.query.demo === 'true') {
                demoMode.value = true
            }
        })

        return {
            t,
            route,
            store,
            version,
            demoMode,
            nextStep,
            prevStep,
            resetUuid,
            openModal,
            closeModal,
            modalboxOpen,
            modalboxType,
        }
    },
}
</script>

<style scoped>
.survey-footer-menu {
    z-index: 100;
}
</style>
