# Email send with Nodemailer and SendGrid

### Techs: ExpressJS, mongoDB, nodemailer, SendGrid

## APIS

1. Register the user. 
    - POST API - http://localhost:8080/users
    - Payload :{
        firstName: "",
		lastName: "",
		email: "",
		password: ""
    }
    - Verification mail will be sent after the registration.
    - user have to verify their registred mail address through check on the invite mail.
    - then only they can able to login.

2. Email verify API URL
    - GET API - http://localhost:3000/:id/verify/:token/
    - It need frontend port as base URL

3. Login API
    - POST API - http://localhost:8080/api/auth
    - Payload:{
         email: "", 
         password: ""
    }

### Direct call

4. Test API for send mail through SendGrid
    - GET API - http://localhost:8080/sendgrid/sendmail

5. Test API for send mail directly through nodemailer
    - GET API - http://localhost:8080/nodemailer/sendmail
    

## ENV data

DB = Your mongodb url

PORT = 8080

JWTPRIVATEKEY = your JWT private key

BASE_URL = forntend base url

SALT = 10

HOST = "smtp.gmail.com"

SERVICE = "gmail"

EMAIL_PORT = "587"

SECURE = "true"

USER = "xyz@gmail.com"  // sender mail address

PASS = "***" // sender mail password