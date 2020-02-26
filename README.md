### Welcome to the Back End of Wunderlist 2.0!

# This app will:

_ 1. Let you register, login, and edit users 2. Create, read, update, and delete list data
_ Title of list item
_ Due date/Date of event
_ Whether completed (boolean)

# Our Mission Statement:

- Ease of use, convenience!

# Endpoints

- | Method | **URL** | Description

<!-- BASE URL -->

**https://url-goes-here.com**

<!-- Auth  -->

- | POST | **/api/auth/register** | Registers a user using the information sent inside the `request body` in `/json/`. Example body: { "username": "admin", "password": "password" } | Returns `/json/` object { message: `Welcome [username]`} | Requires `username` and `password` fields. Uses sessions for validation.

Note: There is a `type` field that is either `admin` or `user`, and defaults to `user`. The only way to add an `admin` user is hard coded in database.

- | POST | **/api/auth/login** | Logs in a user using the information sent inside the `request body` in `/json`. Example body: { "username": "admin", "password": "password" }. | Returns `/json/` object { username: [username], list: [...list] } | Requires `username` and `password` fields.
- | GET | **/api/auth/logout** | Logs user out, removes session | Returns `/json/` object { message: "Logout success" }

<!-- Users  -->

**Must be logged in as Admin, OR as user with ID in params**

- | GET | **/api/users** | Returns an array of all the user objects contained in the database.
- | GET | **/api/users/:id** | Returns the user object with the specified `id`, including the corresponding todo list using the `user_id`
- | DELETE | **/api/users/:id** | Removes the user with the specified `id` | Returns the deleted `username` and `id`.
- | PUT | **/api/users/:id** | Updates the user with the specified `id` using data from the `request body`. | Returns the modified user object, excluding `password` field (for security).

<!-- Todo list -->

- | GET | **/api/myList** | Takes `user_id` as a parameter. Returns list of specified workouts (including all reps/sets/etc). | Returns array of full list for the user.
- | POST | **/api/myList** | Adds a list item to Wunderlist using information sent inside the `request body` in `/json/`. Example body: { "user_id": 1, "title": "Take out trash", "due_date": null, "date_completed": null, "completed": "false" } `user_id` and `title` are **required**. Defaults for `due_date` and `date_completed` is **null**, default `completed` is **false**. | Returns newly added list item
- | PUT | **/api/myList/:id** | Takes `id`(list item id) as a parameter. Updates the list item using information sent inside the `request body` in `/json/`. | Returns the newly updated list item
- | DELETE | **/api/myList/:id** | Takes `id`(list item id) as a parameter. Deletes the list item. | Returns the list item that was deleted
