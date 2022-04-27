<template>
    <div
        class="survey-footer-menu bg-white bottom-0 fixed w-full md:w-screen z-100"
    >
        <div
            class="survey-navigation-inner flex items-center h-auto min-h-10 py-2"
        >
            <div class="ml-3 text-xs text-gray-500 flex items-center relative">
                Version&nbsp;
                <strong>{{ version }}</strong>

                <button
                    v-if="demoMode"
                    class="tabindex-focus rounded bg-green-400 text-white px-3 md:whitespace-nowrap py-2 ml-3"
                    @click="resetUuid"
                >
                    {{ t('new_uuid') }}
                </button>
            </div>
            <div class="flex bg-white items-center justify-center w-full">
                <div
                    class="flex relative justify-center xl:absolute xl:right-6 bg-white md:bg-transparent"
                >
                    <SwitchGroup>
                        <div class="flex items-center mr-16">
                            <SwitchLabel class="mr-4">
                                {{ t('show_animations') }}
                            </SwitchLabel>
                            <Switch
                                v-model="showAnimations"
                                :class="
                                    store.state.showAnimations
                                        ? 'bg-green-400'
                                        : 'bg-gray-500'
                                "
                                class="relative inline-flex items-center h-6 rounded-full w-11"
                            >
                                <span
                                    :class="
                                        store.state.showAnimations
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    "
                                    :style="
                                        store.state.showAnimations && {
                                            transition: 'all ease 0.3s',
                                        }
                                    "
                                    class="inline-block w-4 h-4 transform bg-white rounded-full"
                                />
                            </Switch>
                        </div>
                    </SwitchGroup>

                    <button
                        class="tabindex-focus imprint flex items-center rounded-md nav-button p-2 ml-2"
                        @click="openModal('privacy')"
                    >
                        <finger-print-icon
                            class="h-5 w-5 mr-2 invisible md:visible"
                        ></finger-print-icon>
                        {{ t('privacy') }}
                    </button>
                    <button
                        class="tabindex-focus imprint flex items-center rounded-md nav-button p-2 ml-6"
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
        <ImprintPrivacyModal :open="modalBoxOpen" @close-modal="closeModal">
            <template #header>{{ t(`${modalBoxType}`) }}</template>
            <div v-html="modalContent" />
        </ImprintPrivacyModal>
    </div>
</template>

<script>
import { BookOpenIcon, FingerPrintIcon } from '@heroicons/vue/solid'
import { useRoute } from 'vue-router'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/outline'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { version } from '../../package.json'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import ImprintPrivacyModal from './ImprintPrivacyModal.vue'

export default {
    name: 'Navigation',
    components: {
        SwitchGroup,
        Switch,
        SwitchLabel,
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
        const { t } = useI18n()

        const modalBoxOpen = ref()
        const modalBoxType = ref()
        const modalContent = ref('')
        const demoMode = ref(false)

        const showAnimations = computed({
            get: () => {
                return store.state.showAnimations
            },
            set: (value) => store.dispatch('setShowAnimations', value),
        })

        const surveySetting = computed(
            () => store.getters['surveyResults/surveySetting'],
        )

        const currentLang = computed(() => store.state.lang)

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
            window.localStorage.setItem('surveyVoiceRecording', '')
            window.location.reload()
        }

        const openModal = (type) => {
            const link = surveySetting.value[type + 'Link']
            const text = surveySetting.value[type][currentLang.value]

            if (link) {
                window.open(link, '_blank')
            } else {
                modalContent.value = text
                    ? text
                    : '<p class="text-red-500">Text is missing</p>'
                modalBoxOpen.value = true
                modalBoxType.value = type
            }
        }
        const closeModal = () => {
            modalBoxOpen.value = false
            modalContent.value = ''
        }

        onMounted(() => {
            if (route.query.demo && route.query.demo === 'true') {
                demoMode.value = true
            }

            showAnimations.value = store.state.showAnimations
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
            modalBoxOpen,
            modalContent,
            modalBoxType,
            showAnimations,
        }
    },
}
</script>

<style scoped>
.survey-footer-menu {
    z-index: 100;
}
</style>
