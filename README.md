
# Enrollment No: IIT2024077 - Akshat Parmar
## Deployment Details:

### Frontend: https://geekhaven-task2-frontend.vercel.app
### Backend: https://geekhaven-task2-backend.onrender.com


> **Note:**  
> The frontend code uploaded here is **not the final version**.  
> The deployed build contains the **completed frontend**, which I finished after the submission deadline.


# API — Short reference

Base URL examples: `http://localhost:{PORT}` or `https://geekhaven-task2-backend.example.com`

Auth: cookie `SID` (JWT). Checkout responses include `X-Signature` header.

Quick endpoint list (one line each)

- Auth
    - POST /api/signup — body: {firstname, lastname, email, password} → 201
    - POST /api/login — body: {email, password} → sets `SID` cookie
    - GET /api/auth/checkauth — returns user or {}
    - POST /api/logout — clears `SID`

- Products
    - GET /api/products — list (query: page, limit, category, subcategory)
    - GET /api/search — search/filters (q, minPrice, maxPrice, condition, sort, page, limit)
    - GET /api/item/{id} — single product (adds to recentlyViewed if `SID` present)

- Seller (requires `SID` + seller role)
    - PUT /api/partner/apply — become seller (body: SellerDetails)
    - POST /api/partner/additem — multipart: Product details + photo files
    - DELETE /api/partner/removeitem — body: {id}
    - PUT /api/partner/edititem — body: {id, newdetails}

- Cart & Likes (requires `SID`)
    - PUT /api/addtocart — body: {id, qty}
    - PUT /api/removefromcart — body: {id}
    - PUT /api/addtoliked — body: {id}
    - PUT /api/removefromliked — body: {id}

- Checkout & Transactions (requires `SID`)
    - GET /api/priceBreakup — returns {subtotal, platformFee}
    - POST /api/checkout — body: {paymentMethod, idempotencyKey, total} → transactions, X-Signature
    - GET /api/transactions — buyer's transactions

- User
    - PUT /api/update — body: {id, newdetails}
    - POST /api/change-password — body: {currentPassword, newPassword}
    - DELETE /api/delete — delete authenticated account

- Misc
    - GET /iit2024077/healthz — {status: 'OK'}
    - GET /logs/recent — recent request logs
