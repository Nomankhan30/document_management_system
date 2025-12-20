console.log("INSIDE COOKIES")
export const getAccessTokenCookieOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAGE: 15 * 60 * 1000
    }
}

export const getClearAccessTokenCookieOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAGE: 15 * 60 * 1000
    }

}

export const getRefreshTokenCookieOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/api/auth/refresh-token",
        maxAGE: "604800" //7 days
    }
}

export const getClearRefreshTokenCookieOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAGE: "604800",
        path: "/api/auth/refresh-token"
    }

}