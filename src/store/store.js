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
        lang: 'de',
        surveyId: null,
        languages: [],
        currentStep: 0,
        currentVideoStep: 0,
        stepAnswering: false,
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
        setUserLanguage(state, lang) {
            // set userLanguage or set defaultLanguage if userLanguage not found
            if (state.languages.find((x) => x.code === lang)) {
                state.lang = lang
            } else {
                let defaultLangObject = state.languages.find(
                    (x) => x.default === true,
                )
                state.lang = defaultLangObject.code
            }
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
        decCurrentStep({ commit }) {
            commit('decCurrentStep')
        },
        setStepAnswering({ commit }, value) {
            commit('setStepAnswering', value)
        },
        // async setUserLanguage({ commit }, lang) {
        async setUserLanguage() {
            // commit('setUserLanguage', lang)
        },
        // async getLanguages({ commit }, userLang) {
        async getLanguages() {
            const url = 'evaluation-tool/survey-languages'
            let languages = await axios
                .get(url)
                .then((response) => {
                    return response.data.data
                })
                .catch((error) => {
                    return error
                })
            console.log(languages)
            //commit('setLanguages', languages)
            // commit('setUserLanguage', userLang)
        },
    },
})
