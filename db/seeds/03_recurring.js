exports.seed = function(knex) {
  return knex("recurring").insert([
    {
      id: 0,
      todo_id: 0,
      sunday: false,
      monday: false,
      tuesday: true,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    },
    {
      id: 1,
      todo_id: 1,
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false
    },
    {
      id: 2,
      todo_id: 2,
      sunday: false,
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false
    }
  ]);
};
