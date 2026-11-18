export type ProjectTier = 'research' | 'software' | 'engineering';
export type ProjectStatus = 'Preprint' | 'Accepted talk' | 'Ongoing' | 'Pre-analysis' | 'Under audit' | 'Live' | 'Completed';

export interface Stat { value: string; label: string; }
export interface Figure { src: string; alt: string; caption: string; }
export interface LinkItem { label: string; href: string; kind: 'code' | 'paper' | 'prereg' | 'demo' | 'data'; }

export interface ProjectDetail {
  slug: string;
  title: string;
  shortTitle: string;
  tier: ProjectTier;
  tags: string[];                 // filter chips
  dates: string;
  status: ProjectStatus;
  role: string;
  collaborators?: string;
  oneLiner: string;               // card + hero subtitle
  question: string;               // "The question"
  why: string;                    // "Why it matters"
  approach: string[];             // "What I did" (max 4)
  findings: string[];             // "What I found" (max 4)
  limits: string[];               // "What this does not show"
  stats: Stat[];                  // 3-4 tiles
  figures?: Figure[];
  stack: string[];
  links: LinkItem[];
  reproduce?: string;             // shell snippet
  next?: string;
  featured?: boolean;
  verify?: boolean;
}

export const projects: ProjectDetail[] = [
  {
    slug: 'federated-ids',
    title: 'Privacy-preserving federated learning for network intrusion detection',
    shortTitle: 'Federated intrusion detection',
    tier: 'research',
    tags: ['Federated learning', 'Network security'],
    dates: 'Jun 2025 – Jun 2026',
    status: 'Completed',
    role: 'Sole developer; B.Sc. final-year research project (ICT-809, Comilla University).',
    oneLiner: 'Can several sites train one intrusion detector without ever sharing their network traffic?',
    question: 'Network logs are sensitive, so organisations rarely pool them. Can clients train a shared intrusion-detection model while keeping raw traffic local, and can the system cope when a client sees an attack type the others have never seen?',
    why: 'Privacy rules often stop data from leaving a site. Federated learning moves the model instead of the data. Hospitals face a similar problem with medical images.',
    approach: [],
    findings: [
      'I ran the federated loop across five clients on separate machines. Each client kept its raw traffic data local.',
      'The server added new attack classes during training and continued through the three logged rounds.',
    ],
    limits: [],
    stats: [
      { value: '5', label: 'federated clients' },
      { value: '28.1 M', label: 'local training records' },
      { value: '14 → 18', label: 'traffic classes' },
      { value: '3', label: 'federated rounds' },
    ],
    figures: [{ src: 'projects/federated-ids/flowchart.png', alt: 'Flowchart of the federated intrusion detection system', caption: 'System flow, from the project report' }],
    stack: ['Python', 'Flower', 'Flask', 'scikit-learn', 'NumPy', 'pandas', 'joblib'],
    links: [{ label: 'Code', href: 'https://github.com/NaazTaiyum/Intrusion-Detection-System-using-Federate-Learning', kind: 'code' }],
    reproduce: 'pip install flwr flask scikit-learn numpy pandas joblib requests\n# Server terminal\npython server.py\n# Client terminal on each client machine\npython client.py\n# For manual aggregation of saved uploads\npython retrain.py',
    next: 'I will build a stratified test set across all 18 classes, report per-class recall, align class columns before client evaluation and compare with a centrally trained model. Then I will test differential privacy and robust aggregation.',
    featured: true,
  },
  {
    slug: 'fly-connectome',
    title: 'Reconstruction differences rival individual differences in the fly compass connectome',
    shortTitle: 'Fly compass connectome',
    tier: 'research',
    tags: ['NeuroAI', 'Connectomics'],
    dates: 'Oct 2026',
    status: 'Preprint',
    role: 'Co-author with M. A. A. Yad; led the statistical analysis',
    collaborators: 'Collaborator: Md Ali Ashraf Yad (Wrocław University of Science and Technology), first author: study design and comparison pipeline',
    oneLiner: 'When two maps of the same fly brain disagree, is that biology or the mapping? Often the mapping, and trained models notice.',
    question:
      'Connectome-constrained models are built from synapse-level wiring diagrams. The same fly circuit now exists in several reconstructions. How much of the difference between them is real individuality, and how much comes from how the data were processed?',
    why:
      'If processing choices move the wiring as much as real biology does, conclusions drawn from one reconstruction may not hold in another, and models trained on one may quietly fail on the next.',
    approach: [],
    findings: [
      'Changing only the synapse detector within one fly moved the circuit more than halfway to the smallest difference between two flies.',
      'Trained networks formed near-perfect ring attractors (0.3–1.6° error on their own wiring), but a 1% change to all weights pushed error to 10–28°.',
      'No network transferred to another reconstruction, even of the same fly. Adding back only the weakest ~4% of synapses raised error to 13–74°.',
      'Real fly compasses drift gradually in darkness and work despite wiring differences of the size that broke the models.',
    ],
    limits: [],
    stats: [
      { value: '9', label: 'wiring versions compared' },
      { value: '0.3–1.6°', label: 'error on own wiring' },
      { value: '10–28°', label: 'error after a 1% weight change' },
      { value: '433', label: 'neurons in the circuit' },
    ],
    figures: [
      { src: 'projects/fly-connectome/fig2.png', alt: 'Measurement and individual differences on one scale', caption: 'Reconstruction differences and between-fly differences, on one scale.' },
      { src: 'projects/fly-connectome/fig3.png', alt: 'Ring attractors and their fragility', caption: 'Trained networks are near-perfect ring attractors that break under a 1% perturbation.' },
      { src: 'projects/fly-connectome/fig4.png', alt: 'Transplants and the precision–robustness trade-off', caption: 'Moving a network to another reconstruction, and what noise training buys.' },
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'SciPy', 'ripser', 'neuPrint', 'FlyWire Codex', 'DANDI'],
    links: [
      { label: 'arXiv:2610.29205', href: 'https://arxiv.org/abs/2610.29205', kind: 'paper' },
      { label: 'Preregistration', href: 'https://doi.org/10.5281/zenodo.23382486', kind: 'prereg' },
      { label: 'Code and networks', href: 'https://github.com/donti507/chessfly', kind: 'code' },
    ],
    reproduce:
      'git clone https://github.com/donti507/chessfly.git\ncd chessfly/new_study\npip install numpy scipy pandas matplotlib torch ripser\nunzip -oq networks/hd_networks_all.zip -d .\nPYTHONPATH=code python code/distance_decomposition.py',
    next: 'Extend to other circuits and model classes, and test whether wiring-distance predicts transfer failure before training.',
    featured: true,
  },

  {
    slug: 'budgetaware-hpo',
    title: 'Budget-aware hyperparameter optimization at HPC scale',
    shortTitle: 'BudgetAware-HPO',
    tier: 'research',
    tags: ['HPC', 'AutoML'],
    dates: 'Jan 2026 – present',
    status: 'Ongoing',
    role: 'Designing controlled benchmark experiments',
    oneLiner: 'Does training in parallel change which tuning method is most cost-effective?',
    question: 'Does evaluating hyperparameter searches by compute cost and parallelism change which method wins?',
    why: '', approach: [], findings: [], limits: [], stats: [],
    figures: [
      { src: 'projects/budgetaware-hpo/fig1_method_comparison.png', alt: 'Method comparison', caption: 'Accuracy and GPU cost by method.' },
      { src: 'projects/budgetaware-hpo/fig2_parallelism_degradation.png', alt: 'TPE by worker count', caption: 'TPE as parallelism grows.' },
    ],
    stack: ['Python', 'PyTorch', 'Optuna', 'SLURM', 'conda'],
    links: [{ label: 'Code and results', href: 'https://github.com/donti507/BudgetAware-HPO', kind: 'code' }],
    featured: true,
    verify: true,
  },
];
