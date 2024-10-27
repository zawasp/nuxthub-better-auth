<script setup>
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
  <UHeader title="NuxtHub x BetterAuth" :links="links" />
  <UContainer>
    <UMain>
      <NuxtPage />
    </UMain>
  </UContainer>
  <UNotifications />
</template>
