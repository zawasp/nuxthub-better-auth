export default eventHandler(() => {
  const auth = hubAuth()

  return "pong";
})