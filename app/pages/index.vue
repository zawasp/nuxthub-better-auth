<script setup>
const session = auth.useSession()

watch(() => session.value.data, (data) => {
  if (data) {
    navigateTo('/user')
  }
})

const toast = useToast()
const tabs = [{
  slot: 'signin',
  label: 'Sign In',
  icon: 'i-heroicons-user',
}, {
  slot: 'signup',
  label: 'Sign Up',
  icon: 'i-heroicons-user-plus',
}]

const email = ref('')
const password = ref('')
const name = ref('')
const image = ref < File | null > (null)
const loading = ref(false)

async function signIn() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signIn.email({
    email: email.value,
    password: password.value,
  })
  if (error) {
    toast.add({
      title: error.message,
      color: 'red',
    })
  }
  else {
    toast.add({
      title: `You have been signed in!`,
    })
  }
  loading.value = false
}

async function signUp() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
    image: image.value?.readAsDataURL(),
  })
  if (error) {
    toast.add({
      title: error.message,
      color: 'red',
    })
  }
  else {
    toast.add({
      title: `You have been signed up!`,
    })
  }
  loading.value = false
}
</script>

<template>
  <div class="centered">
    <UTabs :items="tabs">
      <template #signin>
        <form class="flex flex-col gap-4" @submit.prevent="signIn">
          <UFormGroup label="Email" required>
            <UInput v-model="email" type="email" placeholder="Email" />
          </UFormGroup>
          <UFormGroup label="Password" requiredrequired>
            <UInput v-model="password" type="password" placeholder="Password" />
          </UFormGroup>
          <UButton type="submit" color="black" :loading="loading">
            Sign In
          </UButton>
          <UButton
            icon="i-simple-icons-github"
            type="button"
            color="black"
            @click="auth.signIn.social({ provider: 'github', callbackURL: '/user' })"
          >
            Sign In with Github
          </UButton>
        </form>
      </template>
      <template #signup>
        <form class="flex flex-col gap-4" @submit.prevent="signUp">
          <UFormGroup label="Email" required>
            <UInput v-model="email" type="email" placeholder="Email" />
          </UFormGroup>
          <UFormGroup label="Password" requiredrequired>
            <UInput v-model="password" type="password" placeholder="Password" />
          </UFormGroup>
          <UFormGroup label="Name">
            <UInput v-model="name" type="name" placeholder="Name" />
          </UFormGroup>
          <UFormGroup label="Avatar">
            <UInput type="file" @change="image = $event.target.files?.[0]" />
          </UFormGroup>
          <UButton type="submit" color="black" :loading="loading">
            Sign Up
          </UButton>
        </form>
      </template>
    </UTabs>
  </div>
</template>

<style scoped>
.centered {
  padding-top: 100px;
  width: 400px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
h1 {
  font-size: 32px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}
a {
  color: #888;
  text-decoration: none;
  font-size: 18px;
}
a:hover {
  text-decoration: underline;
}
</style>
