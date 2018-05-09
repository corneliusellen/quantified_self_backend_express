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

router.post('/', function(req, res, next) {
  var name = req.body.food.name
  var calories = req.body.food.calories
  var created_at = new Date
  database('foods').insert({
    name: name,
    calories: calories,
    created_at: created_at
    }).returning('*')
  .then(function(food) {
    res.json(food)
  })
})

router.patch('/:id', function(req, res, next) {
  var id = req.params.id
  var name = req.body.food.name
  var calories = req.body.food.calories
  var created_at = new Date
  database('foods')
  .where('id', '=', id)
  .update({
    name: name,
    calories: calories,
    created_at: created_at
  }).returning('*')
  .then(function(food) {
    res.json(food)
  })
})

module.exports = router;
