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

// Редьюсер добавляемый redux-presist
declare interface cartReducer {
    products: IProductAction[];
    total: number;
    totalCount: number;
}
// initialState для cartSlice
declare interface ICartState {
    products: IProductAction[];
    cartReducer: cartReducer,
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

// SearchMarkup
declare interface ISearchMarkUp {
    product: IProduct;
    // hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>): void;
    // handleClickDeleteProduct(product: IProductActionDelete): void;
    // handleClickAddToCart({ id, title, price, totalPrice, image, quantity }: IProductAction): void;
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

// Sort
declare interface ISort {
    route: string;
}

// ErrorFetch
declare interface IErrorFetch {
    error: string
}

// Картинки продукта
declare type IImageProduct = string[]