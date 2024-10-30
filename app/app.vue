<script setup>
const { signOut, loggedIn } = useAuth()
const links = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'User',
    to: '/user',
  },
  {
    label: 'Secret',
    to: '/secret',
  },
  {
    label: 'About',
    to: '/about',
  },
]
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <UHeader title="NuxtHub x BetterAuth" :links="links">
    <template #right>
      <UButton v-if="loggedIn" color="black" @click="signOut({ redirectTo: '/' })">
        Sign Out
      </UButton>
    </template>
  </UHeader>
  <UContainer>
    <UMain>
      <NuxtPage />
    </UMain>
  </UContainer>
  <UNotifications />
</template>
