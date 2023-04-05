# E-Commerce (интернет-магазин).
Pet-проект представляет собой интернет-магазин с возможностью поиска товара, сортировки, добавления/удаления из корзины и проведения тестовой оплаты.

**[Открыть проект](https://e-commerce-daifoll.vercel.app)**

## Screenshots
![e-commerce-daifoll vercel app_ (1)](https://user-images.githubusercontent.com/54538084/230066089-c1dfc63a-66cd-4619-adfe-3b538b08f790.png)


### Рекомендация перед ознакомлением с проектом:

**Для проверки оплаты можно использовать тестовые карты предоставляемые Stripe, например**:

Номер карты: *4242 4242 4242 4242*

CVC: *Любые три цифры*

Дата: *Любая будущая дата*

Подробнее про тестовые карты на сайте <a href="https://stripe.com/docs/testing#cards" target="_blank">Stripe</a>

## Stack
* Next.js
* TypeScript
* Redux (Toolkit)
* Tailwind
* Stripe

## Getting Started

### Clone Repository
`git clone https://github.com/daifoll/e-commerce.git`

### Add .env.local file to root directory
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```
### Development
`npm run dev`

### Testing
`npm run lint`

### Build
`npm run build`


