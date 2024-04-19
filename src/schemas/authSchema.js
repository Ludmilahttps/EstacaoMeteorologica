import joi from "joi"
import { connection } from "./index.js"
import { querieAuth } from "../queries/index.js"

export const authSchema = joi.object ({
    name: joi.string().required(),
    position: joi.number().required(),
    email: joi.string().required(),
    password: joi.string().required(),
})

export const insertEmployee = async (employee) => {
    const { name, position, email, password } = employee
    try {
      await connection.query(querieAuth.insertEmployee(), [name, email, password])
    } catch (error) {
      console.log(error)
    }
    const { rows: id } = await connection.query(querieAuth.getIdByEmail(), [
      email,
    ])
    try {
      await connection.query(querieAuth.insertPositionEmployee(), [id[0].id_employee, position])
    } catch (error) {
      console.log(error)
    }
}

export const updateEmail = async (email, id_employee) => {
  try {
    await connection.query(querieAuth.updateEmail(), [email, id_employee])
  } catch (error) {
    console.log(error)
  }
}

export const findEmployee = async (email) => {
    const { rows: pass } = await connection.query(querieAuth.getPassByEmail(), [
        email,
      ])
    return pass[0]
}

export const findPosition = async (id) => {
  const { rows: position } = await connection.query(querieAuth.getPositionById(), [
      id,
    ])
  return position[0]
}

export const idEmployee = async (email) => {
  const { rows: id } = await connection.query(querieAuth.getIdByName(), [
    name,
  ])
  console.log(id)
  if (id && id.length !== 0) return id.id_employee
  return 0
}