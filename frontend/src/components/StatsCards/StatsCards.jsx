import { useEffect, useState } from "react";
import API from "../../api/api";

function StatsCards() {

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const { data } = await API.get("/tasks");

      const tasks = data.tasks || [];

      setTotalTasks(tasks.length);

      setCompletedTasks(
        tasks.filter(
          (task) => task.status === "Completed"
        ).length
      );

      setPendingTasks(
        tasks.filter(
          (task) => task.status === "Pending"
        ).length
      );

      setInProgressTasks(
        tasks.filter(
          (task) => task.status === "In Progress"
        ).length
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-4xl font-bold text-blue-600">
          {totalTasks}
        </h2>

        <p className="mt-2 text-gray-600">
          Total Tasks
        </p>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-4xl font-bold text-green-600">
          {completedTasks}
        </h2>

        <p className="mt-2 text-gray-600">
          Completed
        </p>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-4xl font-bold text-yellow-500">
          {pendingTasks}
        </h2>

        <p className="mt-2 text-gray-600">
          Pending
        </p>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-4xl font-bold text-purple-600">
          {inProgressTasks}
        </h2>

        <p className="mt-2 text-gray-600">
          In Progress
        </p>

      </div>

    </div>

  );

}

export default StatsCards;