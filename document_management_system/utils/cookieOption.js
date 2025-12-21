console.log("INSIDE COOKIES")
export const getCookieAccessTokenOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAGE: 15 * 60 * 1000
    }
}

export const getClearCookieAccessTokenOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAGE: 15 * 60 * 1000
    }

}

export const getCookieRefreshTokenOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/api/auth/refresh-token",
        maxAGE: "604800" //7 days
    }
}

export const getClearCookieRefreshTokenOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAGE: "604800",
        path: "/api/auth/refresh-token"
    }

}