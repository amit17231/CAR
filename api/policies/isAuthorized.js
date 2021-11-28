/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = async function (req, res, next) {
    // console.log("kndvjdfjgj", req)
    // console.log("in isAuthorizied");
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.status(401).json({
                "success": false,
                "code": 401,
                "message": "authorization"
            });
        }
    } else if (req.query.access_token) {
        token = req.query.access_token;
        // We delete the token from param to not mess with blueprints
        delete req.query.access_token;
    } else {
        return res.status(401).json({
            "success": false,
            "code": 401,
            "message": "authorization"
        });
    }
    // console.log("tokentoken", token)
    var jwtObj = jwt.decode(token)
    // console.log("jwtObj", jwtObj)

    jwt.verify(token, jwtObj, async function (err, token) {
        if (err) {
            // console.log("err token", err)
            return res.status(401).json({
                "success": false,
                "code": 401,
                "message": "Your Session Has Expired. Please logIn"
                // "message": err.message
            });
        } else if (token && token.user_id) {
            var user = await Users.findOne({ id: token.user_id });
            req.identity = user;

        }
        // console.log("token", token)
        // req.token = token; // This is the decrypted token or the payload you provided
        next();
    });
    // console.log("in djvjdfbnjn", verifyJwt)




};
