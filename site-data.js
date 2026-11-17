/**
 * DEFAULT SITE DATA FOR MD SHAHRUKH KHAN SOHEL
 * Personal Developer Portfolio (Publishable directly on GitHub Pages)
 * 
 * All texts and projects can be edited in the discreet Admin Panel (Password: "iamlazy.z")
 * and exported back to this file when updating your GitHub repository.
 */

const DEFAULT_SITE_DATA = {
  hero: {
    greeting: "Hello, I'm",
    name: "Md Shahrukh Khan Sohel",
    role: "Frontend Developer & Software Engineer",
    bio: "Computer Science and Engineering student at Khulna University of Engineering and Technology (KUET). Passionate developer and fast learner dedicated to building intuitive, responsive web applications and solving complex algorithmic problems.",
    resumeUrl: "./assets/resume-example.pdf",
    githubUrl: "https://github.com/Sohelkhan26",
    linkedinUrl: "https://www.linkedin.com/in/sohel-khan-74199b277/"
  },
  about: {
    lead: "Self-taught developer, passionate learner, and problem solver.",
    body: "I am currently a student at Khulna University of Engineering and Technology (KUET). I have learned to program through dedicated coursework and hands-on projects, continuously expanding my skillset. I am eager to learn and grow every day. My ambition is to build awesome, intuitive software experiences—not just good enough.",
    experienceYears: "2+ years",
    experienceField: "Frontend & Software Development",
    educationDegree: "B.Sc. in CSE",
    educationInstitute: "KUET, Khulna"
  },
  contact: {
    email: "sohel2007084@stud.kuet.ac.bd",
    whatsapp: "+8801575353525",
    whatsappDisplay: "+880 1575 353525 (WhatsApp / Phone)"
  },
  projects: [
    {
      id: "proj-1",
      title: "Automated LC Problem Solution",
      category: "Automation & Tools",
      categoryKey: "algorithms",
      description: "An automated pipeline and problem-solving tool for algorithmic challenges, featuring automated test execution, categorization, and problem summary generation.",
      tags: ["Python", "Algorithms", "Automation", "Data Structures"],
      image: "./assets/project 4 automated lc summary.png",
      githubUrl: "https://github.com/Sohelkhan26/LC",
      demoUrl: "https://github.com/Sohelkhan26/LC",
      featured: true
    },
    {
      id: "proj-2",
      title: "Web Programming Lab Project",
      category: "Web Development",
      categoryKey: "web",
      description: "A complete responsive web application built with HTML, CSS, JavaScript, and backend integration. Implements dynamic user interfaces, interactive views, and database operations.",
      tags: ["JavaScript", "HTML5", "CSS3", "Full Stack", "MySQL"],
      image: "./assets/project-3.png",
      githubUrl: "https://github.com/Sohelkhan26/Web_Project_Final",
      demoUrl: "https://github.com/Sohelkhan26/Web_Project_Final",
      featured: true
    },
    {
      id: "proj-3",
      title: "Barta - Messenger & Chat App",
      category: "Mobile Apps",
      categoryKey: "mobile",
      description: "A native Android messaging application offering real-time user-to-user chat, secure authentication, profile management, and smooth responsive mobile design.",
      tags: ["Java", "Android SDK", "Firebase", "XML UI", "REST API"],
      image: "./assets/android.jpg",
      githubUrl: "https://github.com/Sohelkhan26/Barta_a_Messenger_App",
      demoUrl: "https://github.com/Sohelkhan26/Barta_a_Messenger_App",
      featured: true
    },
    {
      id: "proj-4",
      title: "Art Market Database Project (RDBMS)",
      category: "Database & Systems",
      categoryKey: "backend",
      description: "A relational database management system for art marketplace transactions, featuring normalized schema design, relational modeling, and SQL queries.",
      tags: ["Oracle DB", "SQL", "Database Design", "Relational Modeling"],
      image: "./assets/oracle db.jpg",
      githubUrl: "https://github.com/Sohelkhan26/art-market-rdbms",
      demoUrl: "https://github.com/Sohelkhan26/art-market-rdbms",
      featured: true
    },
    {
      id: "proj-5",
      title: "Authored Problems of LC",
      category: "Automation & Tools",
      categoryKey: "algorithms",
      description: "A comprehensive repository of authored and optimized solutions for algorithmic problems across Data Structures, Dynamic Programming, and Graph Theory.",
      tags: ["C++", "Java", "Python", "Problem Solving"],
      image: "./assets/project 5 authored summary.png",
      githubUrl: "https://github.com/Sohelkhan26/LeetCode",
      demoUrl: "https://github.com/Sohelkhan26/LeetCode",
      featured: false
    },
    {
      id: "proj-6",
      title: "Flutter Mobile Experience",
      category: "Mobile Apps",
      categoryKey: "mobile",
      description: "A modern cross-platform mobile user interface developed with Flutter and Dart, demonstrating fluid animations, component design, and state management.",
      tags: ["Flutter", "Dart", "Mobile UI", "Cross-Platform"],
      image: "./assets/flutter.png",
      githubUrl: "https://github.com/Sohelkhan26",
      demoUrl: "https://github.com/Sohelkhan26",
      featured: false
    }
  ]
};

// Available asset images for admin project selector
const AVAILABLE_ASSET_IMAGES = [
  { name: "Automated LC Summary", path: "./assets/project 4 automated lc summary.png" },
  { name: "Authored LC Summary", path: "./assets/project 5 authored summary.png" },
  { name: "Web Project (Project 3)", path: "./assets/project-3.png" },
  { name: "Android Chat App", path: "./assets/android.jpg" },
  { name: "Oracle Database Project", path: "./assets/oracle db.jpg" },
  { name: "Flutter Mobile App", path: "./assets/flutter.png" },
  { name: "Web Project Screenshot", path: "./assets/web project.png" },
  { name: "LeetCode Solution View", path: "./assets/LC solution.png" },
  { name: "Project Thumbnail 1", path: "./assets/project-1.jpg" },
  { name: "Project Thumbnail 2", path: "./assets/project-2.png" }
];
