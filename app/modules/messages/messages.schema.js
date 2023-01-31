const list = {
  schema: {
    tags: ['Messages'],
    summary: 'List all messages'
  }
}
const servicePost = {
  required: ['message_type', 'message', 'recipient'],
  properties: {
    message_type: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    recipient: {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 1
    }
  }
}
module.exports = {
  list,
  servicePost
}
