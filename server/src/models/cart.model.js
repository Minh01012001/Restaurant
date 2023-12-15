import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    item_id: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },

}, {timestamps: true});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;