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

  return {
    user: {
      id: session.data.userId,
      email: session.data.email,
      name: session.data.name
    }
  }
})
