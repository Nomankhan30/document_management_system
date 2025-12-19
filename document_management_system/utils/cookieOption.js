console.log("INSIDE COOKIES")
export const getCookieOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
}

export const getClearCookieOptions = () => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

}