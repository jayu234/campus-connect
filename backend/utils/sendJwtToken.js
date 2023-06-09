const sendToken = (user, res, statusCode) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        result: user
    });
}

module.exports = sendToken;