export default defineEventHandler((event) => {
  setCookie(event, "firebase_access_token", "", {
    maxAge: -1,
    path: "/",
  })
  return {
    success: true,
    message: "Success delete user access token"
  }
})
