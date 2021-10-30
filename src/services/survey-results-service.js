import axios from 'axios'

axios.defaults.headers['X-DEMO'] = true
export default {
    async getUuidResults(surveySlug, uuid) {
        const url =
            'evaluation-tool/surveys/' + surveySlug + '/run?uuid=' + uuid

        return axios
            .get(url)
            .then((response) => {
                // console.log(response.data)
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    async sendResults(surveySlug, data) {
        const url =
            'evaluation-tool/surveys/' +
            surveySlug +
            '/run?uuid=' +
            window.localStorage.getItem('surveyUUID')
        return axios
            .post(url, data)
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },
}
