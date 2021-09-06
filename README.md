## Delay - Tolerant Online Examination System

### Table of Contents

- [End points](#Endpoints)

### <a name='Endpoints'></a>End points

#### <a name='signin'></a>signin

`POST` http://localhost:9000/api/signin

`Required fields`: firstName, lastNama, email, password
`Optional field`: role

<strong>role</strong>
- 0: students `[default value]`
- 1: teachers
- 10: administrator

#### <a name='login'></a>login

`POST` http://localhost:9000/api/login

`Required fields`: email, password

#### <a name='logout'></a>logout

`GET` http://localhost:9000/api/logout

#### <a name='isSignedIn'></a>isSignedIn

`GET` http://localhost:9000/api/isSignedIn
