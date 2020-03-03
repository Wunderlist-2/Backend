exports.seed = function(knex) {
  return knex("recurring").insert([
    {
      todo_id: 1,
      sunday: false,
      monday: false,
      tuesday: true,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    },
    {
      todo_id: 2,
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false
    },
    {
      todo_id: 3,
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
