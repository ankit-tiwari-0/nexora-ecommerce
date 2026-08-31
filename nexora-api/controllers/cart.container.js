export const addcart = async(req,res)=>{
   try {
      const {productId} = req.body;
      const user = req.user;
    
      const existingItem = user.cartItem.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else{
        user.cartItem.push(productId)
      }
      await user.save();
          res.json(user.cartItem)
   } catch (error) {
        res.status(500).json({message: error.message})
   } 
}
export const getcartproduct = async(req,res)=>{

}
export const removeAllFromcart = async(req,res)=>{

}
export const updatequantity = async(req,res)=>{

}