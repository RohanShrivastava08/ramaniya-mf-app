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

  const transactionId = event.context.params?.id
  if (!transactionId) {
    throw createError({ statusCode: 400, statusMessage: 'Transaction ID missing' })
  }

  // Security: only the owner can delete their own transaction
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId }
  })

  if (!transaction || transaction.userId !== session.data.userId) {
    throw createError({ statusCode: 403, statusMessage: 'Access denied' })
  }

  await prisma.transaction.delete({
    where: { id: transactionId }
  })

  return { success: true }
})
