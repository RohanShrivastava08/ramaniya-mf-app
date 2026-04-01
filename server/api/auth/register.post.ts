import bcrypt from 'bcryptjs'
import { useSession } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.email || !body.password || !body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required credentials' })
  }

  // Check unique constraints
  const exists = await prisma.user.findUnique({
    where: { email: body.email }
  })
  if (exists) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered.' })
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(body.password, salt)

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      passwordHash: passwordHash
    }
  })

  // Sign User session via H3
  const config = useRuntimeConfig()
  const session = await useSession(event, {
    password: config.session.password,
    name: 'ramaniya-session',
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
  })
  
  await session.update({
    userId: newUser.id,
    name: newUser.name,
    email: newUser.email,
  })

  return {
    success: true,
    user: { id: newUser.id, email: newUser.email, name: newUser.name }
  }
})
