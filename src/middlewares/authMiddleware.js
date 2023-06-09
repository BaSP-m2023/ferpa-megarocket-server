import firebaseApp from '../helper/firebase';

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({
      message: 'A token is required',
      data: undefined,
      error: true,
    });
  }
  try {
    const response = await firebaseApp.auth().verifyIdToken(token);
    req.headers.firebaseUid = response.uid;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default verifyToken;
