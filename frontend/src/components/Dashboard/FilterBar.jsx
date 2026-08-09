function FilterBar({

  priorityFilter,
  setPriorityFilter,

  statusFilter,
  setStatusFilter,

}) {

  return (

    <div className="grid md:grid-cols-2 gap-5 mt-5">

      <div>

        <label className="block font-medium mb-2">
          Priority
        </label>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option value="All">
            All Priorities
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>

      </div>

      <div>

        <label className="block font-medium mb-2">
          Status
        </label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

      </div>

    </div>

  );

}

export default FilterBar;