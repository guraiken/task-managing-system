import { prisma } from "../../prisma/prisma"

type CriarTarefaDados = {
  titulo: string
  descricao?: string
  data_vencimento: Date
  prioridade: "Baixa" | "Media" | "Alta"
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
      data_i: new Date(),
      data_v: dados.data_vencimento,
      data_f: dados.data_vencimento,
      prioridade: dados.prioridade,
      nivel_acesso: "A",
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
