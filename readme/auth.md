# Auth Endpoints

### signup

`POST` /api/signin

`Description`: create new user

`Fields`: firstName, lastName, email, role

`Type`: JSON

```
firstName: String
lastName: String
email: String
role: Number [default = 0]
```

<strong>role</strong>

-   0: students `[default value]`
-   1: teachers
-   10: administrator

### login

`POST` /api/login

`Description`: login the user

`Fields`: username, password

`Type`: JSON

```
username: String
password: String
```

### logout

`GET` /api/logout

### isSignedIn

`GET` /api/isSignedIn
