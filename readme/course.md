# Course Endpoints

### Get Course

`GET` /api/course/all-courses/`:userId`

`Description`: get all the courses for the `userId`

`Params`: userId

### Get all courses

`GET` /api/course/`:courseId`/`:userId`

`Description`: get the course with the `courseId`

`Params`: courseId, userId

### Get enrolled students

`GET` /api/course/enrolled/`:courseId`/`:userId`

`Description`: get the list of enrolled students for the `courseId`

`Params`: courseId, userId

### Create Course

`POST` /api/course/`:userId`

`Description`: create a course for the `userId`

`Params`: userId

`Fields`: course_name, course_coordinator, [students]

```
Note: [] represents optional fields
```

### Update Course

`PUT` /api/course/`:courseId`/`:userId`

`Description`: update a course for the `userId`

`Params`: userId

`Fields`: course_name, course_coordinator, [students]

### Delete course

`DELETE` /api/course/`:courseId`/`:userId`

`Description`: delete the course with the `courseId`

`Params`: courseId, userId
