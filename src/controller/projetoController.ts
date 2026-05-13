import type { Projeto } from "../prisma/generated/client";
import { projetoServices, type ProjetoServices } from "../services/projetoServices";
import type { Response, Request } from "express"




export class ProjetoController {

    constructor(private readonly service: ProjetoServices) {
        this.service

    }

    async buscar(req: Request, res: Response) {


        try {
            const busca = await this.service.buscar()


            return res.status(200).json(busca)

        } catch (error) {

            console.log(error)

            return res.status(500).json({ error })

        }

    }

    async buscarPorId(req: Request, res: Response) {

        const { id } = req.params

        try {
            const busca = await this.service.buscarId(Number(id))


            return res.status(200).json(busca)

        } catch (error) {

            console.log(error)

            return res.status(500).json({ error })

        }
    }


    async criar(req: Request, res: Response) {

        const dadosProjeto: Omit<Projeto,"id"> = req.body

        const {id} = req.params

        try {
            const criar = await this.service.criar(dadosProjeto,Number(id))


            return res.status(201).json(criar)

        } catch (error) {

            console.log(error)

            return res.status(500).json({ error })

        }
    }

        async deletar(req: Request, res: Response) {

            const {id} = req.params

        try {

            const deletar = await this.service.deletar(Number(id))

            return  res.status(201).json(deletar)
            
        } catch (error) {
             console.log(error)

            return res.status(500).json({ error })
            
        }

       
     

    }

    async atualizar(req: Request, res: Response) {

        const dadosProjeto: Omit<Projeto,"id"> = req.body

        const {id}=req.params


        try {

            const atualizar = await this.service.atualizar({...dadosProjeto,id:Number(id)})


            return  res.status(201).json(atualizar)
            
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error })
            
        }


        


    }



}

export const projetoController = new ProjetoController(projetoServices)




