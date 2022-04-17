import axios from 'axios'
import store from '../store/store'

export default {
    async getUuidResults(surveySlug, uuid = null, type = 'survey') {
        let url
        if (type === 'step') {
            url = 'evaluation-tool/surveys/' + surveySlug + '/run-step'
        } else {
            url = 'evaluation-tool/surveys/' + surveySlug + '/run'
        }
        if (uuid) {
            url += '?uuid=' + uuid
        }

        const headers = {}
        if (store.state.isDemo === true) {
            headers['X-Demo'] = true
        }

        return axios
            .get(url, {
                headers,
            })
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error.response
            })
    },
    async sendResults(surveySlug, data) {
        const headers = {}
        if (store.state.isDemo === true) {
            headers['X-Demo'] = true
        }

        const url =
            'evaluation-tool/surveys/' +
            surveySlug +
            '/run?uuid=' +
            window.localStorage.getItem('surveyUuid')

        return axios
            .post(url, data, {
                headers,
            })
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },
}
