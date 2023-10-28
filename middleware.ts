// applies next-auth only to matching routes
export { default } from "next-auth/middleware"
export const config = { matcher: ["/dashboard"] }
