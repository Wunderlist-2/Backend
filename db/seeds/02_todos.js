exports.seed = function(knex) {
  return knex("todos").insert([
    {
      user_id: 1,
      title: "test todo 1",
      due_date: "03 March, 2020 3:00PM",
      date_completed: "26 February, 2020 4:32PM",
      completed: true
    },
    {
      user_id: 2,
      title: "test todo 2",
      due_date: "03 March, 2020 3:00PM"
    },
    { user_id: 3, title: "test todo 3" }
  ]);
};
