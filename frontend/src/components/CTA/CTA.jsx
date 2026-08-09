import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold text-white">
          Ready to Boost Your Productivity?
        </h2>

        <p className="text-gray-300 mt-6 text-lg leading-8">
          Join DevTask today and organize your assignments, coding practice,
          semester projects and deadlines in one place.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition"
        >
          Create Free Account
          <ArrowRight size={20} />
        </Link>

      </div>
    </section>
  );
}

export default CTA;