import { base } from "./base"

export type postForm = {
    tipo: string
    conteudo: string
    usuario_id: number
    reacao_gostei: number | 0
    reacao_nao_gostei: number | 0
    qtd_comentarios: number | 0
    qt_compartilhamentos: number | 0
} & base

export type postDTO = {
    tipo: string
    conteudo: string
    usuario_id: number
    reacao_gostei: number
    reacao_nao_gostei: number
    qtd_comentarios: number
    qt_compartilhamentos: number
} & base

export type postListDTO = {
    quantidade_postagens: number
    listaPostagens: Array<postDTO>
}

export type postFilterDTO = {
    usuario: string | number
    tamanhoPagina: number
    numeroPagina: number
}

export type feedFilterDTO = {
    profile_id?: number
    id: string | number
    tamanhoPagina: number
    numeroPagina: number
}

export type responsePostFilterDTO = {
    pagina: number
    numeroPaginas: number
} & postListDTO

export type liksList = {
    id: number
    liked: boolean
    total_reactions: number
    total_replies : number
}

export type postView = {

    id: number
    parent_id ?: number
    tipo: string
    conteudo: string
    usuario_id: number
    data_criacao: string
    data_modificao: string
    total_replies: number
    total_reactions: number

}

export type createPostForm = {
    conteudo : string
    usuario_id : number
    tipo : string
    parent_id ?: number
}

export type getPostDTO = {
    id : number
    profile_id ?: number
}