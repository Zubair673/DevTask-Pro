import { useEffect, useState } from "react";
import API from "../../api/api";

function UserStats() {

  const [stats, setStats] = useState({

    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,

  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const { data } = await API.get("/tasks");

      const tasks = data.tasks || [];

      setStats({

        total: tasks.length,

        completed: tasks.filter(
          (task) => task.status === "Completed"
        ).length,

        pending: tasks.filter(
          (task) => task.status === "Pending"
        ).length,

        inProgress: tasks.filter(
          (task) => task.status === "In Progress"
        ).length,

      });

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="grid md:grid-cols-4 gap-5 mt-6">

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-3xl font-bold text-blue-600">

          {stats.total}

        </h2>

        <p className="mt-2 text-gray-600">

          Total Tasks

        </p>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-3xl font-bold text-green-600">

          {stats.completed}

        </h2>

        <p className="mt-2 text-gray-600">

          Completed

        </p>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-3xl font-bold text-yellow-500">

          {stats.pending}

        </h2>

        <p className="mt-2 text-gray-600">

          Pending

        </p>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">

        <h2 className="text-3xl font-bold text-purple-600">

          {stats.inProgress}

        </h2>

        <p className="mt-2 text-gray-600">

          In Progress

        </p>

      </div>

    </div>

  );

}

export default UserStats;