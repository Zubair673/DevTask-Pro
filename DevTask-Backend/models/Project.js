import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // ===============================
    // Project Name
    // ===============================
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },

    // ===============================
    // Description
    // ===============================
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    // ===============================
    // Status
    // ===============================
    status: {
      type: String,
      enum: {
        values: ["Planning", "In Progress", "Completed"],
        message: "Invalid project status",
      },
      default: "Planning",
    },

    // ===============================
    // Priority
    // ===============================
    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Invalid project priority",
      },
      default: "Medium",
    },

    // ===============================
    // Due Date
    // ===============================
    dueDate: {
      type: String,
      default: "",
      trim: true,
    },

    // ===============================
    // Project Owner
    // ===============================
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project owner is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;