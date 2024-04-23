# School-Managemet Task!

# Main Entities
1. users 
2. students 
3. classrooms
4. schools

### Users
* Data schema
	* **username** : string
	* **role** : enum: ["ADMIN", "SUPERADMIN"]
	* **password** : string
	* **emai** : string
	* **school** :  optional ref to **schools** collection
* Exposed Endpoints
  * [POST] /api/user/signup
	  * **body**
		```yaml
		{
		"username": "schooladmin2",
		"email": "test2@gmail.com",
		"password": "test",
		"role": "ADMIN",
		"phoneNumber": "111111111111"
		}
		```
  * [POST] /api/user/login
  * * **body**
		```yaml
		{
		"email": "test2@gmail.com",
		"password": "test",
		}
		```
```
> Users with ADMIN role can manage student/classroom collections.
>
> Users with SUPERADMIN role can manage school collection.
```

### Schools
* Data schema
	* **name** : string
	* **address** : string
	* **phoneNumber** :  string
	* **noOfClassrooms**: number
	
* Exposed Endpoints
  * [POST] /api/school/create
	  * **body**
		```yaml
		{
		"name": "student",
		"address": "cairo",
		"phoneNumber": "01220010943",
		"noOfClassrooms": 4
		}
		```
* [PATCH] /api/school/update?id=[schoolId]
	 * **body**
		```yaml
		{
		"name": "student",
		"address": "cairo",
		"phoneNumber": "01220010943",
		"noOfClassrooms": 4
		}
		```
* [GET] /api/school/get
* [DELETE] /api/school/delete?id=[studentId]


### Students
* Data schema
	* **name** : string
	* **email** : string
	* **school** :  ref
	
* Exposed Endpoints
  * [POST] /api/student/create
	  * **body**
		```yaml
		{
		"name": "student",
		"email": "test2@gmail.com",
		"school": "6626a42b5c74e204f6b58386"
		}
		```
* [PATCH] /api/student/update?id=[studentId]
	 * **body**
		```yaml
		{
		"name": "student",
		"email": "test2@gmail.com",
		"school": "6626a42b5c74e204f6b58386"
		}
		```
* [GET] /api/student/get
* [DELETE] /api/student/delete?id=[studentId]


### Classrooms
* Data schema
	* **name** : string
	* **capacity** : string
	* **school** :  ref to **schools** collection
	* **students** :  array of refs to **students** collection
	
* Exposed Endpoints
  * [POST] /api/classroom/create
	  * **body**
		```yaml
		{
		"name": "test",
		"capacity": 4,
		"school": "6626a42b5c74e204f6b58386",
		"students": ["66278401af86f7d47cc6c075"]
		}
		```
* [PATCH] /api/classroom/update?id=[classroomId]
	 * **body**
		```yaml
		{
		"name": "test",
		"capacity": 4,
		"school": "6626a42b5c74e204f6b58386",
		"students": ["66278401af86f7d47cc6c075"]
		}
		```
* [GET] /api/classroom/get
* [DELETE] /api/classroom/delete?id=[classroomId]