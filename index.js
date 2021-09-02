const { constants } = require('buffer');
const express = require('express')
const app = express()
const http = require('http').createServer(app);
app.use(express.json());
const PORT = process.env.PORT || 3000
//user =[{id :"",name:"",data:[{id:"",message:"",time:""}]}]
let user=[
        {username:"munal",password:"123",status:"offline"},
        {username:"sahil",password:"123",status:"offline"}
        ];

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.set('view engine','ejs')
app.get('/', (req, res) => {
   //res.sendFile(__dirname + '/index.html')
    res.render("login")
  // res.redirect('demo') 
})

app.get('/loginCheck', (req, res) => {

    //res.redirect('demo') 
     console.log(req.query)
    let username = req.query.username;
    let password = req.query.password;
    user.forEach(ele=>{
        if(username== ele.username && password==ele.password){
            ele.status ="online";
            res.render('demo',{current_user:ele.username});
        } 
    })
   
   // res.send(`Username: ${username} Password: ${password}`);
   
 }) 

app.get('/demo', (req, res) => {
    res.render('demo',{user:1})
})


// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    console.log('socketId'+socket.id)
    //let socketid = socket.id
    //user.push({id:socket.id,message:[]})
    //io.to(socketid).emit('message', 'for your eyes only');
    socket.on('new-user',name=>{
        user.some(ele=>{ele})
        user[socket.id] = name
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
})
