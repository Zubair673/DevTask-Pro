import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import TaskForm from "../../components/AddTask/TaskForm";
import UpdateButton from "../../components/EditTask/UpdateButton";
import UpdateMessage from "../../components/EditTask/UpdateMessage";

function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [customCourse, setCustomCourse] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [taskType, setTaskType] = useState("");
  const [customTaskType, setCustomTaskType] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const { data } = await API.get(`/tasks/${id}`);
      const task = data.task;
      
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCourse(task.course || "");
      setCategory(task.category || "");
      setPriority(task.priority || "");
      setDifficulty(task.difficulty || "");
      setEstimatedTime(task.estimatedTime || "");
      setDueDate(task.dueDate || "");
      setStatus(task.status || "Pending");
      setTaskType(task.taskType || "");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load task");
      navigate("/dashboard");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        title,
        description,
        // Yahan logic add ki hai taaki "Other" handle ho sake
        course: course === "Other" ? customCourse : course,
        category: category === "Other" ? customCategory : category,
        priority,
        difficulty,
        estimatedTime,
        dueDate,
        status,
        taskType: taskType === "Other" ? customTaskType : taskType,
      };

      await API.put(`/tasks/${id}`, taskData);
      
      toast.success("Task Updated Successfully");
      setMessage("✅ Task updated successfully.");
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
      setMessage("❌ Failed to update task.");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <section className="min-h-screen bg-gray-100 py-10 px-5">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Edit Task</h1>

          <UpdateMessage message={message} messageType={messageType} />

          <form onSubmit={handleUpdate}>
            <TaskForm
              title={title} setTitle={setTitle}
              description={description} setDescription={setDescription}
              course={course} setCourse={setCourse}
              customCourse={customCourse} setCustomCourse={setCustomCourse}
              category={category} setCategory={setCategory}
              customCategory={customCategory} setCustomCategory={setCustomCategory}
              priority={priority} setPriority={setPriority}
              difficulty={difficulty} setDifficulty={setDifficulty}
              estimatedTime={estimatedTime} setEstimatedTime={setEstimatedTime}
              dueDate={dueDate} setDueDate={setDueDate}
              status={status} setStatus={setStatus}
              taskType={taskType} setTaskType={setTaskType}
              customTaskType={customTaskType} setCustomTaskType={setCustomTaskType}
            />

            <div className="mt-8">
              <UpdateButton loading={loading} />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditTask;