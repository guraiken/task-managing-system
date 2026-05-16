import {
  buscarProjeto,
  buscarUsuario,
  criarTarefa,
  
} from "../Repository/tarefas.repository"

type Prioridade = "Baixa" | "Media" | "Alta"

type CriarTarefaDados = {
  titulo?: string
  descricao?: string
  data_vencimento?: string
  prioridade?: Prioridade
  projetoId?: number
  donoId?: number
  responsavelId?: number
  usuarioIds?: number[]
}


export async function criarTarefaService(dados: CriarTarefaDados) {
  if (!dados.titulo?.trim()) {
    throw new Error("Titulo da tarefa e obrigatorio")
  }

  if (!dados.data_vencimento) {
    throw new Error("Data de vencimento da tarefa e obrigatoria")
  }

  if (!dados.prioridade || !["Baixa", "Media", "Alta"].includes(dados.prioridade)) {
    throw new Error("Prioridade deve ser Baixa, Media ou Alta")
  }

  const projetoId = dados.projetoId

  if (!projetoId || projetoId <= 0) {
    throw new Error("Projeto da tarefa e obrigatorio")
  }

  const donoId = dados.donoId

  if (!donoId || donoId <= 0) {
    throw new Error("Dono da tarefa e obrigatorio")
  }

  const responsavelId = dados.responsavelId

  if (!responsavelId || responsavelId <= 0) {
    throw new Error("Responsavel da tarefa e obrigatorio")
  }

  if (!Array.isArray(dados.usuarioIds) || dados.usuarioIds.length === 0) {
    throw new Error("Informe pelo menos um usuario vinculado a tarefa")
  }

  const usuarioIds = [...new Set(dados.usuarioIds)]

  if (!usuarioIds.every((usuarioId) => usuarioId > 0)) {
    throw new Error("Ids dos usuarios vinculados devem ser validos")
  }

  const dataVencimento = new Date(dados.data_vencimento)

  if (Number.isNaN(dataVencimento.getTime())) {
    throw new Error("Data de vencimento invalida")
  }

  const projeto = await buscarProjeto(projetoId)

  if (!projeto) {
    throw new Error("Projeto informado nao existe")
  }

  const usuariosParaValidar = [...new Set([donoId, responsavelId, ...usuarioIds])]
  const usuarios = await buscarUsuario(usuariosParaValidar)

  if (usuarios.length !== usuariosParaValidar.length) {
    const usuariosEncontrados = usuarios.map((usuario) => usuario.id)
    const usuariosNaoEncontrados = usuariosParaValidar.filter((usuarioId) => !usuariosEncontrados.includes(usuarioId))

    throw new Error(`Usuarios nao encontrados: ${usuariosNaoEncontrados.join(", ")}`)
  }

  const dadosTarefa = {
    titulo: dados.titulo.trim(),
    data_vencimento: dataVencimento,
    prioridade: dados.prioridade,
    projetoId,
    donoId,
    responsavelId,
    usuarioIds,
    ...(dados.descricao ? { descricao: dados.descricao } : {}),
  }

  return criarTarefa(dadosTarefa)
}
