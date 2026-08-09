import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// Create Project
// POST /api/projects
// ======================================
router.post("/", authMiddleware, createProject);

// ======================================
// Get All Projects
// GET /api/projects
// ======================================
router.get("/", authMiddleware, getProjects);

// ======================================
// Get Single Project
// GET /api/projects/:id
// ======================================
router.get("/:id", authMiddleware, getProjectById);

// ======================================
// Update Project
// PUT /api/projects/:id
// ======================================
router.put("/:id", authMiddleware, updateProject);

// ======================================
// Delete Project
// DELETE /api/projects/:id
// ======================================
router.delete("/:id", authMiddleware, deleteProject);

export default router;