import { prisma } from "../prisma/prisma"

type CriarTarefaDados = {
  titulo: string
  descricao?: string
  data_i: Date
  data_f: Date
  prioridade: "BAIXA" | "MEDIA" | "ALTA"
  projetoId: number
  donoId: number
  responsavelId: number
  usuarioIds: number[]
}


export function buscarProjeto(idProjeto: number) {
  return prisma.projeto.findUnique({
    where: {
      id: idProjeto,
    },
    select: {
      id: true,
    },
  })
}

export function buscarUsuario(idsUsuario: number[]) {
  return prisma.usuario.findMany({
    where: {
      id: {
        in: idsUsuario,
      },
    },
    select: {
      id: true,
    },
  })
}


export function criarTarefa(dados: CriarTarefaDados) {
  return prisma.tarefa.create({
    data: {
      titulo_trf: dados.titulo,
      descr: dados.descricao ?? "Pendente",
      data_i: dados.data_i,
      data_f: dados.data_f,
      prioridade: dados.prioridade,
      status: "Andamento",
      projeto: {
        connect: {
          id: dados.projetoId,
        }, 
      },
      dono: {
        connect: {
          id: dados.donoId,
        },
      },
      responsavel: {
        connect: {
          id: dados.responsavelId,
        },
      },
      usuarios: {
        create: dados.usuarioIds.map((usuarioId) => ({
          usuario: {
            connect: {
              id: usuarioId,
            },
          },
        })),
      },
    },
    include: {
      projeto: true,
      dono: true,
      responsavel: true,
      usuarios: {
        include: {
          usuario: true,
        },
      },
    },
  })
}