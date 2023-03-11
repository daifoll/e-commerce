import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: ICartState = {
    products: [],
    total: 0,
    totalCount: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProductAction>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id)
            
            
            if (index < 0) {
                state.products.push(action.payload);
                state.total += action.payload.price
                state.totalCount += 1
            }
        },

        incrementQuantityCount: (state, action: PayloadAction<IProductActionCount>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id)
            console.log('increment')
            if (index >= 0) {
                state.products[index].quantity += 1
                state.products[index].totalPrice += state.products[index].price
                state.total += state.products[index].price
                state.totalCount += 1
            }
        },

        decrementQuantityCount: (state, action: PayloadAction<IProductActionCount>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id)

            if (index >= 0) {
                if (state.products[index].quantity !== 0) {
                    
                    state.products[index].quantity -= 1
                    state.products[index].totalPrice -= state.products[index].price

                    state.totalCount -= 1
                    state.total -= state.products[index].price

                }
            }
        },

        deleteProduct: (state, action: PayloadAction<IProductActionDelete>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id)

            if (index >= 0) {
                if(state.products[index].totalPrice === state.products[index].price){
                    state.total -= state.products[index].price
                }else if(state.products[index].totalPrice > state.products[index].price){
                    state.total -= state.products[index].totalPrice
                }
                state.totalCount -= state.products[index].quantity
                state.products.splice(index, 1)
            }
        }
    }
})


export const { addToCart, incrementQuantityCount, decrementQuantityCount, deleteProduct } = cartSlice.actions

export const selectCartProducts = (state: RootState) => state

export default cartSlice.reducer