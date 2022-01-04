# sessions-ucp

## Installation

1. Install packages
    ```
    npm install
    ```

2. Configure DB. Create `.env` file in this format:
    ```
    NODE_ENV=development
    DB_NAME=name
    DB_USER=user
    DB_PASSWORD=pass
    DB_HOST=127.0.0.1
    ```

3. Init CLI
    ```
    npx sequelize-cli init
    ```

4. Create DB
    ```
    npx sequelize-cli db:create --charset utf8mb4 --collate utf8mb4_unicode_ci
    ```

5. Migrate
    ```
    npx sequelize-cli db:migrate
    ```


## Development

To clear and re-migrate DB, use:
```
npm run refresh
```

To run project with **nodemon**:
```
npm run dev
```

### Useful links

- [AdminJS Docs](https://docs.adminjs.co/)
- [Sequalize Docs](https://sequelize.org/v7/)

### TODOs

- [ ] Move admin stuff to route
- [ ] Add [rate limiter](https://www.npmjs.com/package/express-rate-limit)?
