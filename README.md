Simple Expense Tracker

1. Setup new DB `npx prisma migrate dev --name init`
2. Start server `npm run server`
3. Add user via curl `curl -X POST -H 'Content-Type: application/json' -d '{"username":"testuser"}' localhost:3000/add/user`
4. Add expenses to user with userId `1`: `curl -X POST -H 'Content-Type: application/json' -d '{"amount":"100", "merchant":"KTH", "userId":"1"}' localhost:3000/add/expense`
5. Repeat the above commands to add multiple users / expenses. To tie an expense with a user, change the userId field
6. Get all users `curl http://localhost:3000/users`
7. Get all expenses of user with userId `1`: `curl http://localhost:3000/user/1`
8. Get all expenses created regardless of user `curl http://localhost:3000/expenses`
9. Delete everything and clear DB: `curl http://localhost:3000/delete`
