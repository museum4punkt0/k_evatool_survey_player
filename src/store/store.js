import { createStore } from 'vuex'
import axios from 'axios'
import surveysStoreModule from './surveys'
import surveyResultsStoreModule from './survey-results'

export default createStore({
    modules: {
        surveys: surveysStoreModule,
        surveyResults: surveyResultsStoreModule,
    },
    state: {
        lang: '',
        surveyId: null,
        languages: [],
        currentStep: 0,
        currentVideoStep: 0,
        stepAnswering: false,
        editVideoQuestionId: -1,
        isDemo: false,
        surveyLoaded: false,
    },
    mutations: {
        setSurveyId(state, surveyId) {
            state.surveyId = surveyId
        },
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
    },
    actions: {
        setSurveyId({ commit }, surveyId) {
            commit('setSurveyId', surveyId)
        },
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
        // async setUserLanguage({ commit }, lang) {
        async setUserLanguage({ commit }, lang) {
            commit('setUserLanguage', lang)
        },
        // async getLanguages({ commit }, userLang) {
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

            //commit('setLanguages', languages)
            // commit('setUserLanguage', userLang)
        },
    },
})
