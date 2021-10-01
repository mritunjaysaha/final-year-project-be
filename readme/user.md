# User Endpoints

### Get User

`GET` /api/user/`userId`

`Description`: Get the user details for the user with the `userId`

`Parameters`: userId

### Get all users

`GET` /api/user

`Description`: Get all the users. It can only be used by users with the role of `admin`.

`Parameter`: NONE

### Update user details

`PUT` /api/user/`userId`

`Description`: Update the user with the `userId`.

`Parameters`: userId

`Fields`: first_name, last_name, email, photo, role, courses, exams

```
first_name: String
last_name: String
email: String
photo: String/Buffer
role: Number
Courses: [ObjectId, ref: Course]
exams: [ObjectId, ref: Exam]
```

### Delete user

`DELETE` /api/user/`userId`

`Description`: Delete the user with the `userId`

`Parameters`: userId

### Upload user image

`POST` /api/user/photo/`userId`

`Description`: Upload user image for the user with `userId`

`Parameters`: userId

### Get user image

`GET` /api/user/photo/`username`

`Description`: Get the photo of the user with the `username`.

`Parameters`: username

### Delete user image

`DELETE` /api/user/photo/`userId`

`Description`: Delete the user image for the user with the `userId`

`Parameters`: userId
