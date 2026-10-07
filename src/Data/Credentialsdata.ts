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
    // https://unstop.com/certificate-preview/7161c34b-dc31-470f-8d46-26216c42f513

    title: 'Professional',
    desc: 'Internships, work experience, and professional certifications earned in industry roles',
    icon: '🏆',
    badgeColor: 'dark:bg-blue-500/20 bg-blue-100',
    items: [
      {
        label: 'ML/AI Internship at Elevate Labs',
        href: '/credentials/elevate-labs.png',
        date: 'Aug 2026',
        type: 'image',
      },
      {
        label: 'Data Analyst Internship at Beeskilled',
        href: '/credentials/DataAnalyst.PDF',
        date: 'May 2026',
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
    title: 'Community',
    desc: 'Workshops, courses, certifications from leading institutions and platforms',
    icon: '📚',
    badgeColor: 'dark:bg-purple-500/20 bg-purple-100',
    items: [
      {
        label: 'Hackday 2026 - organised by DECODEP, in collab with UNSTOP',
        href: '/credentials/Hackday.png',
        type: 'image',
        date: 'Sept 2026',
      },
      {
        label: 'Tech Debugging Challenge: StatNova - organised by VIT Bhopal University (VIT), Bhopal',
        href: 'https://unstop.com/certificate-preview/7161c34b-dc31-470f-8d46-26216c42f513',
        type: 'image',
        date: 'Sept 2026',
      },
      {
        label: 'StatNova - Minecraft Submission Round Coding Challenge',
        href: 'https://unstop.com/certificate-preview/b9c1e9e4-920e-464a-a3f8-4b3aef86d677',
        type: 'image',
        date: 'Sept 2026',
      },
      {
        label: 'Google/Kaggle Hacathon 2026 - Kaggle Badge',
        href: 'https://www.kaggle.com/certification/badges/butkii/108',
        type: 'image',
        date: 'July 2026',
      },
      {
        label: 'Internship Common Aptitute Test- ICAT',
        href: '/credentials/ICAT.PDF',
        type: 'pdf',
        date: 'July 2026',
      },
      {
        label: 'Research on Market Volatility Forecasting System',
        href: 'research/NCMPCS.PDF',
        date: 'March 2026',
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
    title: 'Social Activity',
    desc: 'Events, volunteering, competitions, and social impact participation',
    icon: '👥',
    badgeColor: 'dark:bg-emerald-500/20 bg-emerald-100',
    items: [
      {
        label: 'Volunteer @Pharma-Vision 2026',
        href: '/credentials/PV-volunteer.png',
        type: 'image',
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