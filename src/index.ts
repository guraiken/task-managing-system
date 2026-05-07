// src/index.ts
import express from 'express';
import cors from "cors"
import tarefasRoutes from "./modules/Routes/tarefas.routes"

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.use("/tarefas", tarefasRoutes)

app.get("/",()=>{
    console.log("Olá mundo")
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
