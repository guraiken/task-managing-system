// src/index.ts
import express from 'express';
import cors from "cors"
import { projetoRoutes } from './routes/projetoRoutes';

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.get("/",()=>{
    console.log("Olá mundo")
})

app.use(projetoRoutes)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});