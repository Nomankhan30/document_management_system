const auth_controller = (req, res, next) => {
    console.log("auth middles passed now in controller")
    return res.status(200).json("SUCCESS! ACCESS GRANTED")

}

export default auth_controller