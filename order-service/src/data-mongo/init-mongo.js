
db = db.getSibling("order-service");

db.createCollection("orders");

db.orders.drop();

db.createUser({
    user: 'root',
    pwd: 'example',
    roles: [
      {
        role: 'readWrite',
        db: 'order_db'
      }
    ]
})

db.orders.insertMany([
    {
        customerId: 1,
        products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ],
        status: "pending"
    },
    {
        customerId: 2,
        products: [
            { productId: 3, quantity: 1 }
        ],
        status: "completed"
    },
    {
        customerId: 3,
        products: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 2 }
        ],
        status: "shipped"
    }
]);