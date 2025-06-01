# 🌱 Razan Environment

A powerful and flexible environment configuration parser, inspired by `.env` files — but with extended functionality like functions, sections, and UUID generators.


## 📦 Features

- Simple `.razan` file syntax
- Sections via `[NAME]`
- Built-in function support (UUIDs, string formatting, env variables)
- Comment support via `#`
- Auto-evaluates values (booleans, numbers, strings)


## 📄 Example `.razan` File

```razan
# Basic values
APP_NAME is "Razan";
IS_ENABLED is True;
PORT is 3000;

# Use functions
SESSION_ID is randomUUID();
LOWERCASE_NAME is toLowerCase("RAZAN");
UPPERCASE_NAME is toUpperCase("razan");

[database]
HOST is "localhost";
PASSWORD is env("DB_PASSWORD");
ID is randomUUIDv7();
```

## 🧠 Available Functions

|           Function           |                   Savings                     |
|------------------------------|-----------------------------------------------|
| **`env("KEY")`**             | Loads value from your system **`.env`**       |
| **`toUpperCase("Value")`**   | Converts string to uppercase.                 |
| **`toLowerCase("Value")`**   | Converts string to lowercase.                 |
| **`randomUUID("Value")`**    | Generates a v4 UUID.                          |
| **`randomUUIDv7()`**	       | Generates a v7 UUID using Bun                 |


# 📌 Notes
- Keys must be alphanumeric (\w+)
- All statements end with a semicolon ;
- Functions must match exact case, e.g. **`randomUUID()`**

# 🧑‍💻 Author
Made with ❤️ by Araby<br/>Feel free to open issues or contribute!