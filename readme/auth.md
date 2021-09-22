### Auth

#### signin

`POST` /api/signin

`Parameters`

```
firstName: String
lastName: String
email: String
role: Number [default = 0]
```

```json
{
    "_id": "31412451j1ju24u12hui1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@test.com",
    "role": 0
}
```

<strong>role</strong>

-   0: students `[default value]`
-   1: teachers
-   10: administrator

#### login

`POST` /api/login

#### logout

`GET` /api/logout

#### isSignedIn

`GET` /api/isSignedIn
