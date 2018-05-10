exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE foodmeals(
    id SERIAL PRIMARY KEY,
    food_id INT REFERENCES foods(id) ON DELETE CASCADE,
    meal_id INT REFERENCES meals(id) ON DELETE CASCADE
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = 'DROP TABLE foodmeals'
  return knex.raw(dropQuery)
};
