<script setup>
const session = auth.useSession()

watch(() => session.value.data, (data) => {
  if (!data) {
    navigateTo('/')
  }
})
</script>

<template>
  <div>
    <pre>{{ session }}</pre>
    <UButton @click="auth.signOut()">
      Sign Out
    </UButton>
  </div>
</template>
