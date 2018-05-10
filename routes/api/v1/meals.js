var express = require('express')
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

router.get('/', function(req, res, next) {
  database('meals')
  .leftJoin('foodmeals', 'meals.id', '=', 'foodmeals.meal_id')
  .leftJoin('foods', 'foodmeals.food_id', '=', 'foods.id')
  .select(['meals.id',
          'meals.name',
          database.raw('JSON_AGG(foods.*) as foods')])
  .groupBy('meals.id')
  .orderBy('meals.id')
  .then(function (foodmeals) {
    res.json(foodmeals)
  })
})

router.get('/:meal_id/foods', function(req, res, next) {
  var id = req.params.meal_id
  database('meals')
  .where('meals.id', '=', id)
  .leftJoin('foodmeals', 'meals.id', '=', 'foodmeals.meal_id')
  .leftJoin('foods', 'foodmeals.food_id', '=', 'foods.id')
  .select(['meals.id',
          'meals.name',
          database.raw('JSON_AGG(foods.*) as foods')])
  .groupBy('meals.id')
  .then(function (foodmeals) {
    res.json(foodmeals)
  })
})

router.post('/:meal_id/foods/:id', function(req, res, next) {
  var food_id = req.params.id
  var meal_id = req.params.meal_id
  database('foodmeals')
  .insert({
    food_id: food_id,
    meal_id: meal_id
  })
  .then(function() {
    return Promise.all([
    (database('foods')
    .select('name')
    .where('id', '=', food_id)),
    (database('meals')
    .select('name')
    .where('id', '=', meal_id))
    ])
  })
  .then(function(info) {
    var foodName = info[0][0].name
    var mealName = info[1][0].name
    var message = `Successfully added ${foodName} to ${mealName}`
    res.json({ message: message })
  })
})

router.delete('/:meal_id/foods/:id', function(req, res, next) {
  var food_id = req.params.id
  var meal_id = req.params.meal_id
  database('foodmeals')
  .where({food_id: food_id,
    meal_id: meal_id
  })
  .del()
  .then(function() {
    return Promise.all([
    (database('foods')
    .select('name')
    .where('id', '=', food_id)),
    (database('meals')
    .select('name')
    .where('id', '=', meal_id))
    ])
  })
  .then(function(info) {
    var foodName = info[0][0].name
    var mealName = info[1][0].name
    var message = `Successfully removed ${foodName} from ${mealName}`
    res.json({ message: message })
  })
})

module.exports = router;
