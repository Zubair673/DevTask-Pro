function Features() {
  const features = [
    {
      title: "Assignment Tracker",
      description:
        "Keep track of university assignments and never miss a submission deadline.",
    },
    {
      title: "Coding Practice",
      description:
        "Manage coding practice tasks, DSA problems and programming challenges.",
    },
    {
      title: "Project Management",
      description:
        "Organize semester projects and personal development projects in one place.",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor completed, pending and in-progress tasks with ease.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need to Stay Productive
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            DevTask helps Software Engineering students manage assignments,
            coding practice, projects and daily tasks in one powerful platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-5">
                📌
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;