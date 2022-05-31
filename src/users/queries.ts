const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '0310',
  port: 5432,
})

interface User {
  name: string;
  email: number;
}

interface Header {
  response: any,
  request: any
}

interface ResultsData {
  error: any,
  results: any
}


const getUsers = ({request , response}: Header) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', ({error , results}: ResultsData) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = ({request , response}: Header) => {
  const id = parseInt(request.params.id)
  console.log(id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], ({error , results}: ResultsData) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = ({request , response}: Header) => {
  const { email, name }  : User = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], ({error , results}: ResultsData) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = ({request , response}: Header) => {
  const id : number = parseInt(request.params.id)
  const { email, name }  : User = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    ({error , results}: ResultsData) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = ({request , response}: Header) => {
  const id : number = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], ({error , results}: ResultsData) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}