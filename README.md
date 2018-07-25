This is RESTful [Express.js](https://expressjs.com/) Application Boilerplate. It includes User Registration, User Login and User Activation by email.

Application has corresponding front end [Next.js Boilerplate](https://github.com/narekkeryan/next-boilerplate).

To get started first you need to do some configuration.

First create two config files ```development.js``` and ```production.js``` in ```./config/env``` directory with content similar like this
```
'use strict';
   
module.exports = {
   env: 'ENV_NAME',
   clientUrl: 'http://localhost:3000',
   port: 5000,
   db: 'mongodb://USER:PASSWORD@HOST:PORT/DB_NAME',
   jwtSecret: 'JWT_SECRET'
};
```

Then create file named ```Emails.js``` under ```./constants``` directory with content similar like this
```
'use strict';

module.exports = {
    ACTIVATION: {
        NAME: 'NAME <USERNAME@gmail.com>',
        CREDENTIALS: {
            user: 'USERNAME@gmail.com',
            pass: 'PASSWORD'
        }
    }
};
```

After you need to install dependencies ```npm install``` and just run application ```npm run dev```.