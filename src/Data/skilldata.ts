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
    title: 'AI / ML Engineering',
    icon: '🤖',
    description: 'Intelligent systems built with deep learning, ensembles and predictive models.',
    skills: [
      'PyTorch', 'TensorFlow', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'Deep Learning',
      'Predictive Modeling', 'Neural Networks', 'Ensemble Methods', 'Transformers', 'Hugging Face',
      'NLP', 'Computer Vision', 'Time Series Analysis', 'KNN', 'SciPy', 'Resemblyzer', 'librosa', 'segno',
    ],
    metrics: [
      { label: 'ML Projects', value: '6' },
      { label: 'Prediction Accuracy', value: '89.54%' },
      { label: 'Models Deployed', value: '9' },
    ],
  },
  {
    id: 'data',
    title: 'Data Science & Engineering',
    icon: '📊',
    description: 'From raw data to insight: analysis, visualization, scraping and ETL pipelines.',
    skills: [
      'Python', 'SQL', 'Pandas', 'NumPy', 'EDA', 'Statistical Analysis', 'Feature Engineering',
      'Regression Analysis', 'Model Validation', 'Hyperparameter Tuning', 'Data Visualization',
      'Plotly Express', 'Matplotlib', 'Seaborn', 'Power BI', 'Dashboard Design', 'Business Intelligence',
      'Web Scraping', 'BeautifulSoup4', 'LXML', 'Requests API', 'ETL Design', 'Data Validation',
      'Pipeline Automation', 'joblib Serialization', 'REST API Integration',
    ],
    metrics: [
      { label: 'Records Analyzed', value: '700K+' },
      { label: 'Pipelines Built', value: '3' },
      { label: 'Features Engineered', value: '50+' },
    ],
  },
  {
    id: 'web-design',
    title: 'Web & Design',
    icon: '💻',
    description: 'Responsive, interactive web experiences, designed before they are coded.',
    skills: [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Three.js',
      'REST API', 'Web Animation', 'Responsive Design', 'UI/UX Design', 'Figma', 'Adobe Photoshop',
      'Canva', 'Design Systems', 'Prototyping', 'Motion Design',
    ],
    metrics: [
      { label: 'Projects Shipped', value: '4' },
      { label: 'Performance Score', value: '90+' },
      { label: 'Designs Created', value: '25+' },
    ],
  },
  {
    id: 'apps-algorithms',
    title: 'Apps & Algorithms',
    icon: '🎮',
    description: 'Desktop apps, game engines and the algorithms that power them.',
    skills: [
      'Python', 'Tkinter', 'Pygame (Mixer)', 'PyInstaller', 'File I/O', 'Data Persistence',
      'State Management', 'GUI Architecture', 'OOP Design', 'OS Module', 'Shutil',
      'Chess Engine Development', 'Minimax Algorithm', 'Chess.js', 'React Chessboard',
      'Tic-Tac-Toe Logic', 'Snake Game Mechanics', 'Score Tracking', 'Game UI Design', 'Bot Development',
    ],
    metrics: [
      { label: 'GUI Apps Built', value: '5' },
      { label: 'Executables Deployed', value: '3' },
      { label: 'Games Built', value: '3' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Deployment',
    icon: '🛠️',
    description: 'Version control, environments and the platforms everything ships on.',
    skills: [
      'Git', 'GitHub', 'Streamlit', 'Hugging Face Spaces', 'Vercel', 'Netlify',
      'Google Colab', 'Anaconda', 'VS Code', 'Environment Management', 'groq', 'pip', 'openai', 'Deployment Pipelines', 'Cloud Hosting','FastAPI', 'Docker'
    ],
    metrics: [
      { label: 'Projects Deployed', value: '13' },
      { label: 'Platforms Used', value: '5' },
      { label: 'Repositories', value: '30+' },
    ],
  },
];