# Welcome to the Back End of Wunderlist 2.0!

## This app will:
1. Let you register, login, and edit users
2. Create, read, update, and delete list data
        * Title of list item
        * Due date/Date of event
        * Whether completed (boolean)

## Our Mission Statement:

* Ease of use, convenience!

## Endpoints

* | Method | **URL** | Description

### BASE URL

**https://url-goes-here.com**

### AUTH

**Restrictions: None**

* | POST | **/api/auth/register** | Registers a user using the information sent inside the `request body` in `/json/`. Example body: { "username": "test1", "password": "test1" } | Returns newly created `/json/` object (excluding password) | Requires `username` and `password` fields. Uses sessions for validation.

Note: There is a `type` field that is either `admin` or `user`, and defaults to `user`. The only way to add an `admin` user is hard coded in database.

**Restrictions: None**

* | POST | **/api/auth/login** | Logs in a user using the information sent inside the `request body` in `/json`. Example body: { "username": "admin", "password": "password" }. | Returns `/json/` object with welcome message, user info (excluding password) and the list of todo items in the wunderlist | Requires `username` and `password` fields.

**Restrictions: None**

* | GET | **/api/auth/logout** | Logs user out, removes session | Returns `/json/` object { message: "Logout success" }

### USERS

**Restrictions: Admin only**

* | GET | **/api/users** | Returns an array of all the user objects contained in the database.

**Restrictions: Admin or current user matches url :id**

* | GET | **/api/users/:id** | Returns the user object with the specified `id`, including the corresponding todo list using the `user_id`

* | GET | **/api/users/:id/myList** | Returns the todos list array with the specified `user_id`


* | DELETE | **/api/users/:id** | Removes the user with the specified `id` | Returns the deleted `username` and `id`.


* | PUT | **/api/users/:id** | Updates the user with the specified `id` using data from the `request body`. | Returns the modified user object, excluding `password` field (for security).

### TODO LIST

**Restrictions: Admin only**

* | GET | **/api/todos** | Takes Returns array of all todo items.

**Restrictions: Must be signed in to any user**

* | POST | **/api/todos** | Adds a list item to Wunderlist using information sent inside the `request body` in `/json/`. Example body: { "user_id": 1, "title": "Take out trash", "due_date": null, "date_completed": null, "completed": "false" } `user_id` and `title` are **required**. Defaults for `due_date` and `date_completed` is **null**, default `completed` is **false**. | Returns newly added list item

**Restrictions: Admin or user id matches `user_id` field of the todo item**

* | PUT | **/api/todos/:id** | Takes `id`(list item id) as a parameter from url. Updates the list item using information sent inside the `request body` in `/json/`. | Returns the newly updated list item

* | DELETE | **/api/todos/:id** | Takes `id`(list item id) as a parameter from url. Deletes the list item. | Returns the list item that was deleted
