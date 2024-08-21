import { Request, Response } from "express";

  /**
     * @POST /reviews: Create a new review.

    Usage: When a user writes a review for a product.
    Payload: { productId, userId, rating, comment }
     */
 function postReviewsHandler(req:Request,res:Response){
    return res.json({message:"postReviewsHandler"})

};
 /**
     * @GET /reviews/product/:productId: Get all reviews for a specific product.

    Usage: To display all reviews for a particular product.
    Parameter: productId (Product ID)
     */
 function getReviewsProductHandler(req:Request,res:Response){
    return res.json({message:"getManyReviews"})

};
    /**
     * @GET /reviews/user/:userId: Get all reviews written by a specific user.

    Usage: To view all reviews made by a specific user.
    Parameter: userId (User ID)
     */
 function getReviewsUserHandler(req:Request,res:Response){
    return res.json({message:"getSingleReviewsHandler"})

};

 function putReviewHandler(req:Request,res:Response){
    return res.json({message:"putReviewsHandler"})

};
    /**
     * @DELETE /reviews/:id: Delete a review.

    Usage: When a user or admin deletes a review.
    Parameter: id (Review ID)
     */
 function deleteReviewHandler(req:Request,res:Response){
    return res.json({message:"deleteProductHandler"})

};
export {postReviewsHandler,
    getReviewsProductHandler,
    getReviewsUserHandler,
    putReviewHandler,
    deleteReviewHandler}