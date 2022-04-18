import { createStore } from 'vuex'
import axios from 'axios'
import surveyResultsStoreModule from './survey-results'

export default createStore({
    modules: {
        surveyResults: surveyResultsStoreModule,
    },
    state: {
        lang: '',
        showAnimations: localStorage.getItem('surveyShowAnimations') || true,
        languages: [],
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
        setUserLanguage(state, lang) {
            state.lang = lang
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
