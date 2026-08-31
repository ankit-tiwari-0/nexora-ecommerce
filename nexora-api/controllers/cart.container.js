export const addcart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItem.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItem.push(productId)
        }
        await user.save();
        res.json(user.cartItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getcartproduct = async (req, res) => {

}
export const removeAllFromcart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter(
                (item) => item.id !== productId
            );
        }

        await user.save();

        res.json(user.cartItems);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}
export const updatequantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(
            (item) => item.id === productId
        );

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(
                    (item) => item.id !== productId
                );

                await user.save();
                return res.json(user.cartItems);
            }

            existingItem.quantity = quantity;

            await user.save();

            return res.json(user.cartItems);

        } else {
            return res.status(404).json({
                message: "Product not found"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}