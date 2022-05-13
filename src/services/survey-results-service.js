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
    async sendResults(slug, data, uuid, type = 'survey') {
        const headers = {}

        // set demo header
        if (store.state.isDemo === true) {
            headers['X-Demo'] = true
        }

        // set url bases on type
        let url
        if (type === 'survey') {
            url = 'evaluation-tool/surveys/' + slug + '/run?uuid=' + uuid
        }

        if (type === 'step') {
            url = 'evaluation-tool/surveys/' + slug + '/run-step?uuid=' + uuid
        }

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

    async getSurveyPath(slug, uuid) {
        let url = 'evaluation-tool/surveys/' + slug + '/path?uuid=' + uuid

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
}
