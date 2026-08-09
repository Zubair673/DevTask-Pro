import { Link } from "react-router-dom";

function Hero() {

  const handleLearnMore = () => {

    const section = document.getElementById("features");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

  };

  return (

    <section className="min-h-[70vh] flex items-center justify-center bg-white px-6">

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Organize Your Developer Life
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-8">
          Manage assignments, coding tasks, software engineering
          projects and deadlines in one powerful application.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>

          <button
            onClick={handleLearnMore}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
          >
            Learn More
          </button>

        </div>

      </div>

    </section>

  );

}

export default Hero;