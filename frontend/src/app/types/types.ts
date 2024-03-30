export interface Note {
    id: string
    title: string
    content: string
    is_active: boolean
    category?: Category
}

export interface Category {
    id: string
    name: string
}