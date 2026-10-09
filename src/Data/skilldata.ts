export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI/ML Engineering',
    icon: '🤖',
    description: 'Building intelligent systems with deep learning and predictive models.',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'XGBoost', 'Deep Learning', 'Predictive Modeling', 'Neural Networks', 'Ensemble Methods','LightGBM','SciPy','KNN','Resemblyzer','librosa','segno', 'Transformers', 'Hugging Face', 'NLP', 'Computer Vision', 'Time Series Analysis'],
    metrics: [
      { label: 'ML Projects', value: '6' }, 
      { label: 'Prediction Accuracy', value: '89.54%' }, 
      { label: 'Models Deployed', value: '9' }, 
      { label: 'Frameworks Mastered', value: '4' }, 
    ],
  },

  {
    id: 'data-analytics',
    title: 'Data Science & Analytics',
    icon: '📊',
    description: 'Uncovering insights from data with visualization and science workflows from exploration to deployment.',
    skills: ['SQL', 'Python', 'Plotly Express', 'Pandas', 'Data Visualization', 'EDA', 'Statistical Analysis', 'Dashboard Design', 'Business Intelligence','Matplotlib','Seaborn','Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Feature Engineering', 'Model Validation', 'Hyperparameter Tuning', 'Predictive Modeling', 'Regression Analysis'],
    metrics: [
      { label: 'Visualizations', value: '6+' }, 
      { label: 'Records Analyzed', value: '700K+' }, 
      { label: 'Features Engineered', value: '50+' }, 
      { label: 'Model Accuracy', value: '89%+' }, 

    ],
  },

  {
    id: 'data-engineering',
    title: 'Data Engineering & ETL',
    icon: '⚙️',
    description: 'Building robust data pipelines, web scraping, and ETL workflows for scale.',
    skills: ['Python', 'BeautifulSoup4', 'LXML', 'Web Scraping', 'Requests API', 'ETL Design', 'Data Validation', 'Pipeline Automation', 'joblib Serialization', 'REST API Integration'],
    metrics: [
      { label: 'Data Pipelines Built', value: '3' }, 
      { label: 'Data Sources Integrated', value: '3' }, 
      { label: 'Projects', value: '4' },
      { label: 'Automation Coverage', value: '89%' }, 
    ],
  },

  {
    id: 'desktop-apps',
    title: 'Python App Development',
    icon: '🐍',
    description: 'Building standalone desktop applications with rich GUI, file handling, and system integration.',
    skills: ['Python', 'Tkinter', 'Pygame (Mixer)', 'PyInstaller', 'File I/O', 'Data Persistence', 'State Management', 'GUI Architecture', 'OOP Design', 'OS Module', 'Shutil'],
    metrics: [
      { label: 'GUI Apps Built', value: '5' }, 
      { label: 'Executables Deployed', value: '3' }, 
      { label: 'Architecture Pattern', value: 'OOP' }, 
      { label: 'Total Lines Code', value: '4K+' }, 
    ],
  },

  {
  id: 'game-dev',
  title: 'Game Algorithms',
  icon: '🎮',
  description: 'Building interactive game engines with complex AI, multiple game mechanics, and algorithm optimization.',
  skills: [
    'Chess Engine Development', 
    'Minimax Algorithm', 
    'Chess.js Library',         
    'React Chessboard',          
    'Game State Management', 
    'Tic-Tac-Toe Logic', 
    'Snake Game Mechanics',      
    'Score Tracking',            
    'Game UI Design',            
    'Bot Development'
  ],
  metrics: [
    { label: 'Games Built', value: '3' },              
    { label: 'Game Types', value: 'Classic' }, 
    { label: 'AI Implementation', value: '1 Bot' }, 
    { label: 'Algorithms', value: 'Logic, chess.js' }, 
  ],
},

  {
    id: 'web-dev',
    title: 'Web Development',
    icon: '💻',
    description: 'Creating responsive, interactive web experiences with modern tech.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'REST API', 'Three.js', 'Web Animation', 'Responsive Design'],
    metrics: [
      { label: 'Projects Shipped', value: '4' }, 
      { label: 'Performance Score', value: '90+' }, 
      { label: 'Tech Stack', value: '10+' }, 
      { label: 'Deployment Platforms', value: '3' },
    ],
  },

  {
    id: 'creative-design',
    title: 'Creative Design',
    icon: '🎨',
    description: 'Blending aesthetics with functionality for compelling user experiences.',
    skills: ['UI/UX Design', 'Figma', 'Adobe Photoshop', 'Canva', 'Design Systems', 'Prototyping', 'Motion Design', 'Responsive Layout'],
    metrics: [
      { label: 'Designs Created', value: '25+' },
      { label: 'Design Tools', value: '3' }, 
      { label: 'Projects', value: '2' }, 
      { label: 'Design Iterations', value: '100+' }, 
    ],
  },

  {
    id: 'developer-tools',
    title: 'Developer Tools & Deployment',
    icon: '🛠️',
    description: 'Mastering development infrastructure, version control, and deployment platforms.',
    skills: ['Git', 'GitHub', 'Streamlit', 'Hugging Face Space','Google Colab', 'Anaconda', 'VS Code', 'Netlify', 'Vercel', 'PyInstaller', 'Environment Management','PowerBI'],
    metrics: [
      { label: 'Projects Deployed', value: '13' }, 
      { label: 'Platforms Used', value: '5' }, 
      { label: 'Repositories', value: '25+' }, 
      { label: 'Deployment Success', value: '100%' }, 
    ],
  },
];