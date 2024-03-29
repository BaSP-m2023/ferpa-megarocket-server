import Member from '../models/Member';
import Admin from '../models/Admin';
import SuperAdmins from '../models/SuperAdmin';
import Trainer from '../models/Trainer';

const getAuth = async (req, res) => {
  const { firebaseUid } = req.headers;
  try {
    const member = await Member.findOne({ firebaseUid });
    if (member) {
      return res.status(201).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    }

    const admin = await Admin.findOne({ firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }

    const superAdmin = await SuperAdmins.findOne({ firebaseUid });
    if (superAdmin) {
      return res.status(201).json({
        message: 'Super Admin found',
        data: superAdmin,
        error: false,
      });
    }

    const trainer = await Trainer.findOne({ firebaseUid });
    if (trainer) {
      return res.status(201).json({
        message: 'Trainer found',
        data: trainer,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'User not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};
export default getAuth;
