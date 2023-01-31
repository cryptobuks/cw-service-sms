const { ctr } = require('@cowellness/cw-micro-service')()
const routeSchema = require('./messages.schema')

module.exports = async function (fastify, opts, done) {
  fastify.get('/', routeSchema.list, async function (request, reply) {
    const messages = await ctr.messages.find()

    reply.cwsendSuccess({
      data: {
        messages
      }
    })
  })
  done()
}
