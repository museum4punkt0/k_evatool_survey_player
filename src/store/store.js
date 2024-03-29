import { createStore } from 'vuex'
import axios from 'axios'
import surveyResultsStoreModule from './survey-results'

export default createStore({
    modules: {
        surveyResults: surveyResultsStoreModule,
    },
    state: {
        lang: 'de',
        // check if local storage is set or default to true
        showAnimations: localStorage.getItem('surveyShowAnimations')
            ? localStorage.getItem('surveyShowAnimations') === 'true'
            : true,
        currentStep: 0,
        currentVideoStep: 0,
        stepAnswering: false,
        editVideoQuestionId: -1,
        isDemo: false,
        surveyLoaded: false,
        kiosk: false,
        appReady: false,
        error: '',
    },
    getters: {
        languages(state) {
            return state.surveyResults.surveyUuidResults.survey.languages
        },

        languageNames(state) {
            return state.surveyResults.surveyUuidResults.survey.languageNames
        },
    },
    mutations: {
        setCurrentStep(state, step = null) {
            if (step) {
                state.currentStep = step
            } else {
                state.currentStep =
                    state.surveyResults.surveyUuidResults.survey.statusByUuid.currentStep
            }
            state.stepAnswering = false
        },
        setCurrentVideoStep(state) {
            state.currentVideoStep++
        },
        setIsDemo(state, value) {
            state.isDemo = value
        },
        decCurrentStep(state) {
            if (state.currentStep > 0) {
                state.currentStep--
            }
        },
        setLanguages(state, languages) {
            state.languages = languages
        },
        setStepAnswering(state, value) {
            state.stepAnswering = value
        },
        editVideoQuestionId(state, value) {
            state.editVideoQuestionId = value
        },
        initLang(state, languages) {
            const localStorageValue = localStorage.getItem('surveyUserLanguage')

            if (languages.length > 0) {
                if (
                    localStorageValue &&
                    languages.includes(localStorageValue)
                ) {
                    return (state.lang = localStorageValue)
                }
                state.lang = languages[0]
                localStorage.setItem('surveyUserLanguage', languages[0])
            }
        },
        setLang(state, lang) {
            state.lang = lang
            localStorage.setItem('surveyUserLanguage', lang)
        },
        setShowAnimations(state, show) {
            localStorage.setItem('surveyShowAnimations', show)
            state.showAnimations = show
        },
        setKiosk(state, kiosk) {
            state.kiosk = kiosk
        },
        setError(state, errorString) {
            state.error = errorString
        },
        setAppReady(state, appReady) {
            state.appReady = appReady
        },
    },
    actions: {
        setCurrentStep({ commit }) {
            commit('setCurrentStep')
        },
        setCurrentVideoStep({ commit }) {
            commit('setCurrentVideoStep')
        },
        setIsDemo({ commit }, value) {
            commit('setIsDemo', value)
        },
        decCurrentStep({ commit }) {
            commit('decCurrentStep')
        },
        setStepAnswering({ commit }, value) {
            commit('setStepAnswering', value)
        },
        editVideoQuestionId({ commit }, value) {
            commit('editVideoQuestionId', value)
        },
        async setUserLanguage({ commit }, lang) {
            commit('setUserLanguage', lang)
        },
        async getLanguages() {
            const url = 'evaluation-tool/survey-languages'
            await axios
                .get(url)
                .then((response) => {
                    return response.data.data
                })
                .catch((error) => {
                    return error
                })
        },
        setShowAnimations({ commit }, show) {
            commit('setShowAnimations', show)
        },
        setKiosk({ commit }, kiosk) {
            commit('setKiosk', kiosk)
        },
        setError({ commit }, errorString) {
            commit('setError', errorString)
        },
        setAppReady({ commit }, appReady) {
            commit('setAppReady', appReady)
        },
    },
})
