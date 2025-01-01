import { createSlice, Reducer } from "@reduxjs/toolkit";
export type CategoryType =
    "CLOTHING"|        // For apparel such as shirts, trousers, dresses, etc.
    "FOOTWEAR"|        // For shoes, sandals, sneakers, etc.
    "ACCESSORY"|       // For belts, hats, scarves, etc.
    "BAG"|             // For handbags, backpacks, luggage, etc.
    "WATCH"|           // For watches and timepieces
    "UNDERWEAR"|       // For undergarments, lingerie, etc.
    "OUTERWEAR"      // For jackets, coats, and other outerwear
    // "JEWELLERY"|       // For rings, necklaces, bracelets, etc.
    // "SUNGLASSES"|      // For eyewear, including sunglasses
    // "SPORTSWEAR"|      // For athletic clothing, gym wear, etc.
    // "SWIMWEAR"|        // For swimsuits, bikinis, etc.
    // "SUIT"|            // For formal suits, blazers, etc.
    // "SLEEPWEAR"|       // For pajamas, nightgowns, etc.
    // "COSTUME"|         // For costumes, fancy dress, etc.
    // "LOUNGEWEAR"|      // For comfortable, casual wear typically worn at home
    // "MATERNITY"|       // For maternity wear
    // "LEATHER_GOODS"  // For wallets, belts, and other leather accessories
  
  
interface CartItem {
    id:number;
    type:CategoryType;
    image:string;
    name:string;
    price:number;
    prevPrice:number;
    description?:string;
    brand?:{id:number,name:string};
    quantity:number|0;
  };
  interface CartState{
    total:number;
    cartItem:CartItem[]
  }
const initialState:CartState={total:0,cartItem:[]};
const cart=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const itemInCart = state.cartItem.findIndex((item) => item.id === action.payload.id);
        
            if (itemInCart !== -1) {
                // TypeScript still complains, so explicitly handle the possibility
                const existingItem = state.cartItem[itemInCart];
                if (existingItem) {
                    existingItem.quantity += 1;
                    state.total += 1;
                }
            } else {
                // Item not found, add to cart
                state.cartItem.push({ ...action.payload, quantity: 1 });
                state.total += 1;
            }
        },
        removeItem: (state, action) => {
            const removeItem=state.cartItem.find(item=>item.id==action.payload);
            if(removeItem){
                state.cartItem.filter(item=>item===removeItem)
                state.total=state.total-removeItem.quantity
            }
        },
        deleteItem: (state, action) => {
            const removeitem = state.cartItem.find((item) => item.id === action.payload);
            if (removeitem) {
            state.cartItem.filter(item=>item===removeitem)
            } 
          },
    }
})
export const { addToCart,deleteItem,removeItem } = cart.actions;
export default cart.reducer as Reducer<CartState>;
