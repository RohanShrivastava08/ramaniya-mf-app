import { useSession } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await useSession(event, {
    password: config.session.password,
    name: 'ramaniya-session'
  })
  
  if (!session.data.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)
  if (!body.fundId || !body.amount || !body.type) {
    throw createError({ statusCode: 400, statusMessage: 'Missing investment payloads' })
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId: session.data.userId,
      fundId: body.fundId,
      amount: Number(body.amount),
      type: body.type === 'SIP' ? 'SIP' : 'BUY',
      status: 'COMPLETED'
    }
  })

  return { success: true, transaction }
})
