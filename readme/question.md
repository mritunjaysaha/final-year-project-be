# Question Endpoints

### Get question

`GET` /api/question/`:questionId`/`:userId`

`Description`: get the question for the `questionId`

`Parameters`: questionId, userId

### Create question

`POST` /api/question/`:examId`/`:userId`

`Description`: Create a question for the `examId`

`Parameters`: examId, userId

`Fields`: name, exam, course_coordinator, marks, [images]

```
name: String
exam: ObjectId
course_coordinator: ObjectId
images: Buffer
marks: Number
```

### Update question

`PUT` /api/question/`:questionId`/`:userId`

`Description`: Update a question for the `examId`

`Parameters`: examId, userId

`Fields`: name, exam, course_coordinator, marks, [images]

```
name: String
exam: ObjectId
course_coordinator: ObjectId
images: Buffer
marks: Number
```

### Delete question

`DELETE` /api/question/`:examId`/`:questionId`/`:userId`

`Description`: Delete a question with the `questionId` and remove the reference from exam with `examId`

`Parameters`: examId, questionId, userId
