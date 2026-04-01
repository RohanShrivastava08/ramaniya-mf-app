import bcrypt from 'bcryptjs'
import { useSession } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password required' })
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })
  
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const isValid = await bcrypt.compare(body.password, user.passwordHash)
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const config = useRuntimeConfig()
  const session = await useSession(event, {
    password: config.session.password,
    name: 'ramaniya-session',
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
  })
  
  await session.update({
    userId: user.id,
    name: user.name,
    email: user.email,
  })

  return {
    success: true,
    user: { id: user.id, email: user.email, name: user.name }
  }
})
