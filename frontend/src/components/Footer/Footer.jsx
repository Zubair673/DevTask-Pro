import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-bold text-white">
              DevTask
            </h2>

            <p className="mt-4 leading-7">
              A productivity platform built for Software Engineering
              students to manage assignments, coding practice,
              semester projects and daily tasks.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-blue-400 transition"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-4">
              Contact
            </h3>

            <a
              href="mailto:zubairzk2244@email.com"
              className="flex items-center gap-2 mb-5 hover:text-blue-400 transition duration-300"
            >
              <Mail size={18} />
              <span>zubairzk2244@email.com</span>
            </a>

            <div className="flex gap-6">

              <a
                href="https://github.com/Zubair673"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-300"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-300"
              >
                LinkedIn
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2026 DevTask. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;