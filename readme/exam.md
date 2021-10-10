# Exam Endpoints

### Get all questions of a exam

`GET` /api/exam/all-question/`:examId`/`:userId`

`Description`: Get all the questions for the `examId`

`Parameters`: examId, userId

### Get all the exams created by a user

`GET` /api/`:userId`

`Description`: Get all the exams created by a user for the `userId`

`Parameters`: userId

### Get exam

`GET` /api/exam/`:examId`/`:userId`

`Description`: Get the details of the exam for the `examId`

`Parameters`: examId, userId

### Get students enrolled for the exam

`GET` /api/exam/`:examId`/`:userId`

`Description`: Get all the students enrolled for an exam

`Parameters`: examId, userId

### Create exam

`POST` /api/exam/`userId`

`Description`: Create a exam for the `userId`

`Parameters`: userId

`Fields`: name, course, course_coordinator, time_limit, total_marks, [questions, students]

```
name: String
course: ObjectId
course_coordinator: ObjectId
questions: [ObjectId] // array of ObjectIds
students: [ObjectId] // array of ObjectIds
time_limit: Number
total_marks: Number
```

### Update exam

`PUT` /api/exam/`:examId`/`:userId`

`Description`: Update the details of the exam. It will also be used to enroll the students for the exam

`Parameters`: examId, userId

`Fields`: name, course, course_coordinator, time_limit, total_marks, [questions, students]

```
name: String
course: ObjectId
course_coordinator: ObjectId
questions: [ObjectId] // array of ObjectIds
students: [ObjectId] // array of ObjectIds
time_limit: Number
total_marks: Number
```

### Delete the exam

`DELETE` /api/exam/`:examId`/`:userId`

`Description`: Delete the exam and remove the questions with the references of the `Question`

`Parameters`: examId, userId
