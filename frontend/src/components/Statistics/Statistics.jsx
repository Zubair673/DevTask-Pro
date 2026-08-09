import {
  ListChecks,
  FolderKanban,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

function Statistics() {

  const stats = [
    {
      icon: <ListChecks size={40} className="text-blue-600" />,
      number: "100+",
      title: "Tasks Organized",
    },
    {
      icon: <FolderKanban size={40} className="text-blue-600" />,
      number: "10+",
      title: "Project Categories",
    },
    {
      icon: <ShieldCheck size={40} className="text-blue-600" />,
      number: "100%",
      title: "Secure Authentication",
    },
    {
      icon: <Smartphone size={40} className="text-blue-600" />,
      number: "100%",
      title: "Responsive Design",
    },
  ];

  return (
    <section className="py-20 bg-blue-600 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold">
            DevTask Highlights
          </h2>

          <p className="mt-4 text-blue-100">
            A modern task management platform built for productivity,
            security, and a seamless user experience.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white text-gray-800 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-blue-600">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-600 font-medium">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );

}

export default Statistics;