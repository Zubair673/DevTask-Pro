import mongoose from "mongoose";
import Task from "../models/Task.js";

const allowedPriorities = ["Low", "Medium", "High"];
const allowedDifficulties = ["Easy", "Medium", "Hard"];
const allowedStatuses = ["Pending", "In Progress", "Completed"];

const validateTaskData = (data) => {
  const { title, priority, difficulty, status, dueDate } = data;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) return "Task title is required";
    if (title.trim().length < 2) return "Task title must be at least 2 characters long";
    if (title.trim().length > 100) return "Task title cannot exceed 100 characters";
  }

  if (priority !== undefined && !allowedPriorities.includes(priority)) return "Invalid priority value";
  if (difficulty !== undefined && !allowedDifficulties.includes(difficulty)) return "Invalid difficulty value";
  if (status !== undefined && !allowedStatuses.includes(status)) return "Invalid status value";

  if (dueDate && Number.isNaN(new Date(dueDate).getTime())) return "Invalid due date";

  return null;
};

export const createTask = async (req, res) => {
  try {
    const validationError = validateTaskData(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const {
      title,
      description = "",
      course = "",
      category = "",
      priority = "Medium",
      difficulty = "Medium",
      estimatedTime = "",
      dueDate = "",
      taskType = "",
      status = "Pending",
    } = req.body;

    const task = await Task.create({
      title: title.trim(),
      description,
      course,
      category,
      priority,
      difficulty,
      estimatedTime,
      dueDate,
      taskType,
      status,
      user: req.user._id,
    });

    return res.status(201).json({ success: true, message: "Task Created Successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Get Task Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }

    const validationError = validateTaskData(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const allowedFields = [
      "title", "description", "course", "category", "priority",
      "difficulty", "estimatedTime", "dueDate", "taskType", "status"
    ];

    const updateData = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (updateData.title) {
      updateData.title = updateData.title.trim();
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, message: "Task Updated Successfully", task });
  } catch (error) {
    console.error("Update Task Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }

    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, message: "Task Deleted Successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};