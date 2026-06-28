export interface Project {
  title: string;
  desc: string;
  focused: string;
  tech: string[];
  url?: string;
  img: string;
  code: string;
  type: string;
}

export const PROJECTS_DATA: Project[] = [

  {
    title: "Real Estate Valuation Analysis",
    desc: "End-to-end full-stack application: engineered ML ensemble (Ridge/Lasso/GBR) achieving 89.54% R², built interactive Streamlit frontend with real-time predictions, deployed production-ready dashboard with Plotly market analytics.",
    focused: "Full-Stack Development · Machine Learning · Model Deployment",
    tech: ["Python", "Scikit-Learn", "Plotly", "Pandas", "Joblib","Hugging Face"],
    url: 'https://huggingface.co/spaces/PRIYANSHU2025/propsight',
    img: 'project-img/real-estate-price.png',
    code: 'https://github.com/PriyanshuVijay01/Ames-Housing-Ensemble-AVM',
    type: 'Data Science',
  },

  {
    title: "Book Data Prediction System",
    desc: "Complete MLOps pipeline: web scraping with BeautifulSoup, ensemble ML model training, real-time prediction engine via CLI. Demonstrates end-to-end data engineering and model deployment.",
    focused: "Data Engineering · MLOps · Web Scraping · Ensemble ML",
    tech: ["Python", "Scikit-Learn", "BeautifulSoup4", "LXML", "Joblib", "Requests API"],
    img: 'project-img/extractor_pipeline.png',
    code: 'https://github.com/Butkii025/bibliophile-data-extractor',
    type: 'Data Science',
  },
  {
    title: "Smart Expense Tracker",
    desc: "A web-based personal finance dashboard cloud-deployed on Hugging Face Spaces. Features real-time transaction logging, dual-format data visualization (Matplotlib metrics), historical ledger tracking, date-stamped logs, and full undo/redo state capabilities.",
    focused: "Cloud Deployment · Data Analytics & Visualization",
    tech: ["Python", "Gradio", "Hugging Face Spaces", "Matplotlib", "JSON File I/O"],
    url: 'https://huggingface.co/spaces/PRIYANSHU2025/smart-expense-tracker',
    img: 'project-img/expence-tracker.png',
    code: 'https://huggingface.co/spaces/PRIYANSHU2025/smart-expense-tracker/tree/main',
    type: 'Web Application',
  },

  {
    title: "Personal Portfolio",
    desc: "Responsive interactive portfolio with 3D cursor effects, animated component library, real-time theme switching, and optimized performance. Showcases modern web design & TypeScript expertise.",
    focused: "Web Design · Interactive UI · Performance Optimization",
    tech: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Framer Motion"],
    url: 'https://p-vijay.vercel.app/',
    img: 'project-img/portfolio.png',
    code: 'https://github.com/Butkii025/my-portfolio',
    type: 'Web Development',
  },
  
  {
    title: "Offline Music Player Desktop Application",
    desc: "Full-stack desktop application: Tkinter GUI with Pygame audio engine, automated file caching, compiled to standalone .exe using PyInstaller. Zero-dependency offline execution on Windows.",
    focused: "Desktop Application Development · File Automation · Deployment",
    tech: ["Python", "Tkinter", "Pygame (Mixer)", "PyInstaller", "Shutil", "OS Module"],
    img: 'project-img/Music_player.png',
    code: 'https://github.com/Butkii025/Music_Player_App',
    type: 'Desktop App',
  },
  
  {
    title: "Xela_Arcade — Chess Engine & Game Collection",
    desc: "Custom game framework with chess.js engine leveraging state machines and minimax algorithms. Demonstrates deep algorithm design, competitive bot logic, and React animation orchestration.",
    focused: "Game Development · Bot Logic · State Machines",
    tech: ["JavaScript", "React", "Chess.js", "Framer Motion", "Lucide React"],
    url: 'https://xela-arcade.vercel.app/',
    img: 'project-img/Xela_Arcade.png',
    code: 'https://github.com/Butkii025/Xela_Arcade',
    type: 'Web Development',
  },

  {
    title: "Real-Time Weather Dashboard",
    desc: "Desktop application integrating live weather REST APIs with real-time data parsing. Displays meteorological metrics, forecasts, and environmental indices via responsive GUI dashboard.",
    focused: "API Integration · Real-Time Data · GUI Development",
    tech: ["Python", "Requests API", "Tkinter", "JSON Processing"],
    img: 'project-img/weather-app.png',
    code: 'https://github.com/Butkii025/Weather-app',
    type: 'Desktop App',
  },

  {
    title: "Secure Password Generator",
    desc: "Cryptographically secure password utility with user-defined length and character constraints. Operates offline for data privacy, leverages Python's secrets module for high-entropy randomization.",
    focused: "Cryptographic Security · Data Privacy · Desktop Utility",
    tech: ["Python", "Secrets Module", "Tkinter"],
    img: 'project-img/password-generator.png',
    code: 'https://github.com/Butkii025/Password-Generator-App',
    type: 'Desktop App',
  },

  {
    title: "Craft-Greet — Custom Card Generator",
    desc: "Interactive greeting card creator with custom image upload, personalized messaging, template selection, and direct download. Demonstrates creative UI design and file handling.",
    focused: "Creative Design · User Input Handling · File Export",
    tech: ["HTML5", "CSS", "JavaScript"],
    url: 'https://butkii025.github.io/Craft-Greet/',
    img: 'project-img/craftgreet.png',
    code: 'https://github.com/Butkii025/Craft-Greet',
    type: 'Web Development',
  },

  {
    title: "Interactive Quiz Application",
    desc: "Object-oriented application with dynamic multi-choice evaluation, live score tracking, instant input validation, and automated performance metrics. Demonstrates OOP architecture and state management.",
    focused: "Object-Oriented Design · Dynamic Evaluation · Local Analytics",
    tech: ["Python", "OOP Architecture", "Tkinter", "State Management"],
    img: 'project-img/quiz-app.png',
    code: 'https://github.com/Butkii025/Interactive-Quiz-App',
    type: 'Desktop App',
  },

  {
    title: "Standard Calculator",
    desc: "Desktop calculator with systematic expression parsing, decimal precision tracking, and state-driven interface. Demonstrates core math operations and UI architecture.",
    focused: "Mathematical Logic · Input Validation · State Management",
    tech: ["Python", "Tkinter", "Math Module"],
    img: 'project-img/py-calculator.png',
    code: 'https://github.com/Butkii025/Standard-Calculator-App',
    type: 'Desktop App',
  },

  {
    title: "GPA Calculator",
    desc: "Grade computation tool with credit weighting, cumulative analysis, and performance feedback. Clean calculation logic with intuitive UI for academic tracking.",
    focused: "Educational Tool · Weighted Computation · Performance Analytics",
    tech: ["HTML5", "CSS", "JavaScript"],
    url: 'https://butkii025.github.io/SGPA-calculator/',
    img: 'project-img/clgplusminus.png',
    code: 'https://github.com/Butkii025/SGPA-calculator',
    type: 'Web Development',
  },
];