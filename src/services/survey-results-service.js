import axios from 'axios'

export default {
    async getResults(surveyId) {
        console.log(surveyId)
        const url =
            'evaluation-tool/surveys/' + surveyId + '/survey-results?all=true'

        return axios
            .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    async sendAudioResults(data) {
        const url = 'evaluation-tool/survey-step-result-assets'
        alert('aaaa')
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
