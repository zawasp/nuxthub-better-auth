import { defu } from 'defu'
import { createAuthClient } from 'better-auth/client'
import type { InferSessionFromClient, InferUserFromClient, ClientOptions } from 'better-auth/client'
import type { RouteLocationRaw } from 'vue-router'

interface RuntimeAuthConfig {
  redirectUserTo: RouteLocationRaw | string
  redirectGuestTo: RouteLocationRaw | string
}

export function useAuth() {
  const url = useRequestURL()
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
    signUp: client.signUp,
    options,
    async signOut({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) {
      const res = await client.signOut()
      session.value = null
      user.value = null
      await navigateTo(redirectTo || options.redirectGuestTo)
      return res
    },
    async fetchSession() {
      interface Response {
        session: InferSessionFromClient<ClientOptions> | null
        user: InferUserFromClient<ClientOptions> | null
      }
      const data = await useRequestFetch()<Response>('/api/auth/get-session', {
        headers: {
          Accept: 'text/json',
        },
        retry: false,
      }).catch(() => {})
      session.value = data?.session || null
      user.value = data?.user || null
      return data
    },
    client,
  }
}
