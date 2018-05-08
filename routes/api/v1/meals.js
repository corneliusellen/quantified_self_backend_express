var express = require('express')
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', function(req, res, next) {
  database.raw(
    'SELECT * FROM meals'
  ).then(function(meals) {
    res.json(meals.rows)
  })
})

module.exports = router;
