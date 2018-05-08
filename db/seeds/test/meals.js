exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meals').del()
    .then(function () {
      return Promise.all([
        knex('meals').insert([
          {name: 'Breakfast', created_at: new Date},
          {name: 'Snacks', created_at: new Date},
          {name: 'Lunch', created_at: new Date},
          {name: 'Dinner', created_at: new Date}
        ])
      ])
    })
    .then(function () {
      return knex('foods').del()
    })
    .then(function () {
      return Promise.all([
        knex('foods').insert([
          {name: 'Quinoa', calories: 10, created_at: new Date},
          {name: 'Bananas', calories: 50,created_at: new Date}
        ])
      ])
    })
    .then(function(){
    return knex.raw(`ALTER SEQUENCE foods_id_seq RESTART 1`)
    })
}
