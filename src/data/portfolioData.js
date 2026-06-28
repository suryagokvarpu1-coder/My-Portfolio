export const portfolioData = {
  personalInfo: {
    name: "Yaswanth Gokavarapu",
    title: "Creative Technologist",
    subtitle: "Designing immersive digital narratives by blending futuristic WebGL interfaces with robust, full-stack software architecture.",
    email: "yaswanthgokavarapu97@gmail.com",
    location: "Hyderabad, India",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    experienceYears: "4+",
    projectsCompleted: "25+",
    clientSatisfaction: "99%"
  },
  
  aboutMe: {
    paragraphs: [
      "I am a software engineer and creative technologist who sits at the intersection of aesthetic design and logical systems development. I design, architect, and deploy highly performant web applications that deliver memorable digital stories.",
      "With years of experience across multiple design languages and technical frameworks, I bring ideas to life—from real-time WebGL interactive canvas simulations to scalable cloud-based backend infrastructures.",
      "My work prioritizes clean code structure, seamless animations, user accessibility, and bulletproof reliability. I strive to build interfaces that feel alive, fluid, and responsive to every interaction."
    ],
    stats: [
      { id: "years", value: 4, suffix: "+", label: "Years Experience" },
      { id: "projects", value: 25, suffix: "+", label: "Projects Built" },
      { id: "satisfaction", value: 99, suffix: "%", label: "Client Satisfaction" }
    ]
  },

  skills: [
    {
      category: "Frontend Architecture",
      icon: "layout",
      desc: "Building lightning-fast, production-ready interfaces using React, Next.js, HTML5, and CSS Grid/Flexbox layouts.",
      proficiency: 95,
      gradient: "var(--gradient-purple)",
      techs: ["React", "Next.js", "JavaScript (ES6+)", "HTML5/CSS3", "Vite", "TailwindCSS"]
    },
    {
      category: "3D Graphics & Shaders",
      icon: "box",
      desc: "Crafting real-time WebGL scenes and interactive canvas animations utilizing Three.js and custom GLSL shader configurations.",
      proficiency: 85,
      gradient: "var(--gradient-teal)",
      techs: ["Three.js", "WebGL", "GLSL Shaders", "GSAP Animations", "Blender 3D", "Canvas API"]
    },
    {
      category: "Backend & Cloud Systems",
      icon: "database",
      desc: "Structuring RESTful endpoints, API integrations (Web3Forms, SendGrid, Stripe), databases (MongoDB, Firestore), and serverless architectures.",
      proficiency: 90,
      gradient: "var(--gradient-purple)",
      techs: ["Node.js", "Express", "MongoDB", "Firebase/Firestore", "FastAPI", "Stripe API"]
    },
    {
      category: "Cross-Platform & Deployment",
      icon: "cpu",
      desc: "Designing responsive application systems that compile natively across mobile devices (iOS/Android) and cloud environments.",
      proficiency: 80,
      gradient: "var(--gradient-teal)",
      techs: ["TypeScript", "Docker", "Git/GitHub", "Vercel / Firebase Hosting", "WebSockets", "iOS/Android WebViews"]
    }
  ],

  projects: [
    {
      id: "project-1",
      title: "Premium Music Platform",
      desc: "Immersive music streaming portal integrating real-time audio frequencies, synchronized lyric engines, and fluid interactive queue management.",
      tags: ["Next.js", "Web Audio API", "Vanilla CSS"],
      image: "assets/images/project-1.png",
      featured: true,
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "project-2",
      title: "AI Study Companion",
      desc: "Adaptive student portal featuring automatic notes generation, context-aware chatbot models, and responsive revision testing trackers.",
      tags: ["React", "Gemini API", "Node.js"],
      image: "assets/images/project-2.png",
      featured: false,
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "project-3",
      title: "Digital Storefront",
      desc: "High-end apparel shop built with frictionless checkout workflows, fast client-side query indexing, and smooth hover micro-animations.",
      tags: ["Vite", "Stripe SDK", "CSS Modules"],
      image: "assets/images/project-3.png",
      featured: false,
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "project-4",
      title: "Smart Agriculture Portal",
      desc: "Geospatial agricultural tracker analyzing satellite imagery to predict soil moisture, identify crop health, and automate field watering cycles.",
      tags: ["Python", "FastAPI", "Leaflet.js"],
      image: "assets/images/project-4.png",
      featured: false,
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "project-5",
      title: "Real-Time Team IDE",
      desc: "Multiplayer developer compiler with instantaneous peer text updates, code compilation containers, and integrated audio streaming.",
      tags: ["WebSockets", "Monaco Editor", "Docker"],
      image: "assets/images/project-5.png",
      featured: false,
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "project-6",
      title: "Smart ResuBoost",
      desc: "Dynamic resume structuring platform leveraging AI parsing models to optimize descriptions for recruitment tracking algorithms.",
      tags: ["TypeScript", "PDFKit", "AI Parser"],
      image: "", // Fallback layout will be styled with custom background
      featured: false,
      demoUrl: "#",
      githubUrl: "#"
    }
  ],

  experience: [
    {
      title: "Lead Software Engineer",
      company: "Fictional Tech Labs",
      duration: "2024 — Present",
      desc: "Spearheading frontend development of immersive client products using Next.js. Architected Three.js background canvas systems, lowering GPU overhead by 25% while implementing standard WCAG 2.1 accessibility protocols."
    },
    {
      title: "Full Stack Developer",
      company: "Global Digital Agency",
      duration: "2022 — 2024",
      desc: "Constructed high-speed custom REST APIs handling over 10K daily submissions. Built modular bento systems for multi-platform products, lowering load metrics by implementing serverless integrations and automated data pipelines."
    },
    {
      title: "Junior Developer",
      company: "Startup Incubator",
      duration: "2020 — 2022",
      desc: "Collaborated closely with design leads to craft fluid micro-animations and smooth transition structures for client presentation sites. Built validation hooks for input forms and optimized visual media assets."
    }
  ],

  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: "Issued Dec 2025",
      credentialId: "AWS-DEV-1289A"
    },
    {
      name: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "Issued Aug 2025",
      credentialId: "GCP-ACE-9821B"
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta (Coursera)",
      date: "Issued Apr 2024",
      credentialId: "META-FED-3329D"
    }
  ],

  achievements: [
    {
      title: "1st Place — AI & Cloud Hackathon",
      desc: "Developed a serverless computer vision model that analyzes crop health under 500ms, winning first prize out of 120 global participant teams."
    },
    {
      title: "Open Source Contributor",
      desc: "Merged multiple performance optimization pull requests into core WebGL loading libraries, helping improve file decompression speeds."
    },
    {
      title: "Ranked Top 3% Nationwide",
      desc: "Exhibited top-tier algorithmic problem-solving and software architecture execution in a competitive programming competition with 25,000+ candidates."
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "National Institute of Technology",
      duration: "2016 — 2020",
      grade: "GPA: 9.2/10"
    }
  ]
};
