<script setup>
// https://better-auth.vercel.app/docs/integrations/nuxt#ssr-usage
const auth = useAuth()
</script>

<template>
  <div>
    <h3>User</h3>
    <pre>{{ auth.user }}</pre>
    <h3>Session</h3>
    <pre>{{ auth.session }}</pre>
    <UButton @click="auth.signOut({ redirectTo: '/' })">
      Sign Out
    </UButton>
  </div>
</template>
