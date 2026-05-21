import express from "express"
import cors from "cors"

import tarefasRoutes from "./modules/Router/tarefas.router"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (_, response) => {
  return response.json({ message: "API de tarefas rodando" })
})


app.use("/tarefas", tarefasRoutes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
