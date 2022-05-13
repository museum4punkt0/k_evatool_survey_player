import SURVEY_RESULTS from '../services/survey-results-service'

export default {
    namespaced: true,
    state: {
        surveyUuidResults: null,
        surveyLoaded: false,
        slug: '',
        type: 'survey',
        uuid: '',
        surveyPath: null,
    },
    getters: {
        surveySetting(state) {
            return state.surveyUuidResults.survey.setting.setting
        },
    },
    mutations: {
        setSurveyUuidResults(state, surveyResults) {
            state.surveyUuidResults = surveyResults
        },
        setSurveyLoaded(state, surveyLoaded) {
            state.surveyLoaded = surveyLoaded
        },
        setType(state, type) {
            state.type = type
        },
        setSlug(state, slug) {
            state.slug = slug
        },
        setUuid(state, uuid) {
            state.uuid = uuid
        },
        setSurveyPath(state, data) {
            state.surveyPath = data
        },
    },
    actions: {
        async getUuidResults({ commit, state, rootState }) {
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                state.slug,
                state.uuid,
                state.type,
            )

            // check for errors
            if (surveyResults.status) {
                if (surveyResults.status === 404) {
                    console.log('error 404')
                }

                if (surveyResults.status === 409) {
                    console.log('error 409')
                }

                if (surveyResults.status === 410) {
                    console.log('error 410')
                }

                if (surveyResults.status > 400) {
                    rootState.error = surveyResults.data
                }
            } else {
                // set survey and loaded
                commit('setSurveyUuidResults', surveyResults)
                commit('setSurveyLoaded', true)
                return surveyResults
            }
        },
        async sendSurveyResults({ state }, resultData) {
            await SURVEY_RESULTS.sendResults(
                state.slug,
                resultData.data,
                state.uuid,
                state.type,
            )
        },
        async sendSurveyAudioAsset({ commit }, resultData) {
            await SURVEY_RESULTS.sendAudioResults(resultData)
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                resultData.surveyStepResultId,
                localStorage.getItem('surveyUuid'),
            )
            commit('setSurveyUuidResults', surveyResults)
        },
        setType({ commit }, type) {
            commit('setType', type)
        },
        setSlug({ commit }, slug) {
            commit('setSlug', slug)
        },
        setUuid({ commit }, uuid) {
            commit('setUuid', uuid)
        },

        async getSurveyPath({ state, commit }) {
            const path = await SURVEY_RESULTS.getSurveyPath(
                state.slug,
                state.uuid,
            )

            commit('setSurveyPath', path)
        },
    },
}
