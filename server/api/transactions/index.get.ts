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

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.data.userId,
      status: 'COMPLETED'
    },
    orderBy: { createdAt: 'desc' }
  })

  return transactions
})
