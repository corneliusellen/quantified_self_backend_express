exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foodmeals').del()
    .then(function () {
      return knex('meals').del()
    })
    .then(function () {
      return Promise.all([
        knex('meals').insert([
          {id: 1, name: 'Breakfast', created_at: new Date},
          {id: 2, name: 'Snacks', created_at: new Date},
          {id: 3, name: 'Lunch', created_at: new Date},
          {id: 4, name: 'Dinner', created_at: new Date}
        ])
      ])
    })
    .then(function () {
      return knex('foods').del()
    })
    .then(function () {
      return Promise.all([
        knex('foods').insert([
          {id: 1, name: 'Quinoa', calories: 10, created_at: new Date},
          {id: 2, name: 'Bananas', calories: 50,created_at: new Date},
          {id: 3, name: 'Chocolate Chips', calories: 200, created_at: new Date}
        ])
      ])
    })
    .then(function(){
    return knex.raw(`ALTER SEQUENCE foods_id_seq RESTART 4`)
    })
    .then(function () {
      return Promise.all([
        knex('foodmeals').insert([
          {id: 1, food_id: 1, meal_id: 1},
          {id: 2, food_id: 2, meal_id: 1},
          {id: 3, food_id: 3, meal_id: 2}
        ])
      ])
    })
    .then(function () {
      return knex.raw(`ALTER SEQUENCE foodmeals_id_seq RESTART 4`)
    })
}
