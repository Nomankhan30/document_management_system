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

What is cookie-parser?

cookie-parser is an Express middleware that makes working with cookies easy.

It does three main things:

Reads cookies from the incoming HTTP request

Parses them from a raw string into a JavaScript object

Attaches them to req.cookies so you can access cookies easily

Without cookie-parser

The browser sends cookies like this:
Cookie: accessToken=abc123; refreshToken=xyz456

In Express without cookie-parser:
req.headers.cookie // "accessToken=abc123; refreshToken=xyz456"
req.cookies       // undefined ❌

You’d have to manually parse req.headers.cookie yourself.

A state change happens when a request:

Creates data

Updates data

Deletes data

Invalidates something

Alters how the server behaves later

When you logout, your backend usually does at least one of these:

Deletes refresh token from DB

Invalidates session

Rotates token version

Clears cookies

📌 This is a STATE CHANGE

So logout is NOT a read operation.
POST = request that causes a state change on the server

That’s it.

Body is optional.

Synchronus Version: jwt.verify(token, secret)
Asynchronous Version: jwt.verify(token, secret, cb())