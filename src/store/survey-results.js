import SURVEY_RESULTS from '../services/survey-results-service'

export default {
    namespaced: true,
    state: {
        surveyResults: null,
    },
    mutations: {
        setSurveyResults(state, surveyResults) {
            state.surveyResults = surveyResults
        },
    },
    actions: {
        async setSurveyResults({ commit }, surveyId) {
            const surveyResults = await SURVEY_RESULTS.getResults(surveyId)

            console.log(surveyResults)
            commit('setSurveyResults', surveyResults)
        },
        async sendSurveyResults({ commit }, resultData) {
            console.log(resultData.surveyId)
            await SURVEY_RESULTS.sendResults(
                resultData.surveyId,
                resultData.data,
            )

            const surveyResults = await SURVEY_RESULTS.getResults(
                resultData.surveyId,
            )
            commit('setSurveyResults', surveyResults)
        },
    },
}