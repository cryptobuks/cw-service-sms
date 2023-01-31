const { log, factoryConfig, _ } = require('@cowellness/cw-micro-service')()
const config = factoryConfig
const axios = require('axios')

class Mobyt {
  constructor () {
    this.smsApi = 'https://app.mobyt.it/API/v1.0/REST/sms'
    if (!config.options.userKey || !config.options.accessToken) {
      log.error('Mobyt SMS: config.options.userKey and config.options.accessToken are not set')
    }
    this.api = axios.create({
      headers: {
        user_key: config.options.userKey,
        Access_token: config.options.accessToken
      }
    })
  }

  async send (parameters) {
    log.info('Mobyt SMS: sending %j', parameters)
    try {
      const response = await this.api.post(this.smsApi, parameters)

      log.info('Mobyt SMS: sent %j', response.data)
      return response.data
    } catch (error) {
      const errorData = _.get(error, 'response.data')

      log.error('Mobyt SMS: error %j', error)
      return errorData
    }
  }

  async state (orderId) {
    try {
      const response = await this.api.get(`${this.smsApi}/${orderId}`)

      log.info('Mobyt SMS: state %j', response.data)
      return response.data
    } catch (error) {
      const errorData = _.get(error, 'response.data')

      log.error('Mobyt SMS: state error %j', error)
      return errorData
    }
  }
}

module.exports = Mobyt
