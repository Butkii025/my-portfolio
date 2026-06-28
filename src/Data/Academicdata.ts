export interface SemesterMark {
  sem: string;
  mark: number;
}

export interface SchoolDetail {
  label: string;
  value: string;
  icon: string;
}

export interface AchievementBadge {
  icon: string;
  text: string;
  highlight?: boolean;
}

export const semesterMarks: SemesterMark[] = [
  { sem: 'Sem I',   mark: 6.86 },
  { sem: 'Sem II',  mark: 6.61 },
  { sem: 'Sem III', mark: 8.91 },
  { sem: 'Sem IV',  mark: 8.55 },
  { sem: 'Sem V',   mark: 9.64 },
];

export const schoolDetails: SchoolDetail[] = [
  { label: 'Stream', value: 'Science PCM', icon: '🧪' },
  { label: 'Best Subject', value: 'Maths (95%)', icon: '📐' },
  { label: 'Score', value: '75%', icon: '⭐' },
];

export const csSubjects: string[] = [
  'Data Structures',
  'Web Development',
  'DBMS',
  'Algorithms',
  'OS',
  'Networking',
  'AI/Python',
  'Neural Network',
  'Data Warehouse',
];

export const collegeInfo = {
  degree: 'B.Tech — Computer Science & Engineering',
  university: 'Dr. Sakuntala Misra National Rehabilitation University, Lucknow',
  duration: '2023–2027',
};

export const schoolInfo = {
  degree: 'Higher Secondary (XII) — Science PCM',
  school: 'New Public Inter College, Lucknow',
  year: 'May 2023',
};