const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const pool = require('../db');

const protect = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // extract token from authHeader string
      token = authHeader.split(' ')[1]

      // verified token returns user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
      // find user in db and assign to req.user

      const userExistsQuery = 'SELECT id FROM users WHERE id = $1';
      const values = [decoded.id];

      const result = await pool.query(userExistsQuery, values);

      if (result.rows.length === 0) {
        return response.status(404).send({ message: "The user doesn't exists!" });
      }

      req.user = result.rows[0]
      next()

    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})

module.exports = protect

