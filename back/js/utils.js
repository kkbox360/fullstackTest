function isAuth(req, res, next) {
  const auth = req.headers.authorization;
  console.log(auth);
  if (auth !== 'mysecrettoken') {
    res.status(403);
    return res.send('Access forbidden');
  }
  next();
}

module.exports = { isAuth };
