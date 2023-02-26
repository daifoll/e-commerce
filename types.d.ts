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

declare interface ILayout {
    children?: ReactNode
    // any props that come into the component
}

// Картинки продукта
declare type IImageProduct = string[]