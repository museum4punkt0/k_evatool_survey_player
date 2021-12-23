import SURVEY_RESULTS from '../services/survey-results-service'

export default {
    namespaced: true,
    state: {
        surveyUuidResults: null,
    },
    mutations: {
        setSurveyUuidResults(state, surveyResults) {
            state.surveyUuidResults = surveyResults
        },
    },
    actions: {
        async getUuidResults({ commit }, data) {
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                data.surveyId,
                data.uuid,
            )

            commit('setSurveyUuidResults', surveyResults)

            return surveyResults
        },
        async sendSurveyResults({ commit }, resultData) {
            console.log(resultData)
            await SURVEY_RESULTS.sendResults(
                resultData.surveyId,
                resultData.data,
            )

            await SURVEY_RESULTS.getUuidResults(
                resultData.surveyId,
                localStorage.getItem('surveyUuid'),
            )
            // commit('setSurveyUuidResults', surveyResults)
        },
        async sendSurveyAudioAsset({ commit }, resultData) {
            await SURVEY_RESULTS.sendAudioResults(resultData)
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                resultData.surveyStepResultId,
                localStorage.getItem('surveyUuid'),
            )
            commit('setSurveyUuidResults', surveyResults)
        },
    },
}
