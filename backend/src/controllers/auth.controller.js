const {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
} = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser({ name, email, password });

        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { accessToken, refreshToken, user } = await loginUser({
            email,
            password,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken,
            user,
        });
    } catch (error) {
        next(error);
    }
};

const refresh = async (req, res, next) => {
    try {
        const refreshTokenFromCookie = req.cookies.refreshToken;

        const { accessToken } = await refreshAccessToken(
            refreshTokenFromCookie
        );

        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const refreshTokenFromCookie = req.cookies.refreshToken;

        await logoutUser(refreshTokenFromCookie);

        res.clearCookie("refreshToken");

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    refresh,
    logout,
};