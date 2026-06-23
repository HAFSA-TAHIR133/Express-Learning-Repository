# Express Learning Repository

This repository is created to practice and understand the basics of backend development using **Express.js**.

---

##  Topics Covered

* Creating a Server
* Routing
* Request & Response Objects
* Route Parameters
* Query Parameters
* Middleware
* Error Handling Middleware
* Static Files
* HTTP Methods (GET, POST)
* Status Codes (200, 201, 400, 401, 403, 404, 500)

---

##  Project Structure

```
ExpressLearning/
│
├── server.js
├── routes/
│   └── routes.js
├── middleware/
│   └── errorHandler.js
├── public/
│   └── index.html
└── package.json
```

---

##  Creating a Server

```js
import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

---

##  Routing Example

# Creating the home route
```js
app.get("/home", (req, res) => {
  res.send("Welcome to Home Page");
});
```
<img width="957" height="201" alt="image" src="https://github.com/user-attachments/assets/14266f19-749c-46b2-afdf-af76b9bca91b" />

# Creating the student route
```js
app.get('/student',(req,res)=>{
    
    res.status(200).json(students);
});
```

<img width="960" height="160" alt="image" src="https://github.com/user-attachments/assets/914de824-b0e7-4611-85e0-5c675c24d043" />

---

##  Request & Response Example

```js
app.get('/profile',(req,res)=>{
    res.json(
        [
            {id:1,name:'Hafsa',age:20,city:'Sadiqabad',hobby:'Gamming'}
        ]
    );
});
```
---

##  Route Parameters

# Getting the student ID
```js
app.get('/student/:id',(req,res)=>{
    const ID = parseInt(req.params.id);
    res.json({id:ID});

});
```
# Receiving Response in React

<img width="880" height="87" alt="image" src="https://github.com/user-attachments/assets/ced8c220-d473-4c4c-b7d1-a3cea42876e6" />

# Getting the Course Name and Level

```js
app.get('/course/:courseName/:level',(req,res)=>{
    const {courseName,level} = req.params;
  
    console.log("read data");
    res.json(
        
        {CourseName:courseName.toUpperCase(),
            Level:level}
    )
});
```
# Receiving Response in React

<img width="922" height="228" alt="image" src="https://github.com/user-attachments/assets/5efebc1d-aae7-4edf-b322-17ca3177be61" />

---

##  Query Parameters

# Search for phone name and price
```js
app.get('/search',(req,res)=>{
    const {phone,price}=req.query;
    res.json(
        {recievedPhone:phone,
            recievedPrice:price
        }
    )
});
```
# Receiving Response in React

<img width="920" height="218" alt="image" src="https://github.com/user-attachments/assets/f4998473-0bbb-45b9-a330-756990d0ca90" />

# Combined the Query and Route Parameters (Receiving ID s params while color & size as query parameters)

``` js
app.get('/product/:id',(req,res)=>{
    const ID= req.params.id;
    const{color,size}=req.query;
    res.json(
        {id:ID,Color:color,Size:size}
    );
});
```
# Receiving Response in React

<img width="865" height="249" alt="image" src="https://github.com/user-attachments/assets/fa77175f-0134-434d-8135-a430833077dc" />


---

##  Middleware Example - Application Level 

```js
app.use((req,res,next)=>{
    console.log(`Middleware log created: ${req.url}`);
    next();
})
app.get('/item',(req,res)=>{
    res.send("Route after middle ware runs");
});
```

# Output

<img width="954" height="165" alt="image" src="https://github.com/user-attachments/assets/70ff8771-4ccb-4747-90de-b49686321d6b" />


##  Middleware Example - specific route middleware
```js
const shopMiddleWare = (req,res,next)=>{
    console.log(`Middleware specific for the Route: ${req.url}`);
    next();
};
app.get('/shop',shopMiddleWare,(req,res)=>{
    res.send("Shop Route");
});
```

# Output

<img width="960" height="226" alt="image" src="https://github.com/user-attachments/assets/62db65ae-c650-4c0f-8eaf-bfa638525281" />

---

##  Error Handling Middleware

# Create Error
```js
app.get('/error',(req,res,next)=>{
    const err = new Error("Error created");
    next(err);
});
```
# Handle Error
```js
app.use((err,req,res,next)=>{
    res.status(500).json({
        success:false,
        message:err.message
    });
});
```

# Output

<img width="955" height="209" alt="image" src="https://github.com/user-attachments/assets/1ad25ab6-d705-4360-9c2e-28b6da0dd651" />


# Create Fake Authentication Middleware

```js
const checkAuthenticate = (req,res,next)=>{
    const isLoggedIn = req.query.loggedIn;
    if(isLoggedIn === 'true'){
        console.log("Access granted");
        next();
    }
    else{
        console.log("Access denied.");
         res.status(401).json({ message: "Access denied. Please log in." }); 
    }
    
};
app.get('/dashboard',checkAuthenticate,(req,res)=>{
    res.json({
        message:'Welcome to our system.'
    });
});
```

# Output

<img width="956" height="144" alt="image" src="https://github.com/user-attachments/assets/065b7546-cf30-4415-8540-b20767a88d06" />

# Multiple Error Routes handle with single Middleware

```js
app.get('/error1',(req,res,next)=>{
    const err = new Error("error 1 created");
    err.status=400;
    next(err);
});

