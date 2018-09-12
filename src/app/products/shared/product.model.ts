export interface ProductCategory {
    id: number
    name: string
    description: string
}

export interface Product {
    id: number
    name: string
    code: string
    description: string
    barcode: string
    reorderLevel: string
    maximumStock: string
    productCategory: ProductCategory
}