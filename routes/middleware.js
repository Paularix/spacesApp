import jsonwebtoken from "jsonwebtoken"


export const authenticate = (req, res, next) => {
	let token = req.headers.authorization || '';
	if (!token) {
		next({ error: 'No token in request' });
	} 

	jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		console.log("decoded", decoded)
		if (error) {
			next({ error: 'Invalid token' });
		} else {
			let { expiredAt } = decoded;
			console.log(expiredAt)
			if (Number(expiredAt) > new Date().getTime()) {
				next();
			} else {
				console.log("entra aca")
				next({ error: 'Session expired'});
			}
		}
	});

};

export const authError = (err, req, res, next) => {
	console.log("Authentication error")
	res.status(400).json(err);
};


