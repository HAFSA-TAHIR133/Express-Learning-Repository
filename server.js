import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); 

// static files access
app.use(express.static('frontend'));

// build-in middleware for post
app.use(express.json());

// 1. Basic Logger Middleware
// Create a middleware that runs on every request
// It should:
// print request method (GET, etc.)
// print request URL

// 👉 Goal: understand how middleware runs before routes
app.use((req,res,next)=>{
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
});
let students=[
    {id:1,name:'Hafsa'},
    {id:2,name:'Hamna'}
]

app.get('/student',(req,res)=>{
    
    res.status(200).json(students);
});

// POST
// POST /student
// ➡️ Add a new student.
app.post('/student',(req,res)=>{
    console.log("added a new record");
    const newStudent ={
        id:students.length+1,
        name:req.body.name
    }
    students.push(newStudent);
    res.status(201).json(newStudent);

});

// 1. Basic Request & Response Task
// Create a route /welcome
// When user hits it, return a simple message like:
// “Welcome to the server”
app.get('/welcome',(req,res)=>{
    res.send("Welcome to the server.");
});

// 2. JSON Response Practice
// Create a route /profile
// Send a JSON response containing:
// name
// age
// city
// Try adding one more field like hobby
app.get('/profile',(req,res)=>{
    res.json(
        [
            {id:1,name:'Hafsa',age:20,city:'Sadiqabad',hobby:'Gamming'}
        ]
    );
});

// 3. Route Params Task (Very Important)
// Create a route /student/:id
// Test it with different IDs:
// /student/1
// /student/50
// Your task:
// Return the ID in response
// Then think: what happens if you pass text instead of number?
app.get('/student/:id',(req,res)=>{
    const ID = parseInt(req.params.id);
    res.json({id:ID});

});

// 4. Multiple Route Params Task
// Create a route:
// /course/:courseName/:level
// Test with:
// /course/web-development/beginner
// /course/database/intermediate
// Return both values in response
app.get('/course/:courseName/:level',(req,res)=>{
    const {courseName,level} = req.params;
  
    console.log("read data");
    res.json(
        
        {CourseName:courseName.toUpperCase(),
            Level:level}
    )
});

// 5. Query Parameters Task
// Create a route /search
// Try passing query like:
// ?name=phone
// ?price=1000
// Task:
// Return both values in response
// Try calling URL without query and see what happens
app.get('/search',(req,res)=>{
    const {phone,price}=req.query;
    res.json(
        {recievedPhone:phone,
            recievedPrice:price
        }
    )
});

// Combined Task (Important Question)
// Create a route:
// /product/:id
// Add query parameters:
// ?color=red&size=large
// Your task:
// Extract:
// product id from params
// color and size from query
// Return all in one response
app.get('/product/:id',(req,res)=>{
    const ID= req.params.id;
    const{color,size}=req.query;
    res.json(
        {id:ID,Color:color,Size:size}
    );
});

// MiddelWare - Application Level Middleware
app.use((req,res,next)=>{
    console.log(`Middleware log created: ${req.url}`);
    next();
})
app.get('/item',(req,res)=>{
    res.send("Route after middle ware runs");
});

// specific route middleware
const shopMiddleWare = (req,res,next)=>{
    console.log(`Middleware specific for the Route: ${req.url}`);
    next();
};
app.get('/shop',shopMiddleWare,(req,res)=>{
    res.send("Shop Route");
});


// Middleware error
app.get('/error',(req,res,next)=>{
    const err = new Error("Error created");
    next(err);
});

// Middleware error handle
app.use((err,req,res,next)=>{
    res.status(500).json({
        success:false,
        message:err.message
    });
});


// 5. Fake Authentication Middleware
// Create a middleware that checks a fake condition:

// 👉 Example logic idea:
// if user is "loggedIn = true" → allow
// else → block
// Apply it only on /dashboard

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

// 9. Multiple Error Routes
// Create 3 routes:
// /error1
// /error2
// /error3
// 👉 Each route should throw a different error message

// Goal:
// same error middleware should handle all
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


app.listen(8000,()=>{
    console.log("Server started!")
});


