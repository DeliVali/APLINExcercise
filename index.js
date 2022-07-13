

const express =require('./node_modules/express/lib/express');

const app=express();

app.listen(3000,()=>{
    console.log('Server on port 3000')  
})

function filtArray(req,res,next){
    var data =JSON.stringify(req.body)
    //get the keys
    const keys = Object.keys(req.body);
    const keystoDelete=[];
    JSON.parse(data, (key, value) => {
        for (let i = 0; i < keys.length; i++) {
        if(key===keys[i]){
           if(value===false || value==='' || Array.isArray(value)){
            keystoDelete.push(keys[i])
            
           }
        }    
        }
      });
      for (let i = 0; i < keystoDelete.length; i++){
            delete req.body[keystoDelete[i]]
      }
    console.log(req.body)
    
    next();
}

function reverseString(str) {
 
    var splitString = str.split("");

 

    var reverseArray = splitString.reverse(); 
 
    var joinArray = reverseArray.join(""); 

    return joinArray; 
}

app.use(express.json());
app.use(filtArray)


app.post('/arrayCheck',(req,res,next) =>{
     
    res.send(req.body);
   
})

app.get('/getString/:str',(req,res) =>{
    console.log(req.params)
    var string = String(req.params.str) 
    
    res.send('Tamaño: '+string.length+'<br/>'+'Valor: '+string+'<br/>'+'Valor al reves: '+ reverseString(string))
   
})

app.get('/',(req,res) =>{
    res.send('1.-Endpoint Route = /arrayCheck <br/> 2.-Endpoint Route = /getString')
   
})