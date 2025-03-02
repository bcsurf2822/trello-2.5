"use client";
import { FaLinkedin, FaGithub, FaBriefcase } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white py-4 shadow-inner">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
 
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-md bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
              Benjamin Corbett
            </h3>

          </div>

          <div className="text-center text-sm text-slate-300">
            <p>&copy; {new Date().getFullYear()} Trello 2.5</p>
          </div>

          <div className="flex gap-5 items-center">
            <a
              href="https://www.linkedin.com/in/benjamin-corbett-84822424a/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                <FaLinkedin size={20} className="text-white" />
              </div>
            </a>
            
            <a
              href="https://github.com/bcsurf2822/trello-2.5"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="GitHub"
            >
              <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-2 rounded-lg shadow-md hover:shadow-slate-500/30 transition-all duration-300">
                <FaGithub size={20} className="text-white" />
              </div>
            </a>
            
            <a
              href="https://www.benjamincorbettnj.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="Portfolio"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg shadow-md hover:shadow-blue-500/30 transition-all duration-300">
                <FaBriefcase size={20} className="text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}