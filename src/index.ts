// src/index.ts
import express from 'express';
import cors from "cors"
import { projetoRoutes } from './routes/projetoRoutes';
import { auth } from './middleware/auth';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users'

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.use(authRouter)
app.use(auth)

app.use(userRouter)

app.use("/project",projetoRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});