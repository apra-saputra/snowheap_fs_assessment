# BACK-END

## **GETTING START**

### _clone git_

```
git clone <repo> &&
cd back-end
```

### _Install the dependancies_

```
npm install
```

### _Create Variable & connect to database_

create a _.env_ file at the root of the project base on _.example.env_
populate it with the url of your database

```
DATABASE_URL="mysql://<username>:<password>@<host_name>:<port>/<database_name>"
```

### _Command Line List_

| Command Line             | Description                                   |
| ------------------------ | --------------------------------------------- |
| npx prisma db push       | migrate database                              |
| npx prisma db seed       | seed database                                 |
| npx prisma migrate reset | reset database to migration and start seeding |
| npm run compile          | compile script to javascript es6              |
| npm run start            | compile script and run apps                   |

## **TECH STACK**

- Typescript
- Express
- Prisma
- MySql
- Json Web Token
- Bcrypt
- Cors
- Cookie-parser

## **API-SPEC**

### Routes

- [Auth](#auth)
  - [Register - Post /api/register](#register)
  - [Login - Post /api/register](#login)
  - [Logout - Delete /api/register](#logout)
  - [Change Password - Delete /api/register](#change-password)
- [Project](#project)
  - [Get All Project - Get /api/projects](#get-all-project)
  - [Create All Project - Post /api/projects](#create-project)
  - [Get Project - Get /api/projects/{id}](#get-project)
  - [Put Project - Put /api/projects/{id}](#put-project)
  - [Patch progress Project - Patch /api/projects/{id}/progress](#patch-progress-project)
  - [Patch status Project - Patch /api/projects/{id}/status](#patch-status-project)
  - [Delete Project - Delete /api/projects/{id}](#delete-project)
- [Global Error](#global-error)

## Auth

### Register

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- body

  ```json
  {
    "email": "string",
    "name": "string",
    "password": "string"
  }
  ```

Response

- Success Register ( _201_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
      "data": {
        "email": "string",
        "name": "string"
      }
    }
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Email is required"
    }
    OR
    {
      "errorMessage": "Name is required"
    }
    OR
    {
      "errorMessage": "Password is required"
    }
    OR
    {
      "errorMessage": "Password min 5 char"
    }
    OR
    {
      "errorMessage": "Invalid Email Format"
    }
    OR
    {
      "errorMessage": "Username atleast 5 char"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "string"
      }
    }
    ```

### Login

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- body

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

Response

- Success Login ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
      "message": {
        "email": "string",
        "name": "string"
      }
    }
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Email is required"
    }
    OR
    {
      "errorMessage": "Password is required"
    }
    OR
    {
      "errorMessage": "invalid email/password"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "string"
      }
    }
    ```

### Change-Password

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- params

  ```json
  {
    "id": "number"
  }
  ```

- body

  ```json
  {
    "password": "string",
    "confirmPassword": "string"
  }
  ```

Response

- Success Logout ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {}
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Invalid password"
    }
    OR
    {
      "errorMessage": "Password atleast 5 char"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "string"
      }
    }
    ```

### Logout

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

Response

- Success Logout ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {}
  }
  ```

- ERROR

  - ( _404_ )

    ```json
    "errorMessage": "data not found"
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "string"
      }
    }
    ```

## Project

### Get All Project

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- Params

  ```json
  {
    "limit": "[Required]",
    "skip": "[Required]",
    "filter": {
      "name": "[optional]"
    },
    "sortBy": "[optional]"
  }
  ```

Response

- Success Logout ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": [...],
        "count": "number",
        "limit": "number",
        "skip": "number"
    }
  }
  ```

### Create Project

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- Body

  ```json
  {
    "name": "string",
    "description": "string",
    "costs": "number",
    "target": "number"
  }
  ```

Response

- Success Create Project ( _201_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": {
            ..."project"
        },
    }
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Name is Required"
    }
    OR
    {
      "errorMessage": "Status is Required"
    }
    OR
    {
      "errorMessage": "Costs is Required"
    }
    OR
    {
      "errorMessage": "Target is Required"
    }
    OR
    {
      "errorMessage": "Invalid target"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "String"
      }
    }
    ```

### Get Project

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

Request

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- params

  ```json
  {
    "id": "number"
  }
  ```

Response

- Success Logout ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": {
            ..."project"
        },
    }
  }
  ```

- ERROR

  - ( _404_ )

    ```json
    {
      "errorMessage": "No Project found"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "string"
      }
    }
    ```

### Put Project

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- params

  ```json
  {
    "id": "number"
  }
  ```

- Body

  ```json
  {
    "name": "string",
    "description": "string",
    "status": "string",
    "costs": "number",
    "target": "number"
  }
  ```

Response

- Success Update Project ( _201_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": {
            ..."project"
        },
    }
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Name is Required"
    }
    OR
    {
      "errorMessage": "Status is Required"
    }
    OR
    {
      "errorMessage": "Costs is Required"
    }
    OR
    {
      "errorMessage": "Target is Required"
    }
    OR
    {
      "errorMessage": "Invalid target"
    }
    ```

  - ( _404_ )

    ```json
    {
      "errorMessage": "No Project found"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "String"
      }
    }
    ```

### Patch Progress Project

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- params

  ```json
  {
    "id": "number"
  }
  ```

- body

  ```json
  {
    "progress": "number"
  }
  ```

Response

- Success Patch Progress Project ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": {
            ..."project"
        }
    }
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Progress is Required"
    }
    OR
    {
      "errorMessage": "Invalid progress"
    }
    ```

  - ( _404_ )

    ```json
    {
      "errorMessage": "No Project found"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "String"
      }
    }
    ```

### Patch Status Project

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- params

  ```json
  {
    "id": "number"
  }
  ```

- body

  ```json
  {
    "status": "string"
  }
  ```

Response

- Success Patch Status Project ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": {
            ..."project"
        }
    }
  }
  ```

- ERROR

  - ( _400_ )

    ```json
    {
      "errorMessage": "Status is required"
    }
    ```

  - ( _404_ )

    ```json
    {
      "errorMessage": "No Project found"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "String"
      }
    }
    ```

### Delete Project

Request

- headers

  ```json
  {
    "x-app-key": "string"
  }
  ```

- cookies

  ```json
  {
    "accesstoken": "string"
  }
  ```

- params

  ```json
  {
    "id": "number"
  }
  ```

Response

- Success Delete Project ( _200_ )

  ```json
  {
    "statusCode": "number",
    "statusText": "string",
    "payload": {
        "data": {
            ..."project"
        },
    }
  }
  ```

- ERROR

  - ( _404_ )

    ```json
    {
      "errorMessage": "No Project found"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "String"
      }
    }
    ```

## Global Error

- ERROR

  - ( _401_ )

    ```json
    {
      "errorMessage": "Access denied"
    }
    ```

  - ( _403_ )

    ```json
    {
      "errorMessage": "Forbidden"
    }
    ```

  - ( _500_ )

    ```json
    {
      "errorMessage": "Internal Server Error"
    }
    ```

  - Response Error

    ```json
    {
      "statusCode": "number",
      "status": "ERROR",
      "payload": {
        "errorMessage": "String"
      }
    }
    ```
