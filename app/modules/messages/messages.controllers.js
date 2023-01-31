const { db, log } = require('@cowellness/cw-micro-service')()
const Mobyt = require('../../lib/mobyt')
const constants = require('./messages.constants')

/**
 * @class MessagesController
 * @classdesc Controller Messages
 */
class MessagesController {
  constructor () {
    this.Messages = db.data.model('Messages')
  }

  /**
   * Find all sms messages in db
   * @returns list of messages
   */
  find () {
    return this.Messages.find({})
  }

  /**
   * creates and sends a sms message
   * @param {Object} parameters options for mobyt api
   * @returns created model if sent
   */
  async create (parameters) {
    const message = await this.Messages.create({
      parameters,
      sentAt: Date.now()
    })
    parameters.order_id = message._id
    const response = await this.sendSms(parameters)

    message.status = constants.STATUS_SENT
    if (response.result !== 'OK') {
      log.error('SMS CREATE: Could not send message %j', response)
      message.status = constants.STATUS_FAILED
    }
    log.info('SMS CREATE: successful %j', message)
    return message.save()
  }

  /**
   * Sends a message through mobyt
   * @param {Object} parameters options for mobyt api
   * @returns response from api
   */
  async sendSms (parameters) {
    const mobyt = new Mobyt()

    return mobyt.send(parameters)
  }
}

module.exports = MessagesController
