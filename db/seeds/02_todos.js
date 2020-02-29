exports.seed = function(knex) {
  return knex("todos").insert([
    {
      id: 0,
      user_id: 0,
      title: "test todo 1",
      due_date: "03 March, 2020 3:00PM",
      date_completed: "26 February, 2020 4:32PM",
      completed: true
    },
    {
      id: 1,
      user_id: 1,
      title: "test todo 2",
      due_date: "03 March, 2020 3:00PM"
    },
    { id: 2, user_id: 2, title: "test todo 3" }
  ]);
};
