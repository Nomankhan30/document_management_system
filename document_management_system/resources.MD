express.json() vs express.urlencoded()

Both are built-in body-parsing middlewares in Express.

They read the request body and attach parsed data to:

req.body.

1️⃣ express.json()
What it does:

Parses JSON request bodies.

2️⃣ express.urlencoded()
What it does

Parses URL-encoded form data.

KEY POINT: Sending a response does NOT stop JS execution. Code after res.send()/res.json() still runs, but trying to send another response will throw an error.Hence, writing return is necessary.

If token is expired so its verification will be failed.