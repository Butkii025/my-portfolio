export interface ExperienceItem {
  title: string;
  role: string;
  date: string;
  description: string;
  impact: string;
  tech: string[];
  links: { label: string; href: string; icon: "github" | "link" | "download" }[];
}

export const experiences: ExperienceItem[] = [
  {
    title: "Full-Stack AI Developer",
    role: "@Smart India Hackathon 2026 - Ministry of Rural Development",
    date: "September 2026",
    description:
      "BhuNirvighna-Ai - Predictive Analytics Platform for Early Detection of Land Acquisition Delays. Built an AI-powered decision-support dashboard for PS26017, addressing infrastructure project delays caused by compensation, legal, and rehabilitation bottlenecks.",
    impact:
      "Engineered an XGBoost delay-risk classifier (0.97 ROC-AUC) with SHAP-based explainability, a Random Forest cost-estimation model (R² 0.67), and a rule-based land feasibility engine, served through a 5-tab Streamlit dashboard with GIS risk heatmaps and an automated recommendation engine",
    tech: [
      "Python",
      "XGBoost",
      "Scikit-Learn",
      "SHAP",
      "Pandas",
      "Plotly",
      "Folium",
      "Streamlit Cloud",
    ],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/Butkii025/BhuNirvighna-Ai",
        icon: "github",
      },
      {
        label: "Live Dashboard",
        href: "https://bhunirvighna-ai.streamlit.app/",
        icon: "link",
      },
    ],
  },
  {
    title: "Full-Stack AI Developer",
    role: "@Google × Kaggle Hackathon - Git_Online",
    date: "July 2026",
    description:
      "LearnForge AI - Full-Stack AI Education Platform & Secure Code Sandbox. Developed a next-gen learning application for the joint Google × Kaggle 2026 Hackathon",
    impact:
      "Implemented Model Context Protocol (MCP) backend with regex-driven token sanitization and 4 AI Agent-automated validation schema tests",
    tech: ["Python", "MCP Server", "React", "Vite", "Tailwind CSS", "Docker", "Subprocess"],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/Butkii025/LearnForge-AI",
        icon: "github",
      },
      {
        label: "Kaggle Writeup",
        href: "https://www.kaggle.com/competitions/vibecoding-agents-capstone-project",
        icon: "link",
      },
    ],
  },
  {
    title: "ML Engineer Intern",
    role: "@ElevatesLab - Remote",
    date: "May26 - July26",
    description:
      "End-to-end classification pipeline comparing tree-based ML models to predict heart disease presence from patient clinical data. Built and visualized decision trees, analyzed overfitting via depth pruning, and scaled to a Random Forest ensemble with cross-validated evaluation",
    impact:
      "Trained on 1,025 patient records across 14 clinical features. Diagnosed severe overfitting in an unconstrained decision tree (100% train accuracy) and stabilized generalization with a 100-tree Random Forest, achieving 92.98% mean 5-fold CV accuracy. Identified chest pain type (cp), thalassemia (thal), and major vessels count (ca) as the top 3 clinical risk indicators via feature importance analysis",
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Matplotlib",
      "Decision Trees",
      "Random Forest",
    ],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/Butkii025/heart-disease-reading",
        icon: "github",
      },
    ],
  },
  {
    title: "Data Analyst Intern",
    role: "@BeeSkilled - Remote ",
    date: "May26 - June26",
    description:
      "Data-driven analysis for enterprise sales forecasting. Implemented EDA, trained Scikit-Learn models, and deployed interactive Power BI dashboards",
    impact:
      "Analyzed 4-level datasets on $118M+ global sales. Identified -3.1% profit drain in Enterprise segment and recommended scaling high-margin (73.1%) Channel Partners",
    tech: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn", "Power BI", "SQL"],
    links: [
      {
        label: "Github Repository",
        href: "https://github.com/Butkii025/Financial-Predictive-Modelling---intern",
        icon: "github",
      },
    ],
  },
  {
    title: "Data Analyst Intern",
    role: "@Science Tech Institute, UP - Hybrid",
    date: "June25 - July25",
    description:
      "Statistical data processing and predictive modeling on real-world datasets. Developed ecosystem using R, Excel, and Python for weekly projects",
    impact:
      "Gained hands-on experience extracting insights from complex datasets, implementing pivot tables, and creating actionable recommendations",
    tech: ["Python", "R", "Pandas", "NumPy", "Matplotlib", "Excel", "Statistics"],
    links: [
      {
        label: "Intern-Certificate",
        href: "/credentials/pv-saifai-intership.PDF",
        icon: "download",
      },
    ],
  },
];
