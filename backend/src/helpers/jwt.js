import JWT from "jsonwebtoken";
import Boom from "boom";

// In-memory storage for refresh tokens (Redis'siz portfolio çözümü)
const refreshTokenStore = new Map();

const signAccessToken = (data) => {
	return new Promise((resolve, reject) => {
		const payload = {
			...data,
		};

		const options = {
			expiresIn: "10d",
			issuer: "ecommerce.app",
		};

		JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			resolve(token);
		});
	});
};

// const verifyAccessToken = (req, res, next) => {
// 	const authorizationToken = req.headers["authorization"];
// 	if (!authorizationToken) {
// 		next(Boom.unauthorized());
// 	}

// 	JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
// 		if (err) {
// 			return next(
// 				Boom.unauthorized(
// 					err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
// 				)
// 			);
// 		}

// 		req.payload = payload;
// 		next();
// 	});
// };

const verifyAccessToken = (req, res, next) => {
	const authorizationHeader = req.headers["authorization"];
	if (!authorizationHeader) {
		return next(Boom.unauthorized("Access token is missing"));
	}

	const tokenParts = authorizationHeader.split(" ");
	if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
		return next(Boom.unauthorized("Invalid token format"));
	}

	const token = tokenParts[1];

	JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			return next(Boom.unauthorized("Invalid or expired token"));
		}

		req.payload = payload;
		next();
	});
};


const signRefreshToken = (user_id) => {
	return new Promise((resolve, reject) => {
		const payload = {
			user_id,
		};
		const options = {
			expiresIn: "180d",
			issuer: "ecommerce.app",
		};

		JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			// Memory'de refresh token'ı sakla (180 gün)
			refreshTokenStore.set(user_id, {
				token,
				expiresAt: Date.now() + (180 * 24 * 60 * 60 * 1000)
			});

			resolve(token);
		});
	});
};

const verifyRefreshToken = async (refresh_token) => {
	return new Promise(async (resolve, reject) => {
		JWT.verify(
			refresh_token,
			process.env.JWT_REFRESH_SECRET,
			async (err, payload) => {
				if (err) {
					return reject(Boom.unauthorized());
				}

				const { user_id } = payload;
				const storedData = refreshTokenStore.get(user_id);

				if (!storedData) {
					return reject(Boom.unauthorized());
				}

				// Token süresini kontrol et
				if (Date.now() > storedData.expiresAt) {
					refreshTokenStore.delete(user_id);
					return reject(Boom.unauthorized());
				}

				if (refresh_token === storedData.token) {
					return resolve(user_id);
				} else {
					return reject(Boom.unauthorized());
				}
			}
		);
	});
};

const clearRefreshToken = (user_id) => {
	const deleted = refreshTokenStore.delete(user_id);
	return deleted;
};

export {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
	clearRefreshToken,
};
