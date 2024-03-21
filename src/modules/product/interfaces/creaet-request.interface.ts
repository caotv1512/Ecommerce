export interface CreateProductRequest {
    name: string;
    description: string;
    price: number | string;
    quantity: number | string;
    imageUrl: string;
    categoryId: number | string;
}