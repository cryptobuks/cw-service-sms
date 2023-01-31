const { db } = require('@cowellness/cw-micro-service')()
const constants = require('./messages.constants')
const Schema = db.data.Schema

const messages = new Schema(
  {
    parameters: {
      type: Object
    },
    sentAt: {
      type: Date,
      default: null
    },
    deliveredAt: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: [constants.STATUS_SENT, constants.STATUS_FAILED]
    }
  },
  { timestamps: true }
)

module.exports = db.data.model('Messages', messages)
