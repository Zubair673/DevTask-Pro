function Skills() {

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Git",
    "GitHub",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
}

export default Skills;