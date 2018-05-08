var express = require('express')
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

router.get('/', function(req, res, next) {
  database.raw(
    'SELECT id, name, calories FROM foods'
  ).then(function(foods) {
    res.json(foods.rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  database.raw(
    'SELECT id, name, calories FROM foods WHERE id=?', [id]
  ).then(function(food) {
    res.json(food.rows)
  })
})

module.exports = router;
