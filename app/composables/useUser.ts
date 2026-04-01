export const useUser = () => {
  return useState<any>('user', () => null)
}

export const useFetchUser = async () => {
  const user = useUser()
  if (!user.value) {
    try {
      const res = await $fetch<any>('/api/auth/me')
      if (res && res.user) {
        user.value = res.user
      }
    } catch {
      user.value = null
    }
  }
  return user
}
