import jsonwebtoken from "jsonwebtoken"


export const authenticate = (req, res, next) => {
	console.log("auth functioon")
	let token = req.headers.authorization || '';
	if (!token) {
		next({ error: 'no token' });
	} 

	jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			next({ error: 'invalid token' });
		} else {
            console.log(decoded)
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
	console.log("auth error")
	res.status(400).json(err);
};


