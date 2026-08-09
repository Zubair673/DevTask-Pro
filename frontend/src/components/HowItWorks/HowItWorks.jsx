import { UserPlus, ListTodo, CheckCircle2 } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus size={40} className="text-blue-600" />,
      title: "Create an Account",
      description:
        "Register yourself and securely access your personal workspace.",
    },
    {
      icon: <ListTodo size={40} className="text-blue-600" />,
      title: "Add Your Tasks",
      description:
        "Create assignments, coding tasks, projects and deadlines.",
    },
    {
      icon: <CheckCircle2 size={40} className="text-blue-600" />,
      title: "Track Your Progress",
      description:
        "Complete tasks and monitor your productivity every day.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            How DevTask Works
          </h2>

          <p className="mt-4 text-gray-600">
            Start managing your software engineering journey in just three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;