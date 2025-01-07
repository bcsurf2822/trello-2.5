"use client";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full flex gap-4 bg-gray-600 text-white py-2 text-center justify-center items-center">
      <p>Benjamin Corbett</p>
      <a
        href="https://www.linkedin.com/in/benjamin-corbett-84822424a/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white hover:text-blue-400"
      >
        <FaLinkedin size={24} /> 
      </a>
    </footer>
  );
}