import { authSchema } from "../schemas/index.js"

export const validateEmployee = (request, response, next) => {
    const Body = authSchema.authSchema.validate(request.body)
    console.log(Body)
    if (Body.error) return response.status(422).send("Some error with JSON body")
    const newEmployee = {
        name: Body.value.name,
        position: Body.value.position,
        email: Body.value.email,
        password: Body.value.password,
    }

  response.locals.newEmployee = newEmployee
  next()
  return true
}