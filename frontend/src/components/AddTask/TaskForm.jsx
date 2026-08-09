import { useRef, useEffect } from "react";

function TaskForm({
  title, setTitle,
  description, setDescription,
  course, setCourse,
  customCourse, setCustomCourse,
  category, setCategory,
  customCategory, setCustomCategory,
  priority, setPriority,
  difficulty, setDifficulty,
  estimatedTime, setEstimatedTime,
  dueDate, setDueDate,
  status, setStatus,
  taskType, setTaskType,
  customTaskType, setCustomTaskType,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      {/* Title */}
      <div className="mb-5">
        <label className="block font-medium mb-2">Task Title</label>
        <input
          ref={inputRef}
          type="text"
          value={title}
          maxLength="100"
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-right text-sm text-gray-500 mt-1">{title?.length || 0}/100</p>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block font-medium mb-2">Description</label>
        <textarea
          rows="4"
          value={description}
          maxLength="300"
          placeholder="Describe your task..."
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-right text-sm text-gray-500 mt-1">{description?.length || 0}/300</p>
      </div>

      {/* Course */}
      <div className="mb-5">
        <label className="block font-medium mb-2">Course</label>
        <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">Select Course</option>
          {["Software Engineering", "Software Construction", "Requirements Engineering", "Database Systems", "Operating Systems", "Data Structures & Algorithms", "Computer Networks", "Artificial Intelligence", "Web Development", "Cyber Security", "Other"].map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {course === "Other" && (
        <div className="mb-5">
          <label className="block font-medium mb-2">Enter Course Name</label>
          <input type="text" value={customCourse} placeholder="Enter course name" onChange={(e) => setCustomCourse(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
      )}

      {/* Category */}
      <div className="mb-5">
        <label className="block font-medium mb-2">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">Select Category</option>
          {["Assignment", "Lab Task", "Quiz", "Presentation", "Semester Project", "Coding Practice", "Research", "Personal Task", "Other"].map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {category === "Other" && (
        <div className="mb-5">
          <label className="block font-medium mb-2">Enter Category</label>
          <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block font-medium mb-2">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select Priority</option>
            <option>High</option><option>Medium</option><option>Low</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2">Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select Difficulty</option>
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="block font-medium mb-2">Estimated Time</label>
        <select value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">Select Estimated Time</option>
          {["15 Minutes", "30 Minutes", "45 Minutes", "1 Hour", "2 Hours", "3 Hours", "4 Hours", "5+ Hours"].map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="block font-medium mb-2">Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>

      <div className="mt-5">
        <label className="block font-medium mb-2">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
          <option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
      </div>

      {/* Task Type */}
      <div className="mt-5">
        <label className="block font-medium mb-2">Task Type</label>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">Select Task Type</option>
          {["Academic", "Personal", "Freelancing", "Internship", "Interview Preparation", "Other"].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {taskType === "Other" && (
        <div className="mt-5">
          <label className="block font-medium mb-2">Enter Task Type</label>
          <input type="text" value={customTaskType} onChange={(e) => setCustomTaskType(e.target.value)} placeholder="Enter task type" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
      )}
    </>
  );
}

export default TaskForm;