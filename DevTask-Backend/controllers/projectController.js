import mongoose from "mongoose";
import Project from "../models/Project.js";

// ===============================
// Allowed Values
// ===============================
const allowedStatuses = [
  "Planning",
  "In Progress",
  "Completed",
];

const allowedPriorities = [
  "Low",
  "Medium",
  "High",
];

// ===============================
// Validate Project Data
// ===============================
const validateProjectData = (data) => {
  const {
    name,
    description,
    status,
    priority,
    dueDate,
  } = data;

  // -------------------------------
  // Name
  // -------------------------------
  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return "Project name is required";
    }

    if (name.trim().length < 2) {
      return "Project name must be at least 2 characters";
    }

    if (name.trim().length > 100) {
      return "Project name cannot exceed 100 characters";
    }
  }

  // -------------------------------
  // Description
  // -------------------------------
  if (description !== undefined) {
    if (typeof description !== "string") {
      return "Description must be a valid text value";
    }

    if (description.trim().length > 500) {
      return "Description cannot exceed 500 characters";
    }
  }

  // -------------------------------
  // Status
  // -------------------------------
  if (
    status !== undefined &&
    !allowedStatuses.includes(status)
  ) {
    return "Invalid project status";
  }

  // -------------------------------
  // Priority
  // -------------------------------
  if (
    priority !== undefined &&
    !allowedPriorities.includes(priority)
  ) {
    return "Invalid project priority";
  }

  // -------------------------------
  // Due Date
  // -------------------------------
  if (dueDate) {
    const date = new Date(dueDate);

    if (Number.isNaN(date.getTime())) {
      return "Invalid due date";
    }
  }

  return null;
};

// ===============================
// Create Project
// ===============================
export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    // -------------------------------
    // Validation
    // -------------------------------
    const validationError = validateProjectData(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // -------------------------------
    // Create Project
    // -------------------------------
    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || "",
      status: status || "Planning",
      priority: priority || "Medium",
      dueDate: dueDate || "",
      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// ===============================
// Get All Projects
// ===============================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// ===============================
// Get Single Project
// ===============================
export const getProjectById = async (req, res) => {
  try {
    // -------------------------------
    // Validate MongoDB ID
    // -------------------------------
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// ===============================
// Update Project
// ===============================
export const updateProject = async (req, res) => {
  try {
    // -------------------------------
    // Validate MongoDB ID
    // -------------------------------
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // -------------------------------
    // Validate data
    // -------------------------------
    const validationError = validateProjectData(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // -------------------------------
    // Allowed fields only
    // -------------------------------
    const allowedFields = [
      "name",
      "description",
      "status",
      "priority",
      "dueDate",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // -------------------------------
    // Clean strings
    // -------------------------------
    if (updateData.name !== undefined) {
      updateData.name = updateData.name.trim();
    }

    if (updateData.description !== undefined) {
      updateData.description =
        updateData.description.trim();
    }

    // -------------------------------
    // Update only owner's project
    // -------------------------------
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// ===============================
// Delete Project
// ===============================
export const deleteProject = async (req, res) => {
  try {
    // -------------------------------
    // Validate MongoDB ID
    // -------------------------------
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // -------------------------------
    // Delete only owner's project
    // -------------------------------
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};