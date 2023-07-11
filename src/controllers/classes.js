import Class from '../models/Class';

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllClasses = async (req, res) => {
  try {
    const result = await Class.find().populate('trainerId activityId subscribers');
    return res.status(200).json({
      message: 'Class list',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error,
    });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(404).json({
      message: 'ID invalid, please correct',
      data: undefined,
      error: true,
    });
  }
  try {
    const result = await Class.findById(id).populate('trainerId activityId');
    if (!result) {
      return res.status(404).json({
        message: `Class with the ${id} don't found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Class found! It was ${id}`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createClass = async (req, res) => {
  const {
    day, hour, trainerId, activityId, subscribers,
  } = req.body;

  try {
    const existingClass = await Class.findOne({ $and: [{ day }, { hour }] });
    if (existingClass) {
      return res.status(400).json({
        message: 'There is already a class at that time',
        data: undefined,
        error: true,
      });
    }
    const result = await Class.create({
      day,
      hour,
      trainerId,
      activityId,
      subscribers,
    });
    return res.status(201).json({
      message: 'Class has been succesfully created!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error, don't created",
      data: undefined,
      error,
    });
  }
};

const updateClass = async (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(404).json({
      message: 'ID invalid, please correct',
      data: undefined,
      error: true,
    });
  }
  const {
    day,
    hour,
    trainerId,
    activityId,
    subscribers,
  } = req.body;
  try {
    const existingClass = await Class.findOne({
      $and: [
        { _id: { $ne: id } },
        { hour },
        { day },
      ],
    });
    if (existingClass) {
      return res.status(400).json({
        message: 'There is already a class at that time',
        data: undefined,
        error: true,
      });
    }
    const result = await Class.findByIdAndUpdate(
      id,
      {
        day,
        hour,
        trainerId,
        activityId,
        subscribers,
      },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Class with id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Class has been succesfully updated!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred!',
      error,
    });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Class.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Class with id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Class has been succesfully removed',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred!',
      error,
    });
  }
};

export default {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
