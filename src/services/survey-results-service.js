import axios from 'axios'
import store from '../store/store'

export default {
    async getUuidResults(surveySlug, uuid = null) {
        let url = 'evaluation-tool/surveys/' + surveySlug + '/run'
        if (uuid) {
            url += '?uuid=' + uuid
        }
        return axios
            .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    async sendResults(surveySlug, data) {
        let header = {}
        if (store.state.isDemo === true) {
            header = { 'X-Demo': true }
        }

        const url =
            'evaluation-tool/surveys/' +
            surveySlug +
            '/run?uuid=' +
            window.localStorage.getItem('surveyUuid')

        return axios
            .post(url, data, {
                headers: header,
            })
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },
}
