const jwt = require("jsonwebtoken")
const jwtConfig = require("./../../config/jwsConfig")

module.exports = async(req, res, next) => {
    // token값을 header에서 가져옴.
    const accessToken = req.header("accessToken");

    if (accessToken === null || accessToken === undefined) {
        res.status(403).json({ status: false, message: "권한 오류" });
    } else {
        try{
            const tokenInfo = await new Promise((reslove, reject) => {
                jwt.verify(accessToken, jwtConfig.secret, (err, decode) => {
                    if(err) {
                        reject(err);
                    }else {
                        reslove(decode);
                    }
                });
            });

            req.tokenInfo = tokenInfo;
            next();

        } catch (e) {
            res.status(403).json({ status: false, message: "권한 오류" });
        }
    }
}
