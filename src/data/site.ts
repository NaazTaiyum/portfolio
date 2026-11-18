export const person = {
  name: 'Nazifa Tabassum Nabila',
  tagline: 'Applying to research master’s programmes',
  location: 'Cumilla, Bangladesh',
  email: 'nabilanazifa70376@gmail.com',
  links: {
    github: 'https://github.com/NaazTaiyum',
    arxiv: 'https://arxiv.org/abs/2610.29205',
    cv: 'Nazifa_Nabila_CV.pdf',
  },
};

export const home = {
  heroTitle: 'I want to build machine learning that can be trusted with sensitive data: medical images, brain scans and private networks.',
  heroBody: 'I am an ICT graduate from Comilla University (CGPA 3.53/4.00). My project work covers federated learning, network intrusion detection and machine-learning experiments. I am applying to research-oriented master’s programmes to strengthen my mathematical foundations, software development and reproducible experimental methods, and to move towards medical image analysis and neuroimaging.',
  stats: [
    { value: '3.53/4.00', label: 'CGPA' },
    { value: '1', label: 'arXiv preprint' },
    { value: '28.1 M', label: 'records in a federated training run' },
  ],
  featuredProjectSlugs: ['federated-ids', 'fly-connectome', 'budgetaware-hpo'],
  now: [
    'Preparing research master’s applications.',
    'Extending my federated IDS with a proper multi-class evaluation and privacy protections.',
  ],
};

export const researchInterests = [
  { title: 'Medical image analysis', body: 'Models that stay reliable when image quality, scanners or patient groups change.' },
  { title: 'Neuroimaging', body: 'How analysis choices shape what we conclude about the brain; my preprint looks at this in fly connectomes.' },
  { title: 'Resource-efficient and privacy-preserving ML', body: 'Training useful models when data must stay local or compute is limited.' },
];

export const publications = [
  {
    kind: 'Preprint',
    title: 'Reconstruction differences rival individual differences in the fly compass connectome and break trained circuit models',
    authors: 'M. A. A. Yad and N. T. Nabila',
    venue: 'arXiv:2610.29205 [cs.NE], Oct 2026',
    note: 'Not yet peer-reviewed. Preregistered.',
    links: {
      paper: person.links.arxiv,
      prereg: 'https://doi.org/10.5281/zenodo.23382486',
      code: 'https://github.com/donti507/chessfly',
    },
    bibtex:
      '@article{yad2026reconstruction,\n  title={Reconstruction differences rival individual differences in the fly compass connectome and break trained circuit models},\n  author={Yad, Md Ali Ashraf and Nabila, Nazifa Tabassum},\n  journal={arXiv preprint arXiv:2610.29205},\n  year={2026}\n}',
  },
];

export const education = [
  {
    school: 'Comilla University',
    degree: 'B.Sc. in Information and Communication Technology',
    dates: 'Feb 2022 – Aug 2026',
    location: 'Cumilla, Bangladesh',
    result: 'CGPA 3.53/4.00 · 160 credits · EQF level 6',
    coursework: ['Calculus', 'Matrix algebra and eigenvalues', 'Complex analysis', 'Fourier and Laplace methods', 'Discrete mathematics', 'Probability and statistics', 'Numerical analysis (MATLAB)', 'Data structures and algorithms', 'Databases', 'Operating systems', 'Software engineering', 'Computer networks', 'Network security and cyber law', 'Artificial intelligence', 'Signal and image processing', 'Wireless and optical communication', 'Microwave engineering'],
  },
  { school: 'Comilla Victoria Government College', degree: 'HSC', dates: '2018–2020', result: 'GPA 5.00/5.00' },
  { school: 'Government Laboratory High School', degree: 'SSC', dates: '2016–2018', location: 'Cumilla', result: 'GPA 5.00/5.00' },
];

// Authors: [to confirm]
export const conferences: { title: string; venue: string; dates: string; status: 'Accepted' | 'Presented'; role?: string; now?: string; verify?: boolean }[] = [
  {
    title: 'Integrating Bloom’s Taxonomy into Computer Networking Education to Promote Sustainable Development Awareness',
    venue: '8th International Conference on Sustainable Development (ICSD 2026), United International University (UIU), Dhaka',
    dates: '11–12 Apr 2026',
    status: 'Accepted',
  },
  {
    title: 'From E-Rickshaws to Electric Cars: Navigating Electric Vehicle Integration for Sustainable Development and Smart City Transformation in Bangladesh',
    venue: '8th International Conference on Sustainable Development (ICSD 2026), United International University (UIU), Dhaka',
    dates: '11–12 Apr 2026',
    status: 'Accepted',
  },
  {
    title: 'Comparative Analysis of the Impact of Physics Education on Engineering Students’ Academic Performance',
    venue: 'International Conference on Physics 2026, Bangladesh Physics Society, Dhaka University',
    dates: '9–11 Apr 2026',
    status: 'Presented',
  },
  {
    title: 'Physics-Residual Learning for Interpretable and Label-Efficient Diving Action Quality Assessment',
    venue: '2nd International Student Research Conference (ISRC 2026), Dhaka University',
    dates: '28 Dec 2026',
    status: 'Accepted',
    now: 'Preparing for ISRC 2026 at Dhaka University.',
    verify: true,
  },
];

export const experience: { role: string; org: string; dates?: string; points: string[]; verify?: boolean }[] = [
  { role: 'Volunteer', org: 'International Conference on Multidisciplinary Research in Science, Comilla University', dates: '9–10 Jan 2026', points: ['I supported registration, coordination and logistics on both days.'] },
  { role: 'Deputy Team Lead, Documentation', org: 'TEDxComillaUniversity', points: ['I prepared official event documentation using TEDx branding guidelines and edited the materials for accuracy before publication.'] },
  { role: 'Deputy Team Lead, Documentation', org: 'Hult Prize at Comilla University', dates: '2025–2026', points: ['I oversaw record-keeping and version control, coordinated across departments and helped deliver written materials on time for the campus round.'] },
  { role: 'Coordinator, PR and Communication', org: 'Comilla University Career Summit', points: ['I managed PR materials and kept messaging consistent across channels.'] },
  { role: 'Team Head, IT Debate segment', org: 'IT Fest, Comilla University', points: ['I led planning, logistics, promotion and delivery on the day of the event.'] },
];

export const certifications = [
  { title: 'Certificate of Participation', issuer: 'UNESCO Youth Hackathon 2026', date: '24 Oct 2026', note: 'Team project on “Play Your Part: Youth Designing the Future of Media and Information Literacy.”' },
];

export const skills = {
  Programming: ['Python', 'C, C++, Java (basic)', 'MATLAB'],
  'ML and data': ['scikit-learn', 'Flower (federated learning)', 'NumPy', 'pandas', 'Google Colab'],
  Tools: ['Flask', 'LaTeX', 'Git and GitHub', 'Microsoft Office'],
  Other: ['Prompt engineering for code generation', 'Planning and documentation', 'Teamwork'],
};

export const languages = [
  { skill: 'Bengali', level: 'Native' },
  { skill: 'English listening', level: 'C1' },
  { skill: 'English reading', level: 'C1' },
  { skill: 'English spoken production', level: 'B2' },
  { skill: 'English spoken interaction', level: 'C1' },
  { skill: 'English writing', level: 'C1' },
];
