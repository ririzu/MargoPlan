const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const pool = require('../db');

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const registerUser = asyncHandler(async (request, response) => {
  const { first_name, last_name, company, address_, mobile_no, email, password_ } = request.body

  // check if user email exists in db
  const userExistsQuery = 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)';
  const values = [email];

  try {
    const result = await pool.query(userExistsQuery, values);

    if (result.rows[0].exists) {
      return response.status(403).send({ message: "The user already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_, salt);

    const registerUserQuery = 'INSERT INTO users (first_name, last_name, company, address_, mobile_no, email, password_) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const insertValues = [first_name, last_name, company, address_, mobile_no, email, hashedPassword];

    const insertResult = await pool.query(registerUserQuery, insertValues);

    if (insertResult) {
      response.status(201).send(`User added with ID: ${insertResult.rows[0].id}`)
    }

  }
  catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }

})

const loginUser = asyncHandler(async (request, response) => {
  const { email, password_ } = request.body

  // check if user email exists in db
  const userExistsQuery = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(userExistsQuery, values);

    if (result.rows.length === 0) {
      return response.status(404).send({ message: "The user doesn't exist!" });
    }

    // return user obj if their password matches
    const hashedPassword = result.rows[0].password_

    const passwordMatch = await bcrypt.compare(password_, hashedPassword);

    if (!passwordMatch) {
      response.status(401).send({ message: "Password is incorrect!" });
      return;
    }

    const userToken = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '12h' })

    const user = {
      first_name: result.rows[0].first_name,
      last_name: result.rows[0].last_name,
      company: result.rows[0].company,
      address_: result.rows[0].address_,
      mobile_no: result.rows[0].mobile_no,
      email: result.rows[0].email
    }
    response.json({ user, userToken });

  }
  catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
})

const getUserProfile = asyncHandler(async (request, response) => {

  // check if user email exists in db
  const userExistsQuery = 'SELECT first_name, last_name, company, address_, mobile_no, email FROM users WHERE id = $1';
  const values = [request.user.id];

  try {
    const result = await pool.query(userExistsQuery, values);

    if (result.rows.length === 0) {
      return response.status(404).send({ message: "The user doesn't exist!" });
    }

    response.json(result.rows[0]);

  }
  catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
})

const updateUser = asyncHandler(async (request, response) => {

  const { first_name, last_name, company, address_, mobile_no, email } = request.body

  // check if user email exists in db
  const userExistsQuery = 'SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)';
  const values = [request.user.id];


  try {
    const result = await pool.query(userExistsQuery, values);

    if (!result.rows[0].exists) {
      return response.status(404).send({ message: "The user doesn't exist!" });
    }

    const updateValues = [];
    let updateQuery = 'UPDATE users SET';

    let paramCounter = 0

    if (first_name != undefined) {
      updateQuery += ` first_name = $${++paramCounter},`;
      updateValues.push(first_name);
    }

    if (last_name != undefined) {
      updateQuery += ` last_name = $${++paramCounter},`;
      updateValues.push(last_name);
    }

    if (company != undefined) {
      updateQuery += ` company = $${++paramCounter},`;
      updateValues.push(company);
    }

    if (address_ != undefined) {
      updateQuery += ` address_ = $${++paramCounter},`;
      updateValues.push(address_);
    }

    if (mobile_no != undefined) {
      updateQuery += ` mobile_no = $${++paramCounter},`;
      updateValues.push(mobile_no);
    }

    if (email != undefined) {
      updateQuery += ` email = $${++paramCounter},`;
      updateValues.push(email);
    }

    // Remove the trailing comma from the update query
    updateQuery = updateQuery.slice(0, -1);

    updateQuery += ` WHERE id = $${++paramCounter} RETURNING *`;
    updateValues.push(request.user.id);

    const { rows } = await pool.query(updateQuery, updateValues);

    if (rows.length === 0) {
      return response.status(404).send({ message: "Update Failed!" });
    }

    const user = {
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      company: rows[0].company,
      address_: rows[0].address_,
      mobile_no: rows[0].mobile_no,
      email: rows[0].email
    }

    response.json(user);

  }
  catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }

})

const deleteUser = asyncHandler(async (request, response) => {

  // check if user email exists in db
  const userExistsQuery = 'SELECT * FROM users WHERE id = $1';
  const values = [request.user.id];

  try {
    const result = await pool.query(userExistsQuery, values);

    if (result.rows.length === 0) {
      return response.status(404).send({ message: "The user doesn't exist!" });
    }

    const deleteUserQuery = 'DELETE FROM users WHERE id = $1';
    const deleteResult = await pool.query(deleteUserQuery, values);

    response.status(200).send({ message: "User deleted successfully! " });

  }
  catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }

})

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  deleteUser
};
