import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: ICartState = {
    products: [],
    total: 0
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
            }
        }
    }
})


export const { addToCart } = cartSlice.actions

export const selectCartProducts = (state: RootState) => state

export default cartSlice.reducer