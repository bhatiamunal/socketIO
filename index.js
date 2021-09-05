const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const http = require('http').createServer(app);
app.use(express.json());
const PORT = process.env.PORT || 3000
//user =[{id :"",name:"",data:[{id:"",message:"",time:""}]}]
let user=[
        {id:1,username:"munal",password:"123",status:"offline"},
        {id:2,username:"sahil",password:"123",status:"offline"}
        ];
        app.use(bodyParser.urlencoded({
            extended:true
        }));
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
function loginCheck(username,password){
    // let username = username;
    // let password = password;
   
    return user.filter(ele=>{
        return username== ele.username && password==ele.password
    })
}
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.set('view engine','ejs')
let message = "Please Enter Username and Password"
app.get('/', (req, res) => {
   //res.sendFile(__dirname + '/index.html')
    res.render("login",{msg:message})
  // res.redirect('demo') 
})

app.post('/loginCheck', (req, res) => {

    //res.redirect('demo') 
    //  console.log(req.body)
    //  if(loginCheck(req.body.username,req.body.password)){
    //     res.render('demo',{current_user:ele.username});
    //  }
    //  else {
    //     res.redirect('/')
    //  }
   
   // res.send(`Username: ${username} Password: ${password}`);
   let activeUser  = loginCheck(req.body.username,req.body.password);
   if(activeUser.length>0){
        res.render('demo',{current_user:activeUser[0].username});
   }
   else {
    message = "Username or Password is wrong" 
    res.redirect('/')
   }
 }) 

app.get('/demo', (req, res) => {
    res.render('demo',{user:1})
})


// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    // console.log('Connected...')
    // console.log('socketId'+socket.id)
    //let socketid = socket.id
    //user.push({id:socket.id,message:[]})
    //io.to(socketid).emit('message', 'for your eyes only');
    socket.on('new-user',name=>{
        // user.some(ele=>{ele})
        // user[socket.id] = name
        console.log(user)
        //socket.broadcast.emit("user-joined",name)
        // console.log("new user", name)
        // user.push(socket.id)
         
    })
    socket.on('message', msg => {
        // user.push(msg)     
        // console.log(user)  
        //socket.broadcast.emit('message', msg)
        
        //console.log(msg)
       //socket.broadcast.emit('message',msg)
    })
    socket.on('send',msg=>{
       // console.log("server site",msg,user[socket.id])
       console.log(msg)
        socket.broadcast.emit('recived',{message:msg,name:user[socket.id]})
    })
    socket.on("disconnect", msg => {
        
        socket.broadcast.emit('leave',user[socket.id]);
        delete user[socket.id];
        // console.log(socket.id); // undefined
    });
})
