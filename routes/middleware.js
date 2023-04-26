import jsonwebtoken from "jsonwebtoken"


export const authenticate = (req, res, next) => {
	let token = req.headers.authorization || '';
	if (!token) {
		next({ error: 'No token in request' });
	} 

	jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			next({ error: 'Invalid token' });
		} else {
			let { expiredAt } = decoded;        
			if (Number(expiredAt) > new Date().getTime()) {
				next();
			} else {
				next({ error: 'Session expired'});
			}
		}
	});

};

export const authError = (err, req, res, next) => {
	console.log("Authentication error")
	res.status(400).json(err);
};


