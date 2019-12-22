# JWT-User-Authentication-System-Using-MEANStack
In this project I have implemented JWT Authentication using MEAN

-- When I was in my college,then I always used to think about how do I implement JWT using all the technologies together,but in google or most of the blogs I did not get much references because in most of the places they are just generating a token and using POSTMAN for sending the request and for a someone who is new to the Node.js it will take very much time to make a complete application.So I decided to implement JWT Authentication using MEAN Stack.

-- I have used Material design for front end which is Angular's UI Component Library. 

**There are two methods of authentication which I have known so far**

- Session Based Authentication

Session Based Authentication is the one in which which the user"s state is stored on the server side.I have implemented session based authentication in my https://github.com/mohitsood5934/User-Authentication-System-in-Node.js this project .You can refer it for the implementation

- Token Based Authentication

Very Popular nowadays is JWT Authentication.It is the one in which a token is generated when the user logs in to the system.After your credentials are verified by the authenticator ,a token is generated which is stored in the local storag.Now whenever you will make request to any route/protected route that token is sent with it.If a token is validated you will accessm that route otherwise you will not be able to access it.


**How a token is generated**

-  We have use npm library jsonwebtoken for implementation of JWT

-  JWT is signed by the user and we can also give expiration time to our token 
 
  ``` router.post("/signin",function(req,res){
          User.findOne({email:req.body.email})
         .exec()
         .then(function(user){
         bcrypt.compare(req.body.password,user.password,function(err,user){
            if(err){
                return res.status(401).json({
                    failed: 'Unauthorized Access' 
                 });
            }
            if(user){
               const JWTtoken = jwt.sign({
                   
                    email: user.email,
                    _id: user._id
                  },
                  'secret',
                   {
                     expiresIn: '2h'
                   });

                   return res.status(200).json({
                     success: 'JWT Successfully generated',
                     token: JWTtoken,
                     user:user
                  });
                  
                   

                
            }
            return res.status(500).json({
                failure:"User not verified!!"

            });

        });
    })
    .catch((err) => console.log(err));
})
```

--  JWT Token genrattion has 3 steps -
  -- Header 
     ```
     {
     "alg":"HS256" //CRYPTOGRAPHY ALGORITHM
     "typ":JWT
     }
     ```
  --  Payload Data
     
  Payload means user information like email id and _id(primary key)
  
  --  And finally we have to sign using payload,secret and our 256 bit token will be generated
  
  
    ```I/P  RSA256 OR HS256(base64urlencoded(header))+base64urlencoded(payload)+secret
     
     O/P   -- JWT TOKEN xxxxxx.yyyyyy.zzzzzz made of header,payload and sign and is less than 200 bytes
           -- Token  can be stored in client side local storage
       
 --  Token can be sent to user as a response,in header or in cookie.Sending back as a response is good practice.
 
 
--   Consider we have a protected route and we want to access it ,then we need to verify the token first like this

```router.get('/protectedRoute',verifyToken,function(req,res){
    var decoded = jwt_decode(req.token);
    console.log(decoded);
    jwt.verify(req.token,'secret',(err,user)=>{
    
    if (err) throw err;
    
    else
 
        res.json({
            message: 'Token Verified',
            user,
            decoded
          
          });
    });
});
```

--  Verify token is a middleware function which will give jwt by extracting it from the Authorization Header

```
//format of token
//Authorization:Bearer<access_token>
//verify token
//It is a middleware function therfore it calls the next to proceed
function verifyToken(req,res,next)
{
	const bearerHeader = req.headers['authorization'];
		if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            //token will be from index position 1
            const bearerToken = bearer[1];
            //set the token
            req.token=bearerToken;
            //Next middleware
            next();
		}
		else
		{
			//forbidden
			res.sendStatus(403);
		}

}
```
-- Route guards are implemented in the routes in angular to protectthe route on client side.
--  This was most of the things related to JWT 
   If you want to understand in depth ,then visit [JWT OFFICIAL SITE](https://jwt.io/introduction/)
            
            
            
            
            
            
            
            
          
  

