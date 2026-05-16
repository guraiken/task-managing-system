import express from "express"
import cors from "cors"
import { auth } from "./middleware/auth"
import tarefasRoutes from "./modules/Routes/tarefas.routes"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (_, response) => {
  return response.json({ message: "API de tarefas rodando" })
})

app.use(auth)
app.use("/tarefas", tarefasRoutes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
