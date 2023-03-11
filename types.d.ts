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

// Общий макет (Layout)
declare interface ILayout {
    children?: ReactNode;
    categories?: ICategory[] 
}

// Футер
declare interface IFooterProps {
    children?: ReactNode;
    categories: ICategory[];
}

// Форма поиска
declare interface ISearchForm {
    handleSubmitSearch(event: FormEvent): void
}

// initialState для cartSlice
declare interface ICartState {
    products: IProductAction[];
    total: number;
    totalCount: number;
}

// Action (redux) продукт
declare interface IProductAction {
    id: number;
    title: string;
    price: number;
    totalPrice: number;
    image: string;
    quantity: number;
    inCart: boolean;
}

// Action (redux) для функций увлеичения и уменьшения кол-ва товара
declare interface IProductActionCount {
    id: number;
}

// Action (redux) для удаления товара
declare interface IProductActionDelete {
    id: number;
}
// Action (redux) для получения totalPrice
declare interface IProductActionGetTotalPrice {
    id: number;
}

// Картинки продукта
declare type IImageProduct = string[]