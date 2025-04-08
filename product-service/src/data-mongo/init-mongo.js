db = db.getSiblingDB('product-service');
db.createCollection('products');

db.products.drop();

db.createUser({
    user: 'root',
    pwd: 'example',
    roles: [
      {
        role: 'readWrite',
        db: 'product_db'
      }
    ]
  })

db.products.insertMany([
    {
        id: 1,
        name: "Product 1",
        description: "Description for Product 1",
        price: 100,
    },
    {
        id: 2,
        name: "Product 2",
        description: "Description for Product 2",
        price: 200,
    },
    {
        id: 3,
        name: "Product 3",
        description: "Description for Product 3",
        price: 300,
    },
]);

print('Initialized database with sample products');
print('Product count:', db.products.count());