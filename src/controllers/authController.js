import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { authSchema } from "../schemas/index.js"

export async function signIn (request, response) {
    const { cpf, password } = request.body
    let user

    try {
        user = await authSchema.getPassByCpf(cpf)
    } catch(error) {
        return response.send(error).status(500)
    }
    const token = uuid()
    const id = user.id_employee
    try {
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
    const { cpf, email, name, position,  password } = response.locals.newUser
    const user = {
        cpf,
        email,
        name,
        position,
        password,
    }

    try {
        const pass = bcrypt.hashSync(password, 10)
        user.password = pass
        await authSchema.insertUser(user)

        return response.status(201).send('OK')
    } catch(error) {
        return response.send(error).status(500)
    }
}