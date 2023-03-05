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

// Картинки продукта
declare type IImageProduct = string[]