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
    SECRET=
    TOKEN_SECRET=
    ```
    `SECRET` and `TOKEN_SECRET` preferably shoud be randomly generated hashes.

    Optional fields
    ```
    ADMIN_LOGIN=
    ADMIN_MAIL=
    ADMIN_PASS=
    BUILT_IN_GZIP=
    TOKEN_EXPIRATION_TIME=
    ```

    `TOKEN_EXPIRATION_TIME` defaults to `1h`, `ADMIN_*` fields are used in a seeder, which creates an admin user for the system.

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

Create admin user with data specified in `.env`:
```
npm run seed
```


To run project with **nodemon**:
```
npm run dev
```

### Useful links

- [AdminJS Docs](https://docs.adminjs.co/)
- [Sequalize Docs](https://sequelize.org/v7/)

### TODOs

- [x] Move admin stuff to route
- [x] Add [rate limiter](https://www.npmjs.com/package/express-rate-limit) or [express-brute](https://www.npmjs.com/package/express-brute) and apply to the some auth routes
- [x] Experiment with gzip
- [x] [Admin auth](https://docs.adminjs.co/tutorial-rbac.html)
- [x] Secret in env
- [x] Add option to disable gzip from `.env`
- [x] List all possible `.env` fields in README
- [ ] Look at [helmet](https://www.npmjs.com/package/helmet)
- [x] Move to [fastest-validator](https://www.npmjs.com/package/fastest-validator)
- [x] Add a cron job to empty invalidated tokens table
- [ ] Document all routes
- [ ] Move server from `app.js`