const jwt = require('jsonwebtoken');
const SECRET_KEY = '4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c';

const verifyToken = (req, res, next) => {
  if(!req.headers['authorization']){
    return res.status(403).json({ message: 'No token provided.' });
  }
  const token = req.headers['authorization'].split(' ')[1];
  console.log('token',token)
  if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.id;
      next();
  });
};


module.exports = {
  verifyToken
}