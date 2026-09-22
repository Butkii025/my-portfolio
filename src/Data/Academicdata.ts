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
  { sem: 'Sem II',  mark: 6.36 },
  { sem: 'Sem III', mark: 8.91 },
  { sem: 'Sem IV',  mark: 8.55 },
  { sem: 'Sem V',   mark: 9.64 },
  { sem: 'Sem VI',   mark: 9.45 },

];

export const csSubjects: string[] = [
  'Data Structures',
  'Web Development',
  'DBMS',
  'Algorithms',
  'OS',
  'Networking',
  'ML / Python',
  'Neural Network',
  'Data Warehouse',
  'Computer Network',
  'Compiler Design',
];

export const collegeInfo = {
  degree: 'B.Tech - Computer Science & Engineering',
  university: 'Dr. Sakuntala Misra National Rehabilitation University, Lucknow',
  duration: '2023–2027',
};

export const schoolInfo = {
  degree: 'Higher Secondary School',
  school: 'New Public Inter College, Lucknow',
  year: 'May 2023',
};