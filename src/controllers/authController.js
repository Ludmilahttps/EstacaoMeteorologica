import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { authSchema } from "../schemas/index.js"

export async function signIn (request, response) {
    const { email, password } = request.body
    let user

    try {
        user = await authSchema.findEmployee(email)
    } catch(error) {
        return response.send(error).status(500)
    }
    console.log("here")
    const token = uuid()
    const id = user.id_employee
    try {
        console.log("here")
        const position = await authSchema.findPosition(user.id_employee)

        console.log(position)

        if(user && bcrypt.compareSync(password, user.password)) {
            response.send({token, id, position})
        } else {
            return response.status(401).send('Unauthorized')
        }
    } catch(error) {
        return response.send(error).status(500)
    }
}

export async function update (request, response) {
    const { email, id_employee } = request.body
    console.log(email)
    console.log(id_employee)
    const token = uuid()
    try {
        await authSchema.updateEmail(email, id_employee)
        return response.status(201).send('OK')
    } catch(error) {
        return response.send(error).status(500)
    }
}

export async function signUp (request, response) {
    const { name, position, email, password } = response.locals.newEmployee
    const employee = {
        name,
        position,
        email,
        password,
    }

    try {
        const pass = bcrypt.hashSync(password, 10)
        employee.password = pass
        await authSchema.insertEmployee(employee)

        return response.status(201).send('OK')
    } catch(error) {
        return response.send(error).status(500)
    }
}