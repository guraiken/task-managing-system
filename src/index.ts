// src/index.ts
import express from 'express';
import cors from "cors"
import { projetoRoutes } from './routes/projetoRoutes';
import { auth } from './middleware/auth';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users'
import genTrfRoutes from './routes/genTrf.Route';
import tarefasRoutes from './routes/tarefas.Route';

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.use(authRouter)
app.use(auth)

app.use("/usuarios", userRouter)

app.use("/projetos",projetoRoutes)
app.use("/tarefas", genTrfRoutes)
app.use("/tarefas", tarefasRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});