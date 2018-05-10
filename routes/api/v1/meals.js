var express = require('express')
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

router.get('/', function(req, res, next) {
  database.raw(
    'SELECT id, name FROM meals'
  ).then(function(meals) {
    res.json(meals.rows)
  })
})

router.get('/:id/foods', function(req, res, next) {
  var id = req.params.id
  database('meals')
  .where('meals.id', '=', id)
  .leftJoin('foodmeals', 'meals.id', '=', 'foodmeals.meal_id')
  .leftJoin('foods', 'foodmeals.food_id', '=', 'foods.id')
  .select(['meals.id', 'meals.name', database.raw('JSON_AGG(foods.*) as foods')])
  .groupBy('meals.id')
  .then(function (foodmeals) {
    res.json(foodmeals)
  })
})

module.exports = router;
