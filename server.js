const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT || 3000;
hbs.registerPartials(__dirname +'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));


app.use((req,res,next)=>{
   var now=new Date().toString();
   var log=`${now}:${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log',log+'\n',(err)=>{
       if(err){
           console.log('Unable to append to server log');
       }
   });
    next(); 
});


// app.use((req,res,next)=>{
//     res.render('maintain.hbs');
// });

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    })
});

app.get('/',(req,res)=>{
// res.send('<h1>Hello Express</h1>');
res.render('home.hbs');
});

 
app.get('/about',(req,res)=>{
    res.render('about.hbs');
}); 
 
app.get('/bad',(req,res)=>{
    res.send({
        error: 200,
        body: "Bad request"
    });
});


app.listen(port,()=>console.log(`server running on port ${port}`));
