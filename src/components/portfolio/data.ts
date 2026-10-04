export const PROFILE = {
  name: "Lalit Chavan",
  role: "Full Stack Software Developer",
  location: "Jalgaon, Maharashtra, India",
  email: "chavanlalit518@gmail.com",
  phone: "+91 8767483136",
  github: "https://github.com/LALITCHAVAN",
  linkedin: "https://www.linkedin.com/in/lalit-chavan-13456727a",
};

// Web3Forms public access key — get one free at https://web3forms.com
export const WEB3FORMS_KEY = "70057ef0-0144-4d10-a143-b64e3338fe60";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const STACK: { title: string; items: string[] }[] = [
  { title: "Frontend", items: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite", "React Router"] },
  { title: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Database", items: ["MongoDB", "Mongoose", "MySQL"] },
  { title: "Authentication", items: ["JWT", "bcrypt.js", "Role-Based Authorization"] },
  { title: "Testing", items: ["Jest", "Vitest", "Unit Testing"] },
  { title: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render", "VS Code"] },
];

export type Project = {
  name: string;
  tagline: string;
  category: "Full Stack" | "Frontend" | "Backend";
  tech: string[];
  description: string;
  features: string[];
  live?: string;
  github: string;
  hue: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Servigo",
    image: "/servigo.png",
    tagline: "Full Stack Service Marketplace",
    category: "Full Stack",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Socket.IO"],
    description:
      "A full-stack service marketplace supporting 35+ service categories, professional discovery, bookings, reviews and role-based dashboards.",
    features: ["Customer/professional workflows", "JWT authentication", "Role-based authorization", "Booking management", "Protected routes", "18+ REST API endpoints", "MongoDB/Mongoose", "Socket.IO"],
    live: "https://servigo-eight.vercel.app/",
    github: "https://github.com/LALITCHAVAN/servigo",
    hue: "var(--violet)",
  },
  {
    name: "Food Delivery",
    image: "/fooddelivery.png",
    tagline: "Full Stack MERN Application",
    category: "Full Stack",
    tech: ["React.js", "TypeScript", "Vite", "Node.js", "Express.js", "MongoDB", "JWT", "Axios"],
    description:
      "A full-stack food delivery platform with authentication, restaurant and food browsing, cart, checkout, order history and profile management.",
    features: ["Authentication", "Restaurant browsing", "Food browsing", "Cart", "Checkout", "Order history", "Profile management", "Admin dashboard", "JWT-secured REST APIs", "MongoDB"],
    github: "https://github.com/LALITCHAVAN/food-delivery-mern",
    hue: "var(--blue)",
  },
  {
    name: "AgencyAI",
    image: "/agency.png",
    tagline: "Digital Agency Website",
    category: "Frontend",
    tech: ["React.js", "Vite", "Tailwind CSS", "Motion", "Web3Forms"],
    description:
      "A responsive digital agency website using reusable React components, Tailwind CSS, dark mode and interactive animations.",
    features: ["Responsive UI", "Dark mode", "Reusable components", "Interactive animations", "Web3Forms integration", "Vercel deployment"],
    github: "https://github.com/LALITCHAVAN",
    hue: "var(--cyan)",
  },
];

export const LEARNING = ["Advanced Full Stack Development", "System Design", "Docker", "Testing", "Design Patterns", "DSA", "AI Integration"];
