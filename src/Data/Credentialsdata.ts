export interface CredentialItem {
  label: string;
  href: string;
  date?: string;
  type?: 'pdf' | 'image';
}

export interface CredentialCardProps {
  title: string;
  desc: string;
  icon: string;
  badgeColor: string;
  items: CredentialItem[];
}

export const credentialsData: CredentialCardProps[] = [
  {
    title: 'Professional',
    desc: 'Internships, work experience, and professional certifications earned in industry roles',
    icon: '🏆',
    badgeColor: 'dark:bg-blue-500/20 bg-blue-100',
    items: [
      {
        label: 'ML/AI Internship at Beeskilled',
        href: '/credentials/ML-AI.PDF',
        date: 'June 2026',
        type: 'pdf',
      },
      {
        label: 'Data Analyst Internship at Beeskilled',
        href: '/credentials/DataAnalyst.PDF',
        date: 'May 2026',
        type: 'pdf',
      },
      {
        label: 'Research on Market Volatility Forecasting System',
        href: 'research/NCMPCS.PDF',
        date: 'March 2026',
        type: 'pdf',
      },
      {
        label: 'Data Analysis Intern at Science Tech Institute (UP.Gov)',
        href: '/credentials/pv-saifai-intership.PDF',
        date: 'July 2025',
        type: 'pdf',
      },
    ],
  },
  {
    title: 'Education',
    desc: 'Workshops, courses, certifications from leading institutions and platforms',
    icon: '📚',
    badgeColor: 'dark:bg-purple-500/20 bg-purple-100',
    items: [
      {
        label: 'Data Science simulation - Commonwealth Bank',
        href: '/credentials/datascience-simulation.png',
        type: 'image',
      },
      {
        label: 'Data Analyst simulation - Deloitte',
        href: '/credentials/deloitte-datanalyst.png',
        type: 'image',
      },
      {
        label: 'Master Data Management (MDM) - TCS',
        href: '/credentials/MDM-TCS.PDF',
        type: 'pdf',
      },
      {
        label: 'ML Workshop - IIT Kanpur',
        href: '/credentials/iit-kanpur-workshop.png',
        type: 'image',
      },
      {
        label: 'Python Programming - Kaggle',
        href: '/credentials/py-programming.png',
        type: 'image',
      },
    ],
  },
  {
    title: 'Community',
    desc: 'Events, volunteering, competitions, and social impact participation',
    icon: '👥',
    badgeColor: 'dark:bg-emerald-500/20 bg-emerald-100',
    items: [
        {
        label: 'Internship Common Aptitute Test- ICAT',
        href: '/credentials/ICAT.PDF',
        type: 'pdf',
      },
      {
        label: 'Record Wining Rangoli @Bhoomi-fest_26',
        href: '/credentials/Bhoomi-fest.png',
        type: 'image',
      },
      {
        label: 'Spirit 1.0 Chess Tournament Champion',
        href: '/credentials/pv-spirit1.0.png',
        type: 'image',
      },
      {
        label: 'Youth Parliament',
        href: '/credentials/youth-parliament.png',
        type: 'image',
      },
      {
        label: 'Women\'s Day Play Performance',
        href: '/credentials/play-on-womens day.png',
        type: 'image',
      },
      
    ],
  },
];