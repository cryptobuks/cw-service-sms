const { ctr, rabbitmq } = require('@cowellness/cw-micro-service')()
const validationSchema = require('./messages.schema')

rabbitmq.consume('/sms/post', (msg) => {
  const parameters = msg.data
  const hasErrors = rabbitmq.validate(validationSchema.servicePost, parameters)

  if (hasErrors) {
    return {
      errors: hasErrors
    }
  }
  return ctr.messages.create(parameters)
})
