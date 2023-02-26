// Категория продукта
declare interface ICategory {
    id: number;
    name: string;
    image: string;
}

// Продукт
declare interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: ICategory;
    images: IImageProduct;
}

// Картинки продукта
declare type IImageProduct = string[]