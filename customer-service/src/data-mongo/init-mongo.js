
db = db.getSibling("customer-service");

db.createCollection("customers");

db.customers.drop();

db.createUser({
    user: 'root',
    pwd: 'example',
    roles: [
        {
            role: 'readWrite',
            db: 'customer_db'
        }
    ]
})

db.customers.insertMany([
    {
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main Street, New York, NY 10001",
        phone: "+1-555-123-4567"
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        address: "456 Park Avenue, Los Angeles, CA 90001",
        phone: "+1-555-987-6543"
    }
]);

// Print confirmation
print('Initialized database with sample customers');
print('Customer count:', db.customers.count());
