
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meals').del()
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {name: 'Breakfast', created_at: new Date},
        {name: 'Snacks', created_at: new Date},
        {name: 'Lunch', created_at: new Date},
        {name: 'Dinner', created_at: new Date}
      ]);
    });
};
