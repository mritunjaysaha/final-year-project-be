## Delay - Tolerant Online Examination System

### End points

#### signin

`POST` http://localhost:9000/api/signin

`Required fields`: firstName, lastNama, email, password
`Optional field`: role

<strong>role</strong>
- 0: students `[default value]`
- 1: teachers
- 10: administrator

#### login

POST http://localhost:9000/api/login

`Required fields`: email, password

#### logout

`GET` http://localhost:9000/api/logout

#### isSignedIn

`GET` http://localhost:9000/api/isSignedIn
