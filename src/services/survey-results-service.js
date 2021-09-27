import axios from 'axios'

export default {
    async getResults(surveyId) {
        console.log(surveyId)
        const url = 'evaluation-tool/surveys/' + surveyId + '/run?all=true'

        return axios
            .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    async sendAudioResults(data, surveyId, surveyStepId, surveyStepResultId) {
        const url =
            'evaluation-tool/surveys/' +
            surveyId +
            '/survey-steps/' +
            surveyStepId +
            '/survey-step-results/' +
            surveyStepResultId +
            '/survey-step-result-assets'
        console.log(data)
        return axios
            .post(url, data)
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },
    async sendResults(surveyId, data) {
        const url = 'evaluation-tool/surveys/' + surveyId + '/run'

        console.log(data)
        return axios
            .post(url, data)
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },

    // /api/evaluation-tool/survey-step-result-assets
}
