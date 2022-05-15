export interface IProductModel {
    category: string;
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    saved: boolean;
    rating: {
        count: number,
        rate: number
    }
}