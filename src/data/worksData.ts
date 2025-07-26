export interface Work {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  tools: string[];
}

export const worksData: Work[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    description: "Complete brand identity package including logo design, color palette, and brand guidelines for a modern tech startup.",
    image: "/works/work1.jpg",
    category: "Branding",
    date: "2024",
    tools: ["Adobe Illustrator", "Photoshop", "Figma"]
  },
  {
    id: 2,
    title: "Website Redesign",
    description: "Full website redesign with modern UI/UX principles, improved user experience and mobile responsiveness.",
    image: "/works/work2.jpg",
    category: "Web Design",
    date: "2024",
    tools: ["Figma", "Adobe XD", "Photoshop"]
  },
  {
    id: 3,
    title: "E-commerce App Interface",
    description: "Mobile app interface design for an e-commerce platform with intuitive navigation and seamless shopping experience.",
    image: "/works/work3.jpg",
    category: "Mobile Design",
    date: "2023",
    tools: ["Figma", "Adobe After Effects", "Principle"]
  },
  {
    id: 4,
    title: "Social Media Campaign",
    description: "Creative social media campaign design including posts, stories, and promotional materials for product launch.",
    image: "/works/work4.jpg",
    category: "Social Media",
    date: "2023",
    tools: ["Photoshop", "Illustrator", "After Effects"]
  },
  {
    id: 5,
    title: "Logo Animation",
    description: "Dynamic logo animation for brand presentation and video content, showcasing modern motion graphics techniques.",
    image: "/works/work5.jpg",
    category: "Animation",
    date: "2024",
    tools: ["After Effects", "Cinema 4D", "Premiere Pro"]
  }
];