const { verifyToken } = require("../token/tokenManager");

const authCheck = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticate" });
    }

    const token = bearerHeader.split(" ")[1];
    const decode = await verifyToken(token);
    req.user = decode;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan di server", error: error.message });
  }
};

const checkIsAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Anda tidak dapat akses ini, karena bukan admin." });
  }
  next();
};

module.exports = { authCheck, checkIsAdmin };
