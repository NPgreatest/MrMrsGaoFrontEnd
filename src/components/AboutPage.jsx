import React from "react";
import { motion } from "framer-motion";

const education = [
    {
        institution: "Rice University",
        degree: "Master of Science in Computer Science",
        duration: "Aug 2024 - Jan 2026",
        logo: "/logo/rice-university-logo-png-transparent.png",
    },
    {
        institution: "East China University of Science and Technology",
        degree: "Bachelor of Computer Science and Finance (Double Major)",
        duration: "Sep 2020 - Jun 2024",
        logo: "/logo/ECUST_university_logo.png",
    },
];

const experiences = [
    {
        company: "Meta (Facebook)",
        role: "Software Engineer Intern",
        duration: "May 2025 - Aug 2025",
        logo: "/logo/meta.webp",
    },
    {
        company: "Alibaba",
        role: "Backend Engineer Intern",
        duration: "Apr 2024 - Jul 2024",
        logo: "/logo/Alibaba-Logo.png",
    },
    {
        company: "Bilibili",
        role: "Software Developer Intern",
        duration: "Aug 2023 - Dec 2023",
        logo: "/logo/Bilibililogo.webp",
    },
];

const projects = [
    {
        name: "Lost in World War II (Game)",
        url: "https://github.com/NPgreatest/Lost-In-World-War-II",
    },
    {
        name: "Tourism Route Planner",
        url: "https://github.com/NPgreatest/Personal-Route-Planner",
    },
    {
        name: "Loan Recommendation System",
        url: "https://github.com/NPgreatest/recommand_loan_mall",
    },
    {
        name: "Mr. & Mrs. Gao RAG AI Chatbot",
        url: "https://github.com/NPgreatest/MrMrsGaoRAG",
    },
];

const AboutPage = () => {
    return (
<div className="flex flex-col w-screen min-h-screen items-center justify-start bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 p-6 overflow-auto">
<motion.div 
                className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    About Me 🚀
                </h1>

                {/* Intro */}
                <motion.p className="text-gray-600 text-lg text-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Hi, I'm <strong>NP_123</strong>, a passionate <strong>Software Engineer</strong> & <strong>AI Enthusiast</strong>.
                    I specialize in <strong>backend development</strong>, <strong>AI applications</strong>, and <strong>high-performance computing</strong>.
                </motion.p>

                {/* Education Background */}
                <h2 className="text-2xl font-semibold text-gray-700 mt-8">🎓 Education Background</h2>
                <div className="mt-3 space-y-4">
                    {education.map((edu, index) => (
                        <motion.div 
                            key={index} 
                            className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img src={edu.logo} alt={edu.institution} className="w-14 h-14 mr-4 rounded-md" />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{edu.institution}</p>
                                <p className="text-gray-600">{edu.degree}</p>
                                <p className="text-gray-500 text-sm">{edu.duration}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact */}
                <h2 className="text-2xl font-semibold text-gray-700 mt-6">📬 Contact</h2>
                <ul className="mt-3 text-lg text-gray-600 space-y-2">
                    <li>📧 Email: <a href="mailto:np123greatest@gmail.com" className="text-blue-500 hover:underline">np123greatest@gmail.com</a></li>
                    <li>🔗 GitHub: <a href="https://github.com/NPgreatest" className="text-blue-500 hover:underline">NPgreatest</a></li>
                </ul>
                {/* Work Experience */}
                <h2 className="text-2xl font-semibold text-gray-700 mt-8">💼 Work Experience</h2>
                <div className="mt-3 space-y-4">
                    {experiences.map((exp, index) => (
                        <motion.div 
                            key={index} 
                            className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img src={exp.logo} alt={exp.company} className="w-30 h-12 mr-4 rounded-md" />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{exp.company}</p>
                                <p className="text-gray-600">{exp.role}</p>
                                <p className="text-gray-500 text-sm">{exp.duration}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Notable Projects */}
                <h2 className="text-2xl font-semibold text-gray-700 mt-8">🔥 Notable Projects</h2>
                <ul className="mt-3 text-lg text-gray-600 space-y-3">
                    {projects.map((project, index) => (
                        <motion.li key={index} whileHover={{ scale: 1.05 }}>
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {project.name}
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Footer */}
                <motion.p 
                    className="text-center text-gray-500 mt-8 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    🚀 Built with React & Tailwind CSS | Portfolio of <strong>NP_123</strong>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
