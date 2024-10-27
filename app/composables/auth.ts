import { defu } from 'defu'
import { createAuthClient } from 'better-auth/client'
import type { InferSessionFromClient, InferUserFromClient, ClientOptions } from 'better-auth/client'
import type { RouteLocation } from 'vue-router'

interface RuntimeAuthConfig {
  redirectUserTo: RouteLocation | string
  redirectGuestTo: RouteLocation | string
}

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined
  const client = createAuthClient({
    baseURL: url.origin,
  })
  const session = useState<InferSessionFromClient<ClientOptions> | null>('auth:session', () => null)
  const user = useState<InferUserFromClient<ClientOptions> | null>('auth:user', () => null)
  const options = defu(useRuntimeConfig().public.auth as Partial<RuntimeAuthConfig>, {
    redirectUserTo: '/',
    redirectGuestTo: '/',
  })

  return {
    session,
    user,
    loggedIn: computed(() => !!session.value),
    signIn: client.signIn,
    options,
    async signOut({ redirectTo }: { redirectTo?: RouteLocation } = {}) {
      const res = await client.signOut()
      session.value = null
      user.value = null
      await navigateTo(redirectTo || options.redirectGuestTo)
      return res
    },
    async fetchSession() {
      const { data } = await client.getSession({
        fetchOptions: { headers },
      })
      session.value = data?.session || null
      user.value = data?.user || null
      return data
    },
    client,
  }
}