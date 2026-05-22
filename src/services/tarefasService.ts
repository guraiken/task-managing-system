import { buscarProjeto, buscarUsuario, criarTarefa  } from "../repositories/tarefasRepository"


export class ErroValidacaoTarefa extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ErroValidacaoTarefa"
  }
}

type CriarTarefaDados = {
  titulo?: string
  descricao?: string
  data_f?: string
  prioridade: "BAIXA" | "MEDIA" | "ALTA"
  projetoId?: number
  donoId: number
  responsavelId: number
  usuarioIds: number[]
}


export async function criarTarefaService(dados: CriarTarefaDados) {
  if (!dados.titulo?.trim()) {
    throw new ErroValidacaoTarefa("Titulo da tarefa e obrigatorio")
  }

  if (!dados.data_f) {
    throw new ErroValidacaoTarefa("Data final da tarefa e obrigatoria")
  }

  const dataFinal = new Date(dados.data_f)

  if (Number.isNaN(dataFinal.getTime())) {
    throw new ErroValidacaoTarefa("Data final invalida")
  }

  const dataInicial = new Date()
  const diaFinal = new Date(dataFinal.getFullYear(), dataFinal.getMonth(), dataFinal.getDate())
  const diaInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate())
  console.log(diaInicial)
  console.log(diaFinal)

  if (diaFinal < diaInicial) {
    throw new ErroValidacaoTarefa("Data final nao pode ser anterior a data inicial")
  }

  const prioridadesValidas = ["BAIXA", "MEDIA", "ALTA"]

  if (!prioridadesValidas.includes(dados.prioridade)) {
    throw new ErroValidacaoTarefa("Prioridade invalida")
  }

  const projetoId = dados.projetoId

  if (typeof projetoId !== "number" || !Number.isInteger(projetoId) || projetoId <= 0) {
    throw new ErroValidacaoTarefa("Projeto da tarefa e obrigatorio")
  }

  const donoId = dados.donoId

  if (!Number.isInteger(donoId) || donoId <= 0) {
    throw new ErroValidacaoTarefa("Dono da tarefa e obrigatorio")
  }

  const responsavelId = dados.responsavelId

  if (!Number.isInteger(responsavelId) || responsavelId <= 0) {
    throw new ErroValidacaoTarefa("Responsavel da tarefa e obrigatorio")
  }

  if (!Array.isArray(dados.usuarioIds) || dados.usuarioIds.length === 0) {
    throw new ErroValidacaoTarefa("Informe pelo menos um usuario vinculado a tarefa")
  }

  const usuarioIds = Array.from(new Set(dados.usuarioIds))

  if (!usuarioIds.every((usuarioId) => Number.isInteger(usuarioId) && usuarioId > 0)) {
    throw new ErroValidacaoTarefa("Ids dos usuarios vinculados devem ser validos")
  }

  const projeto = await buscarProjeto(projetoId)

  if (!projeto) {
    throw new ErroValidacaoTarefa("Projeto informado nao existe")
  }

  const usuariosParaValidar = Array.from(new Set([donoId, responsavelId, ...usuarioIds]))
  const usuarios = await buscarUsuario(usuariosParaValidar)

  if (usuarios.length !== usuariosParaValidar.length) {
    const usuariosEncontrados = usuarios.map((usuario) => usuario.id)
    const usuariosNaoEncontrados = usuariosParaValidar.filter((usuarioId) => !usuariosEncontrados.includes(usuarioId))

    throw new ErroValidacaoTarefa(`Usuarios nao encontrados: ${usuariosNaoEncontrados.join(", ")}`)
  }

  const descricao = dados.descricao?.trim()

  const dadosTarefa = {
    titulo: dados.titulo.trim(),
    data_i: dataInicial,
    data_f: dataFinal,
    prioridade: dados.prioridade,
    projetoId,
    donoId,
    responsavelId,
    usuarioIds,
    ...(descricao ? { descricao } : {}),
  }

  return criarTarefa(dadosTarefa)
}