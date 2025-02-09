import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch';


const app = express();
const PORT = 2000;

app.use(cors());


app.get('/api/data' , async(req , res)=>{
    try {
        const Fetchapi = await fetch("https://api.jsonserve.com/Uw5CrX")
        const data = await Fetchapi.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" })
    }
})

app.listen(PORT , ()=>{
    console.log(`Server Started ${PORT}`)
})