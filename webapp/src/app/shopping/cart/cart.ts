import { FoodItem } from "src/app/food/item-info/food-item";

export interface Cart{
    // cartItems: [{
    //         itemId: string;
    //         foodItem: FoodItem;
    //         quantity?:number;
    // }];
    cartItems:FoodItem[];
    total: number;
};