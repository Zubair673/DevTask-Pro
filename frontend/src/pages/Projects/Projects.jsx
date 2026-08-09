import React, { useEffect, useState } from "react";
import API from "../../api/api";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Pencil, Trash2, Plus, X, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    dueDate: "",
  });

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await API.get("/projects");
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
      const message = error.response?.data?.message || "Failed to load projects. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", status: "Planning", priority: "Medium", dueDate: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", status: "Planning", priority: "Medium", dueDate: "" });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }
    try {
      setSubmitting(true);
      if (editingId) {
        await API.put(`/projects/${editingId}`, formData);
        toast.success("Project updated successfully");
      } else {
        await API.post("/projects", formData);
        toast.success("Project created successfully");
      }
      resetForm();
      await loadProjects();
    } catch (error) {
      console.error("Project save error:", error);
      toast.error(error.response?.data?.message || "Failed to save project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name || "",
      description: project.description || "",
      status: project.status || "Planning",
      priority: project.priority || "Medium",
      dueDate: project.dueDate || "",
    });
    setEditingId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      setDeleting(true);
      await API.delete(`/projects/${projectToDelete._id}`);
      toast.success("Project deleted successfully");
      setShowDeleteModal(false);
      setProjectToDelete(null);
      await loadProjects();
    } catch (error) {
      console.error("Delete project error:", error);
      toast.error(error.response?.data?.message || "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Projects</h1>
              <p className="mt-1 text-sm text-gray-600">Organize your work and manage projects efficiently.</p>
            </div>
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500"
            >
              <Plus size={18} />
              New Project
            </button>
          </div>

          {showForm && (
            <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-950/5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Project" : "Create Project"}</h2>
                <button
                  type="button"
                  onClick={resetForm}
                  className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close project form"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="project-name" className="mb-1.5 block text-sm font-semibold text-gray-700">Project Name</label>
                  <input
                    id="project-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter project name..."
                    maxLength={100}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="project-description" className="mb-1.5 block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    id="project-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project..."
                    rows="4"
                    maxLength={500}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="project-status" className="mb-1.5 block text-sm font-semibold text-gray-700">Status</label>
                    <select
                      id="project-status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="project-priority" className="mb-1.5 block text-sm font-semibold text-gray-700">Priority</label>
                    <select
                      id="project-priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="project-due-date" className="mb-1.5 block text-sm font-semibold text-gray-700">Due Date</label>
                  <input
                    id="project-due-date"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Saving..." : editingId ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
              <p className="text-sm font-medium text-gray-500">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle size={28} className="text-red-600" />
              </div>
              <h2 className="mt-5 text-lg font-bold text-gray-900">Something went wrong</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">{error}</p>
              <button
                type="button"
                onClick={loadProjects}
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
              <h2 className="text-lg font-bold text-gray-900">No projects yet</h2>
              <p className="mt-2 text-sm text-gray-500">Create your first project to get started.</p>
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                <Plus size={18} />
                Create Project
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-950/5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">{project.name}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {project.description || "No description provided."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                        {project.status}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                        {project.priority}
                      </span>
                    </div>
                    {project.dueDate && (
                      <p className="mt-4 text-xs text-gray-500">Due: {project.dueDate}</p>
                    )}
                  </div>
                  <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(project)}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showDeleteModal && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle size={28} className="text-red-600" />
            </div>
            <div className="mt-5 text-center">
              <h2 className="text-xl font-bold text-gray-900">Delete Project?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{projectToDelete.name}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleting}
                className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;