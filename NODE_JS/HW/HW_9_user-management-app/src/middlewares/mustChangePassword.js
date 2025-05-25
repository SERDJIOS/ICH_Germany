

const mustChangePassword = (req, res, next) => {
  if (req.user.mustChangePassword) {
    return res.status(403).json({ error: 'Password change required' });
  }
  next();
};

export default mustChangePassword;