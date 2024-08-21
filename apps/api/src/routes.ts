import { Express,Request, Response } from "express";
import { deleteProductHandler, getProductsHandler, getSingleProductsHandler, postProductsHandler, putProductsHandler } from "./routes/products/products.controller";
import { deleteBrandHandler, getBrandHandler, getSingleBrandHandler, postBrandHandler, putBrandHandler } from "./routes/brands/brands.controller";
import { postReviewsHandler,putReviewHandler,deleteReviewHandler,getReviewsProductHandler,getReviewsUserHandler} from "./routes/reviews/reviews.controller";
import { deleteCartHandler, getCartHandler, getSingleCartHandler, postCartHandler, putCartHandler } from "./routes/cart/cart.controller";

function routes(app:Express){
    /**@Products */
    app.post("/products",postProductsHandler)
    
    app.get("/products",getProductsHandler);

    app.get("/products/:id",getSingleProductsHandler)
    
    app.put("/products/:id",putProductsHandler)
    
    app.delete("/products/:id",deleteProductHandler)

        /**
     * @BRAND ROUTE
     */
    app.get("/brands",getBrandHandler)

    app.post("/brands",postBrandHandler)

    app.put("/brands",putBrandHandler)

    app.delete("/brands",deleteBrandHandler)

    app.get("/brands/:id",getSingleBrandHandler)
    
    /**
     * @Review Routes
     */
    app.post("/reviews",postReviewsHandler)
    
    app.get("/reviews/product/:productId",getReviewsProductHandler);

    app.get("/reviews/user/:userId",getReviewsUserHandler);

    app.delete("/reviews/:id",deleteReviewHandler)

        
    app.put("/reviews/:id",putReviewHandler)
   
    /**
     * @Shopping Cart Routes
     */
    app.post("/cart",postCartHandler)


    app.get("/cart",getCartHandler)

    app.put("/cart",putCartHandler)

    app.delete("/cart",deleteCartHandler)

    app.get("/cart/:id",getSingleCartHandler)
    
    
    
    
    
    
    /**
     * @POST /users/register: Register a new user.
    Usage: When a new user signs up on the website.
    Payload: { username, email, password, firstName, lastName, phoneNumber, address }
    */
    //app.post("/users/register",postUsersHandler)
    
    /** 
     * @POST /users/login: Authenticate an existing user.

    Usage: When a user tries to log in.
    Payload: { email, password }
    */
   // app.post("/users/login",postLoginHandler)
    
    /**
     * 
    @GET /users/:id: Get user details by ID.

    Usage: To retrieve user profile information.
    Parameter: id (User ID)
     */
    // app.get("/users/:id",getUserHandler)

    /**
     * 
    @PUT /users/:id: Update user details.

    Usage: To update user profile information like name, email, address, etc.
    Parameter: id (User ID)
    Payload: { firstName, lastName, phoneNumber, address }
     */
    /**
     * @DELETE /users/:id: Delete a user account.

    Usage: When a user decides to delete their account.
    Parameter: id (User ID)
     */
    // app.delete("/users/:id",deleteUserHandler)

    
    /**
     * @CATEGORY ROUTE
     */

    /**
     * @POST /categories: Create a new category.

    Usage: To add a new category for products.
    Payload: { name, description }
     */
    // app.post("/categories",postCategouriesHandler)

    /**
     * @GET /categories: Retrieve a list of all categories.

    Usage: To display all product categories.
     */
    // app.get("/categories",getCategoriesHandler)


    /**
     * @GET /categories/:id: Get category details by ID.

    Usage: To view a specific category's details.
    Parameter: id (Category ID)
     */
    // app.get("/categories/:id",getSingleCategoriesHandler)


    /**
     * @PUT /categories/:id: Update category details.

    Usage: To modify details of an existing category.
    Parameter: id (Category ID)
    Payload: { name, description }
     */
    // app.put("",putSingleCategoriesHandler)

    /**
     * @DELETE /categories/:id: Delete a category.

    Usage: To remove a category.
    Parameter: id (Category ID)
     */
    // app.delete("/categories/:id",deleteCategoriesHandler)


    /**
     * @Order Routes
     */

    /**
     * @POST /orders: Create a new order.

    Usage: When a user places an order.
    Payload: { userId, items: [{ productId, quantity }], totalAmount, paymentId }
     */

    /**
     * @GET /orders/:id: Get order details by ID.

    Usage: To view a specific order's details.
    Parameter: id (Order ID)
     */

    /**
     * @PUT /orders/:id: Update order status.

    Usage: To modify an order's status (e.g., from pending to shipped).
    Parameter: id (Order ID)
    Payload: { status }
     */

    /**
     * @DELETE /orders/:id: Cancel an order.

    Usage: When a user cancels an order.
    Parameter: id (Order ID)
     */

    

/**
 * @Wishlist Routes
 */

    /**
     * @POST /wishlist: Add a product to the user's wishlist.

    Usage: When a user wants to save a product for later.
    Payload: { userId, productId }
     */

    /**
     * @GET /wishlist/user/:userId: Get all wishlist items for a user.

    Usage: To view all products in a user's wishlist.
    Parameter: userId (User ID)
     */

    /**
     * @DELETE /wishlist/:id: Remove a product from the wishlist.

    Usage: When a user removes an item from their wishlist.
    Parameter: id (Wishlist ID)
     */


    /**
     * @Payment Routes
     */

     /**
     * @POST /payments: Process a payment for an order.

    Usage: When a user completes a purchase.
    Payload: { orderId, amount, method }
     */

    /**
     * @GET /payments/:id: Get payment details by ID.

    Usage: To view a specific payment's details.
    Parameter: id (Payment ID)
     */


    /**
     * @SHIPPING ROUTE
     */

    /**
     * @POST /shipping: Create shipping details for an order.

    Usage: When an order is being prepared for shipping.
    Payload: { orderId, address, city, state, postalCode, country }
     */

    /**
     * @GET /shipping/order/:orderId: Get shipping details for a specific order.

    Usage: To track the shipping status of an order.
    Parameter: orderId (Order ID)
     */
    /**@Authentication & Authorization Routes */

    /**
     * @POST /auth/register: Register a new user.

    Usage: When a new user signs up.
    Payload: { email, password, username, firstName, lastName }
     */

    /**
     * @POST /auth/login: Log in an existing user.

    Usage: When a user logs in.
    Payload: { email, password }
     */

    /**
     * @POST /auth/logout: Log out the current user.

    Usage: When a user logs out.
    Payload: { userId }
     */


    /**
     * @POST /auth/refresh-token: Refresh the user's authentication token.

    Usage: To renew the user's session.
    Payload: { refreshToken }
     */

    
    app.all('*', (req:Request, res:Response) => {
        res.status(404).json({message:"page not found"})
    });
}
export default routes;