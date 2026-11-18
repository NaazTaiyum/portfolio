export type ProjectTier = 'research' | 'software' | 'engineering';
export type ProjectStatus = 'Preprint' | 'Accepted talk' | 'Ongoing' | 'Pre-analysis' | 'Under audit' | 'Live' | 'Completed' | 'Accepted talk · ISRC 2026, Dhaka University · 28 Dec 2026' | 'Accepted · IEEE ICCIT 2026 (oral)';

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
  pendingPaper?: string;
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
    slug: 'cyber-defense-generalization',
    title: 'Do AI cyber defenders generalise, or just memorise their training network?',
    shortTitle: 'Cyber-defense generalisation',
    tier: 'research',
    tags: ['Cyber defence', 'Multi-agent RL'],
    dates: '2026',
    status: 'Accepted · IEEE ICCIT 2026 (oral)',
    role: 'Co-author with M. A. A. Yad (first author)',
    oneLiner: 'Randomising the training networks taught the defenders to protect unfamiliar networks against familiar attackers. Both defenders failed against the held-out attack mechanism.',
    question: 'Most multi-agent RL cyber defenders are trained and tested on one fixed network against one fixed attacker. Do they learn to defend, or do they memorise that one scenario?',
    why: 'Networks change. Testing unseen networks separately from unseen attacks shows which kind of generalisation the defenders learned.',
    approach: [],
    findings: [
      'The domain-randomised defenders contained every familiar attacker profile, including on both held-out networks.',
      'The baseline varied substantially across seeds. Its success on topo_2 in the single-run matrix did not repeat across the three comparison seeds.',
      'Both defenders failed against the held-out mechanism. This form of randomisation did not confer robustness to that mechanism.',
    ],
    limits: [],
    stats: [
      { value: '100%', label: 'containment against familiar profiles with randomisation' },
      { value: '0%', label: 'containment against the held-out mechanism' },
    ],
    figures: [
      { src: 'projects/cyber-defense-generalization/architecture_diagram.png', alt: 'Detector and responder training and evaluation architecture', caption: 'Detector–responder architecture from the project repository.' },
      { src: 'projects/cyber-defense-generalization/multiseed_chart.png', alt: 'Mean reward and variability across three training seeds on five simulated networks', caption: 'Mean reward ± standard deviation against the aggressive profile across three training seeds.' },
    ],
    stack: ['Python', 'PyTorch', 'Stable-Baselines3 (PPO)', 'Gymnasium', 'CyberBattleSim', 'pytest'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/domain-randomized-ippo-cyber-defense', kind: 'code' }],
    pendingPaper: 'Paper (IEEE Xplore, after the conference)',
    reproduce: 'pip install -r requirements.txt && pip install -e .\npytest -q\npython scripts/train.py --method dr --seeds 0 1 2\npython scripts/evaluate.py --mode multiseed',
    featured: true,
  },
  {
    slug: 'physics-residual-aqa',
    title: 'Physics-residual learning for interpretable and label-efficient diving action quality assessment',
    shortTitle: 'Physics-residual diving AQA',
    tier: 'research',
    tags: ['Computer Vision', 'Physics-informed ML'],
    dates: '',
    status: 'Accepted talk · ISRC 2026, Dhaka University · 28 Dec 2026',
    role: 'Co-author with M. A. A. Yad (first author)',
    oneLiner: 'A pose-precision limit',
    question:
      'In the air, a diver’s angular momentum is conserved. A break in that should flag a pose or execution problem without any labels. How precise must monocular pose be before this check works, and are current models that precise?',
    why:
      'Label-free, physics-based checks are attractive for sports judging and motion analysis. Knowing the precision they need tells you whether to build them now or improve pose first.',
    approach: [
      'Ran a seeded synthetic study: 6 noise levels × 4 break sizes × 100 trials, on a 100 px torso.',
      'Hand-labelled 160 broadcast frames from MTL-AQA clips (81 analysable, 478 visible joint labels).',
      'Benchmarked ViTPose, RTMPose and diving-finetuned NSAQA against those labels, phase by phase.',
      'Relabelled frames blind to the first round to measure annotation consistency.',
    ],
    findings: [
      'Reliable detection of larger breaks needs about 3 px precision.',
      'The best model reaches a 9.5 px median, and error roughly doubles during rotation, the phase where the check is needed.',
      'Diving fine-tuning cut p90 error by 57% (79 → 34 px) and gross failures from 14.2% to 8.4%, but barely moved the median.',
      'Human self-disagreement was 7.8 px, so much of the limit sits in the footage itself.',
    ],
    limits: [
      'Single frames only, with no temporal filtering, which might close part of the gap.',
      'Entry frames could not be measured (0 of 20 had a labellable torso).',
      'The synthetic noise and the measured Euclidean errors are not identical metrics, so the comparison is indicative.',
    ],
    stats: [
      { value: '≈3 px', label: 'precision needed' },
      { value: '9.5 px', label: 'best model median' },
      { value: '−57%', label: 'p90 error after fine-tuning' },
      { value: '7.8 px', label: 'human self-disagreement' },
    ],
    figures: [
      { src: 'projects/physics-residual-aqa/figure_1_requirement.png', alt: 'Detection rate by break size and noise', caption: 'What the physics check needs.' },
      { src: 'projects/physics-residual-aqa/figure_2_reality.png', alt: 'Pose error by dive phase', caption: 'What pose models deliver, phase by phase.' },
    ],
    stack: ['Python', 'NumPy', 'SciPy', 'ffmpeg', 'Matplotlib', 'ViTPose', 'RTMPose'],
    links: [{ label: 'Code and results', href: 'https://github.com/donti507/physics-residual-aqa', kind: 'code' }],
    next: 'Test temporal smoothing and multi-view footage.',
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