app.get('/error2',(req,res,next)=>{
    const err = new Error("error 2 created");
    err.status=402;
    next(err);
});

app.get('/error3',(req,res,next)=>{
    const err = new Error("error 3 created");
    err.status=404;
    next(err);
});

app.use((err,req,res,next)=>{
    console.log('central error handler');
    const ErrorFound = err.status || 500;
    res.status(ErrorFound).json({
        success:false,
        errorMessage:err.message,
        errorStatus:ErrorFound

    });

});
```
# Output

* Error Route 3
<img width="957" height="133" alt="image" src="https://github.com/user-attachments/assets/528a65c8-235f-431e-a92c-d23b265d546f" />
* Error Route 2
<img width="954" height="157" alt="image" src="https://github.com/user-attachments/assets/7f2f3f1d-ef07-495f-bba2-44cfd0a76cc6" />
* Error Route 1
<img width="954" height="118" alt="image" src="https://github.com/user-attachments/assets/8767fc21-f586-4c6a-984f-22e582340471" />



---

##  Static Files

```js
app.use(express.static('frontend'));
```

# Output

<img width="960" height="348" alt="image" src="https://github.com/user-attachments/assets/46b5dde8-93aa-404e-bab3-c5c55d7ed106" />


---

##  REST API (GET & POST)

### GET Request

```js
app.use((req,res,next)=>{
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
});
```

# Output
* Display the method and url of the route get executed

<img width="373" height="70" alt="image" src="https://github.com/user-attachments/assets/07ef1293-428d-4b81-ba9d-d66d163dec3a" />

# Get Method
* It's already show above...

---

### POST Request (Simple Practice Only)

This is a basic POST request just to understand how data is sent to the server.

```js
app.post('/student',(req,res)=>{
    console.log("added a new record");
    const newStudent ={
        id:students.length+1,
        name:req.body.name
    }
    students.push(newStudent);
    res.status(201).json(newStudent);

});
```

# Output

* Send Data from the React
<img width="907" height="60" alt="image" src="https://github.com/user-attachments/assets/43030a1f-8515-4896-9956-6486223090a0" />

* After receiving new student, the student array append the new record using the POST methid and send response back to frontend
<img width="864" height="124" alt="image" src="https://github.com/user-attachments/assets/e1087816-c244-4bfc-9a87-7dd7a355fcf4" />
* Updating array API
<img width="960" height="143" alt="image" src="https://github.com/user-attachments/assets/36c90179-53bf-49e0-9418-4432331cf77a" />

---

##  HTTP Status Codes Used

* `200` → OK
* `201` → Created
* `400` → Bad Request
* `401` → Unauthorized
* `403` → Forbidden
* `404` → Not Found
* `500` → Server Error

