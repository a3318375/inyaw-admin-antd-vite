export interface RouterType {
    name: string
    path: string
    filePath: string
    children?: RouterType[]
}