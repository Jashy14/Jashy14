const express = require('express');
const app = express();
const cors = require('cors');   
const port = 3001 ;

app.use(cors());
app.use(express.json());
app.use((req,res,next) =>{
    console.log(req.method);
    next();
})
let notes = [
    {
        'id':1,
        'content':'asdasdasdasd',
        'import': true,
    },{
        'id':2,
        'content':'asdasdasdasd212201',
        'import': false,
    },{
        'id':3,
        'content':'asdasdasdasd000',
        'import': true,
    }
];
app.get('/',(req,res)=>{
    res.send('Hello world');
});
app.get('/api/notes',(req,res)=>{
    res.json(notes);
});
app.get('/api/notes/:id',(req,res)=>{
    const id = Number(req.params.id);
    let findNote = notes.find(note => note.id == id);
    findNote ? res.json(findNote) : res.status(404).end(); 
});
app.delete('/api/notes/:id',(req,res)=>{
    const id = Number(req.params.id);
    let delNote = notes.filter(note => note.id != id);
    res.json(delNote);
    res.status(204).end();  
});
app.post('/api/notes',(req,res)=>{
    const note = req.body;
    if(!note || !note.content){
        return res.status(404).json({
            error:'note.content is missing'
        });
    }
    const ids  = notes.map(note => note.id);
    const maxId = Math.max(...ids);
    const newNote = {
        id:maxId+1,
        content: note.content,
        import: typeof note.import !== undefined ? note.import : false,
        date: new Date().toISOString(),
    };
    notes = [...notes , newNote];

    res.json(newNote);
});
app.use((req,res)=>{
    res.status(404).json({
        error:"not found"
    })
})
app.listen(port,()=> console.log('Se levanto el servidor'));