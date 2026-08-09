function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-8">

      <input
        type="text"
        placeholder="Search by task title or course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;