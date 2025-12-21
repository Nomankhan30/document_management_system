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

Need dotenv.config() in EVERY file? NO! Call it ONCE at app startup ONLY.

When the refresh token route is hit, the server verifies the refresh token, checks it against the stored value in the database, rotates it(changes it with new one), and issues a new access token without re-authenticating the user.

Refresh tokens are different (by design)
Access Token	       Refresh Token
Short-lived	            Long-lived
Stateless	            Stateful
Used on every request	Used rarely
No DB lookup	        DB lookup allowed
Optimized for scale	    Optimized for security

JWT enables stateless access tokens, but refresh tokens are intentionally stateful to enable revocation, logout, and reuse detection. In distributed systems, access tokens remain stateless while refresh tokens rely on shared storage, which is an accepted and recommended trade-off.

On every successful login:

🔑 New Access Token is generated

🔄 New Refresh Token is generated

💾 Refresh token is stored/updated in DB

🍪 Cookies are set (or JSON returned for mobile)

If you set a cookie with path: '/api' and then try to set it again with path: '/' (or no path), they're treated as different cookies. The old one won't be overwritten.
So the rule is:
Every time you set or update a cookie, use the exact same options (path, domain, httpOnly, secure, sameSite) to ensure you're modifying the existing cookie, not creating a new one.

The Access Token is your "Passport." The Refresh Token is like your "Birth Certificate" you keep it safe and only bring it out when you need a new Passport.

The "Stolen Token" Scenario
The Theft: A hacker steals a user's refreshToken (let's call it Token 1).

The Race: The Hacker is faster than the user. They hit the /refresh route with Token 1.

The Swap: Your server sees Token 1 matches the DB. It issues Token 2 to the hacker and updates the DB to Token 2.

Current State: Hacker has the "valid" Token 2. The Real User still has the "old" Token 1.

The Detection: A few minutes later, the Real User's browser tries to refresh using Token 1.

The Mismatch: Your server sees the Real User is using Token 1, but the DB says the current valid one is Token 2.

Why we must set it to null in DB when oldToken mismatches newToken :
If you simply "Reject" the Real User and do nothing else:

The Real User is blocked (Correct).

BUT the Hacker still has Token 2! The hacker stays logged in, and you have no way of knowing they are a hacker because they have the "current" token.

By setting the DB to null:

You instantly invalidate Token 2 (the one the hacker is holding).

The hacker is kicked out the next time they try to use it.

The real user is kicked out too, but they can just log back in with their password.

The Goal: It is a "Nuclear Option." We would rather kick out a legitimate user and make them re-login than let a hacker stay inside the account with a valid stolen token.

Mongoose next():
If you use async → NO next()
If you use next() → NO async