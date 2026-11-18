export type Tone = 'primary' | 'coral' | 'teal' | 'neutral';
export type IconName = 'target' | 'activity' | 'layers' | 'cpu' | 'shield' | 'clock' | 'spark' | 'files';
export type Metric = {label: string; value: string; caption: string; chip?: string; tone: Tone; icon: IconName};
export type Note = {title: string; body: string; tone?: Tone};
export type Step = Note & {tools?: string[]};
export type Row = {cells: (string | number)[]; tone?: 'best' | 'reference' | 'bound'; badge?: Tone};
export type Point = {label: string; x: number; y: number; note?: string; tone?: Tone};
export type Marker = {label: string; value: number; tone: Tone};
export type SectionKey = 'question' | 'why' | 'approach' | 'findings' | 'limits' | 'reproduce' | 'next';

export type Block =
  | {kind: 'table'; title: string; headers: string[]; rows: Row[]; caption?: string}
  | {kind: 'containment'; title: string; headers: string[]; rows: {label: string; values: number[]; containment: boolean[]}[]}
  | {kind: 'heatmap'; title: string; headers: number[]; rows: {label: string; values: number[]}[]; highlight: number; caption: string}
  | {kind: 'notes' | 'features' | 'limits' | 'steps'; title?: string; items: Step[]}
  | {kind: 'list' | 'tags'; title?: string; items: string[]}
  | {kind: 'text'; text: string}
  | {kind: 'equation'; title: string; equations: string[]; text: string}
  | {kind: 'terminal'; file: string; code: string}
  | {kind: 'beforeAfter'; title: string; before: string; after: string; file: string}
  | {kind: 'gauge'; title: string; max: number; zone: number; markers: Marker[]; reference: Marker; gapTo: number; phases: {label: string; values: number[]; n: number}[]; models: string[]; caption: string}
  | {kind: 'scatter' | 'line'; title: string; xLabel: string; yLabel: string; xTicks: number[]; yTicks: number[]; points: Point[]; caption?: string; zone?: {maxX: number; minY: number}}
  | {kind: 'dots'; title: string; unit: string; ticks: number[]; band: [number, number]; groups: {label: string; values: Marker[]}[]; references: Marker[]}
  | {kind: 'bars'; title: string; unit: string; max: number; rows: {label: string; before: number; after: number; rescued: number}[]; caption: string}
  | {kind: 'ranges'; title: string; max: number; rows: {label: string; low: number; high: number; note?: string}[]; caption: string}
  | {kind: 'status'; title: string; note: string; complete: number; failed: number; caption: string}
  | {kind: 'funnel'; title: string; stages: {value: string; label: string; note?: string}[]}
  | {kind: 'scores'; title: string; items: {id: string; title: string; detail: string; status: 'Supported' | 'Not supported' | 'Descriptive'}[]}
  | {kind: 'flow'; title: string; stages: string[]; branches?: string[]; examples?: string[]; localData?: string}
  | {kind: 'timeline'; title: string; anchor: string; stages: Note[]}
  | {kind: 'figure'; index: number}
  | {kind: 'browser'; title: string; url?: string; pages: {label: string; href: string; image?: string; width?: number; height?: number}[]; callouts: string[]}
  | {kind: 'chat'; title: string; lanes: string[]; user: string; action: string; voice: string};
export type DeepSection = {id: string; title: string; blocks: Block[]; base?: SectionKey[]; verify?: boolean};
export type DeepProject = {
  badges?: string[];
  metrics: Metric[];
  artifact?: {title: string; eyebrow: string; blocks: Block[]; split?: boolean};
  sections: DeepSection[];
  provenance?: string;
  dossier?: {venue?: string; equipment?: string; datasets?: string[]; stack?: string[]};
};

export const deepProjects: Partial<Record<string, DeepProject>> = {};

const strategies = [
  {name: 'Random Search', trials: 480, best: '93.10%', mean: 61.26, std: '0.268', cost: 0.144},
  {name: 'TPE', trials: 328, best: '92.72%', mean: 82.00, std: '0.162', cost: 0.077},
  {name: 'Hyperband', trials: 160, best: '91.85%', mean: 84.42, std: '0.143', cost: 0.050},
  {name: 'CMA-ES', trials: 32, best: '50.57%', mean: 44.12, std: '0.020', cost: 0.047},
];
const tpeSweep = [
  {label: '1 worker', x: 1, y: 85.9, note: 'n=37'}, {label: '5 workers', x: 5, y: 88.8, note: 'n=41'},
  {label: '10 workers', x: 10, y: 61.8, note: 'n=15'}, {label: '20 workers', x: 20, y: 63.3, note: 'n=29'},
  {label: '40 workers', x: 40, y: 77.9, note: 'n=98'},
];

const budgetBenchmarks: DeepProject = {
  metrics: [
    {label: 'Trial records', value: '1,336', caption: 'Reported experiment total', chip: '15 Optuna studies', tone: 'neutral', icon: 'files'},
    {label: 'Parallel capacity', value: '40', caption: 'V100 GPUs at once', chip: 'Eagle HPC, PCSS', tone: 'primary', icon: 'cpu'},
    {label: 'GPU-h per trial', value: '−65%', caption: 'Hyperband versus Random Search', chip: '0.050 vs 0.144 h', tone: 'coral', icon: 'activity'},
    {label: 'Clean trials', value: '1,195', caption: 'Retained after auditing the archive', chip: '142 records quarantined', tone: 'teal', icon: 'shield'},
  ],
  artifact: {title: 'Cluster and cost', eyebrow: 'Compute budget', split: true, blocks: [
    {kind: 'status', title: 'SLURM array 6923377 · TPE, CIFAR-10', complete: 32, failed: 8, note: 'Order illustrative; counts real.',
      caption: 'Across the whole project: 36 array jobs · 1,756 tasks · 991 completed · 732 failed · 33 timed out · 48 GPU nodes.'},
    {kind: 'scatter', title: 'Accuracy versus cost', xLabel: 'Mean GPU-h per trial', yLabel: 'Mean accuracy (%)',
      xTicks: [0, 0.04, 0.08, 0.12, 0.16], yTicks: [40, 50, 60, 70, 80, 90, 100],
      points: strategies.map(method => ({label: method.name, x: method.cost, y: method.mean, tone: method.name === 'Hyperband' ? 'coral' : 'primary'})),
      zone: {maxX: 0.077, minY: 82}, caption: 'Pooled pre-audit summary (table1_summary.csv).'},
  ]},
  sections: [
    {id: 'question', title: 'The question', base: ['question'], blocks: []},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'Benchmark setup', blocks: [
      {kind: 'steps', items: [
        {title: 'Search space and models', tools: ['PyTorch', 'Optuna'], body: 'ResNet-18 and EfficientNet-B0 on CIFAR-10 and CIFAR-100.'},
        {title: 'Four strategies', tools: ['Optuna samplers'], body: 'Random Search, TPE, Hyperband and CMA-ES.'},
        {title: 'SLURM job arrays', tools: ['Eagle HPC'], body: 'Up to 40 concurrent workers shared one Optuna study per setting.'},
        {title: 'Parallelism sweep', tools: ['TPE'], body: 'Swept 1, 5, 10, 20 and 40 workers.'},
      ]},
      {kind: 'table', title: 'Strategies · pooled pre-audit', headers: ['Method', 'Trials', 'Best acc.', 'Mean acc.', 'Std.', 'GPU-h / trial'],
        rows: strategies.map(method => ({cells: [method.name, method.trials, method.best, method.mean.toFixed(2) + '%', method.std, method.cost.toFixed(3)], tone: method.name === 'Hyperband' ? 'best' : undefined}))},
      {kind: 'figure', index: 0},
    ]},
    {id: 'findings', title: 'Benchmark audit', blocks: [
      {kind: 'funnel', title: 'Archive reconciliation', stages: [
        {value: '2,211', label: 'JSON files'},
        {value: '1,337', label: 'Trial records in the audit', note: '874 per-worker snapshots set aside.'},
        {value: '71', label: 'Colliding trial IDs', note: '142 records quarantined.'},
        {value: '1,195', label: 'Clean trials'},
      ]},
      {kind: 'text', text: 'The archive held 2,211 JSON files. 874 were per-worker snapshots of study state, not trials. 71 trial IDs collided across workers (142 records with different outcomes), so all were quarantined rather than choosing one. Each (method, dataset, workers) setting is a single shared Optuna study, so trials are not independent replicates. In the earliest runs, filenames had no task ID, so collisions there were overwritten at collection time and cannot be detected.'},
      {kind: 'line', title: 'TPE as parallelism grows (audited)', xLabel: 'Workers', yLabel: 'Mean best-val accuracy (%)',
        xTicks: [1, 5, 10, 20, 40], yTicks: [60, 70, 80, 90, 100], points: tpeSweep,
        caption: 'One study per setting and uneven trial counts: descriptive only.'},
      {kind: 'figure', index: 1},
    ]},
    {id: 'engineering', title: 'Engineering note', blocks: [{kind: 'beforeAfter', title: 'Shared SQLite study startup', file: 'train_v2.py',
      before: '40 workers call optuna.create_study(..., load_if_exists=True) on one SQLite file at the same moment. Table creation collides and workers crash.',
      after: `# Stagger worker starts to reduce SQLite conflicts
stagger = random.uniform(0, min(args.trial_id * 0.1, 10))
time.sleep(stagger)

def create_study_with_retry(study_name, storage, sampler, pruner, max_retries=10):
    for attempt in range(max_retries):
        try:
            return optuna.create_study(study_name=study_name, storage=storage,
                direction="maximize", sampler=sampler, pruner=pruner, load_if_exists=True)
        except Exception:
            time.sleep(random.uniform(1, 5) * (attempt + 1))

sampler = optuna.samplers.TPESampler(seed=42, constant_liar=True)`,
    }]},
    {id: 'limits', title: 'What this does not show', blocks: [{kind: 'limits', items: [
      {title: 'One study per setting', body: 'Rankings are preliminary until runs are repeated with independent seeds.'},
      {title: 'Undetectable early collisions', body: 'The first archive’s filename scheme overwrote duplicates.'},
      {title: 'Unreliable CIFAR-100 arrays', body: 'Many CIFAR-100 and CMA-ES array jobs failed entirely (732 of 1,756 tasks failed overall).'},
      {title: 'Narrow scope', body: 'Two small CNNs on CIFAR may not transfer to larger models.'},
    ]}]},
    {id: 'reproduce', title: 'Reproduce it', blocks: [{kind: 'terminal', file: 'hpo_v2.slurm',
      code: 'sbatch --array=1-40%40 hpo_v2.slurm tpe cifar10 40\nsbatch --array=1-40%40 hpo_v2.slurm hyperband cifar10 40'}]},
  ],
  provenance: 'Strategy results are pooled and pre-audit. The TPE sweep uses the deduplicated audit data.',
  dossier: {venue: 'Eagle HPC, PCSS Poznań', equipment: 'Tesla V100-SXM2-32GB',
    stack: ['Python 3.10', 'PyTorch 2.6', 'Optuna 3.6.1', 'SLURM', 'conda'], datasets: ['CIFAR-10', 'CIFAR-100']},
};

const distance = (label: string, value: number, tone: Tone = 'primary'): Marker => ({label, value, tone});
deepProjects['fly-connectome'] = {
  metrics: [
    {label: 'Wiring versions', value: '9', caption: 'Biological and reconstruction variants', chip: '4 flies + 5 same-fly variants', tone: 'primary', icon: 'layers'},
    {label: 'Own-wiring error', value: '0.3–1.6°', caption: 'Heading error on the wiring used for training', tone: 'teal', icon: 'target'},
    {label: 'Weight perturbation', value: '10–28°', caption: 'Heading error after a 1% weight change', tone: 'coral', icon: 'activity'},
    {label: 'Neurons', value: '433', caption: 'Neurons in the FlyWire compass circuit', tone: 'neutral', icon: 'spark'},
  ],
  artifact: {title: 'Reconstruction and individual differences', eyebrow: 'Primary evidence', split: true, blocks: [
    {kind: 'dots', title: 'Differences on one scale', unit: 'Map distance', ticks: [0, 0.05, 0.10, 0.15, 0.20, 0.22], band: [0.022, 0.068],
      groups: [
        {label: 'Filtering', values: [distance('Male CNS Codex vs neuPrint', 0.022), distance('FlyWire filtered vs unfiltered', 0.038)]},
        {label: 'Proofreading', values: [distance('Male CNS v0.9 vs v1.0', 0), distance('BANC v626 vs v888', 0.104)]},
        {label: 'Synapse detector', values: [distance('FlyWire Princeton vs Buhmann', 0.090), distance('FlyWire unfiltered vs Buhmann', 0.084)]},
        {label: 'Between flies', values: [
          distance('Male CNS vs hemibrain', 0.117, 'coral'), distance('Hemibrain vs FlyWire', 0.108, 'coral'),
          distance('FlyWire vs BANC', 0.125, 'coral'), distance('Male CNS vs FlyWire', 0.137, 'coral'),
          distance('Hemibrain vs BANC', 0.185, 'coral'), distance('Male CNS vs BANC', 0.212, 'coral'),
        ]},
      ], references: [distance('10% of edges randomly removed', 0.032), distance('Left vs right halves', 0.060), distance('Random halves', 0.068)]},
    {kind: 'figure', index: 0},
  ]},
  sections: [
    {id: 'question', title: 'The question', base: ['question'], blocks: []},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'What I did', verify: true, blocks: [{kind: 'steps', items: [
      {title: 'Preregistered tests', body: 'I analysed the five preregistered hypotheses (H1–H5).'},
      {title: 'Paired differences', body: 'I used paired Wilcoxon tests with Holm adjustment and Spearman correlations.'},
      {title: 'Group comparisons', body: 'I used Kruskal–Wallis and Mann–Whitney tests.'},
      {title: 'Drift', body: 'I estimated drift uncertainty with bootstrap intervals.'},
    ]}]},
    {id: 'findings', title: 'What we found', base: ['findings'], blocks: [
      {kind: 'scores', title: 'Preregistered hypotheses', items: [
        {id: 'H1', title: 'Networks are fragile under transplant', detail: 'Median transplant ratio R = 87 (cell-type gains) and 162 (neuron gains); threshold R > 5.', status: 'Supported'},
        {id: 'H2', title: 'Neuron-level R exceeds cell-type R', detail: '162 vs 87; paired Wilcoxon, Holm-adjusted p = 0.0007.', status: 'Supported'},
        {id: 'H3', title: 'Failure grows with wiring distance', detail: 'ρ = −0.33 (cell type), +0.25 (neuron); n.s., floor effect.', status: 'Not supported'},
        {id: 'H4', title: 'Ring and fast return mechanism', detail: '3/5 to 5/5 networks per wiring; Delta7 silencing breaks it in 26/31 positive controls.', status: 'Supported'},
        {id: 'H5', title: 'Fly drift', detail: 'Descriptive analysis.', status: 'Descriptive'},
      ]},
      {kind: 'bars', title: 'Refit by source of difference', unit: '°', max: 90,
        rows: [
          {label: 'Same fly · filtering', before: 45, after: 8, rescued: 92},
          {label: 'Same fly · synapse detector', before: 83, after: 61, rescued: 33},
          {label: 'Different flies', before: 88, after: 57, rescued: 21},
        ], caption: 'Rescue means error below 30°. Detector differences behave like different flies (61° vs 57°, p = 0.20). Refit error tracks wiring distance (ρ = +0.67, p = 0.001). Exploratory.'},
      {kind: 'notes', title: 'Noise buys robustness, costs precision', items: [
        {title: 'Own-wiring error', body: 'ρ(noise, own error) = +0.83.', tone: 'coral'},
        {title: 'Error under perturbation', body: 'ρ(noise, error at weights ×0.95) = −0.86.', tone: 'teal'},
      ]},
      {kind: 'table', title: 'Fly E-PG drift', headers: ['Condition', 'D (rad²/s)', 'Interval'],
        rows: [{cells: ['Darkness', '0.0465', '[0.0127, 0.1032]']}, {cells: ['Bright cue', '0.0228', '[0.0107, 0.0350]']}]},
      {kind: 'figure', index: 1}, {kind: 'figure', index: 2},
    ]},
    {id: 'limits', title: 'What this does not show', blocks: [{kind: 'limits', items: [
      {title: 'One circuit', body: 'The compass circuit only; other circuits may buffer differently.'},
      {title: 'Four flies', body: 'Small sample of individuals.'},
      {title: 'One model class', body: 'Rate-based recurrent networks.'},
      {title: 'Peer review pending', body: 'The study is a preprint.'},
      {title: 'Exploratory analyses are labelled', body: 'Deviations are listed in the paper’s Supplement S6.'},
    ]}]},
    {id: 'reproduce', title: 'Reproduce it', base: ['reproduce'], blocks: []},
    {id: 'next', title: 'What’s next', base: ['next'], blocks: []},
  ],
  provenance: 'Preregistered on Zenodo before analysis. Failed predictions are reported.',
  dossier: {stack: ['Python', 'PyTorch', 'NumPy', 'SciPy', 'ripser'], datasets: [
    'Janelia FlyEM male CNS and hemibrain (neuPrint)', 'FlyWire FAFB and BANC (FlyWire Codex)', 'DANDI 000289',
  ]},
};


const pendingDeepProjects: { slug: string; content: DeepProject; verify?: boolean }[] = [
  {slug: 'budgetaware-hpo', content: budgetBenchmarks, verify: true},
];
for (const project of pendingDeepProjects) {
  if (!project.verify) deepProjects[project.slug] = project.content;
}

deepProjects['federated-ids'] = {
  metrics: [
    {label: 'Federated clients', value: '5', caption: 'Clients in the recorded run', chip: 'LAN, multi-PC', tone: 'primary', icon: 'layers'},
    {label: 'Local training records', value: '28.1 M', caption: '28,107,422 samples per round', chip: 'Sum over 5 clients', tone: 'neutral', icon: 'files'},
    {label: 'Traffic classes', value: '14 → 18', caption: 'Four classes discovered during training', tone: 'teal', icon: 'target'},
    {label: 'Federated rounds', value: '3', caption: 'Rounds in the saved server log', tone: 'primary', icon: 'activity'},
  ],
  artifact: {title: 'Federated training and model measurements', eyebrow: 'Primary evidence', split: true, blocks: [
    {kind: 'flow', title: 'Training loop', stages: [
      'Clients train on local CSVs with partial_fit()',
      'Clients send weights and sample counts',
      'Flower and Flask server collects updates',
      'Server weights updates by sample count',
      'New global model goes back to clients',
    ], localData: 'Raw data stays local'},
    {kind: 'line', title: 'Global model coefficient norm by round', xLabel: 'Federated round', yLabel: 'Coefficient L2 norm',
      xTicks: [0, 1, 2, 3], yTicks: [0, 20, 40, 60, 80, 100], points: [
        {label: 'Main', x: 0, y: 0},
        {label: 'Round 1', x: 1, y: 80.30, note: '+80.30'},
        {label: 'Round 2', x: 2, y: 40.43, note: '−39.87 (−49.7%)'},
        {label: 'Round 3', x: 3, y: 27.01, note: '−13.41 (−33.2%)'},
      ],
      caption: 'The coefficient norm fell after round one. A smaller norm does not establish convergence or tell us how accurately the model detects attacks.',
    },
  ]},
  sections: [
    {id: 'question', title: 'The question', base: ['question'], blocks: []},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'What I did', blocks: [
      {kind: 'steps', items: [
        {title: 'Architecture', tools: ['Flower', 'Flask'], body: 'I used Flower to coordinate rounds over gRPC on port 8080. Clients also uploaded model updates through a Flask HTTP API on port 5000 for scheduled aggregation. The training CSVs stayed on the clients.'},
        {title: 'Incremental local training', tools: ['scikit-learn'], body: 'I trained an SGDClassifier on each client with partial_fit(), which supports incremental updates. The logged client implementation loads its local training split into memory.'},
        {title: 'Weighted averaging', tools: ['FedAvg'], body: 'I combined client coefficients and intercepts in proportion to the number of samples each client trained on. The scheduled aggregation script saves a timestamped global model.'},
        {title: 'Dynamic class discovery', body: 'The server found 14 traffic classes in 37 CSVs. Clients then reported CoAP Amplification, Merlin C&C Communication, Mirai C&C Communication and UDP Scan. The server expanded its label encoder to 18 classes.'},
      ]},
      {kind: 'figure', index: 0},
    ]},
    {id: 'findings', title: 'What I found', base: ['findings'], blocks: [
      {kind: 'limits', items: [{
        title: 'Why I don’t report accuracy yet',
        body: 'My test set had 17,979 held-out rows from four cooler motor files. Every row was benign, so the perfect score tells me nothing about detecting attacks. The client logs also show a 14-versus-18-column probability mismatch and a log-loss failure caused by an unsupported eps argument.',
        tone: 'coral',
      }]},
    ]},
    {id: 'limits', title: 'Limits', blocks: [{kind: 'limits', items: [
      {title: 'Single-class test set', body: 'The held-out data cannot measure per-class attack detection.'},
      {title: 'Linear model', body: 'The prototype uses SGDClassifier. I have yet to benchmark deep models.'},
      {title: 'Privacy guarantee', body: 'Client updates can leak information. I have yet to implement differential privacy or secure aggregation.'},
      {title: 'Poisoning', body: 'A malicious client could send harmful updates. Robust aggregation, such as Krum, is future work.'},
    ]}]},
    {id: 'next', title: 'What’s next', base: ['next'], blocks: []},
    {id: 'reproduce', title: 'Reproduce it', base: ['reproduce'], blocks: [{kind: 'text',
      text: 'Use the project’s local CSV data layout and configure the Flask and Flower addresses for each client. The current server defaults to one Flower round per startup. Set its round count to three to match the logged run. The server starts retrain.py itself after Flower finishes, so start it manually only when aggregating a separate set of saved uploads.',
    }]},
  ],
  provenance: 'The server, client and evaluation logs document the recorded run. The samples counted once per client are 11,058,863; 4,779,909; 4,440,789; 3,452,392; and 4,375,469.',
};

deepProjects['physics-residual-aqa'] = {
  badges: ['ISRC 2026', 'Negative result, reported as such'],
  metrics: [
    {label: 'Precision needed', value: '≈3 px', caption: 'Per-coordinate noise in the synthetic experiment', chip: 'Synthetic requirement', tone: 'teal', icon: 'target'},
    {label: 'Best model median', value: '9.48 px', caption: 'NSAQA, fine-tuned on diving', chip: '3.2× the requirement', tone: 'primary', icon: 'activity'},
    {label: 'p90 after fine-tuning', value: '−57%', caption: 'Reduction relative to generic ViTPose', chip: '78.97 → 33.99 px', tone: 'coral', icon: 'spark'},
    {label: 'Human self-disagreement', value: '7.8 px', caption: 'Same annotator, relabelled footage', chip: '47 paired points, 6 frames', tone: 'neutral', icon: 'layers'},
  ],
  artifact: {title: 'Pose precision and the verification gap', eyebrow: 'Analytical gauge', blocks: [{
    kind: 'gauge', title: 'Synthetic requirement and observed errors', max: 20, zone: 3,
    markers: [{label: 'ViTPose', value: 9.87, tone: 'primary'}, {label: 'RTMPose', value: 10.29, tone: 'neutral'}, {label: 'NSAQA', value: 9.48, tone: 'coral'}],
    reference: {label: 'Human self-disagreement', value: 7.8, tone: 'neutral'}, gapTo: 9.48,
    models: ['ViTPose', 'RTMPose', 'NSAQA'],
    phases: [
      {label: 'Takeoff', values: [7.86, 8.05, 7.73], n: 111}, {label: 'Early', values: [7.87, 8.71, 8.04], n: 100},
      {label: 'Peak', values: [10.38, 10.41, 8.74], n: 79}, {label: 'Rotation 1', values: [14.14, 14.57, 11.85], n: 115},
      {label: 'Rotation 2', values: [17.24, 22.06, 18.50], n: 35},
    ],
    caption: 'Error is worst exactly where the physics check is needed.',
  }]},
  sections: [
    {id: 'question', title: 'The question', base: ['question'], blocks: [
      {kind: 'equation', title: 'Invariant conservation bounds', equations: ['y(t) = y₀ + v₀t − ½gt²', 'dL/dt = 0'],
        text: 'Exact under the stated assumptions; monocular centre-of-mass and inertia estimates are approximations, so a violation implicates the pose/camera/measurement model, not the athlete.'},
    ]},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'What we did', blocks: [{kind: 'steps', items: [
      {title: 'Clip extraction', tools: ['ffmpeg', 'MTL-AQA annotations'], body: 'Cut dive clips from broadcast video using MTL-AQA annotations.'},
      {title: 'Hand labelling', tools: ['Manual'], body: 'Labelled 160 frames across takeoff, early flight, peak, two rotation phases and entry; 81 had a labelled shoulder and hip.'},
      {title: 'Synthetic requirement', tools: ['NumPy', 'Seeded'], body: '6 noise levels × 4 break sizes × 100 trials on a 100 px torso.'},
      {title: 'Benchmark and residuals', tools: ['ViTPose', 'RTMPose', 'NSAQA'], body: 'Compared per-joint error against the hand labels phase by phase and against the synthetic threshold.'},
    ]}]},
    {id: 'findings', title: 'What we found', blocks: [
      {kind: 'heatmap', title: 'Synthetic detection rates', headers: [1, 2, 3, 5, 8, 10], highlight: 3,
        rows: [
          {label: '5%', values: [84, 30, 15, 10, 4, 4]}, {label: '10%', values: [100, 85, 46, 17, 11, 10]},
          {label: '20%', values: [100, 100, 98, 57, 24, 15]}, {label: '40%', values: [100, 100, 100, 100, 70, 51]},
        ], caption: 'Known-frame detection. 100 seeded trials per cell.'},
      {kind: 'table', title: 'Pose benchmark', headers: ['Model', 'Median (px)', 'p90 (px)', 'Gross failures (%)', 'Missed (%)'],
        rows: [
          {cells: ['ViTPose (generic)', '9.87', '78.97', '14.2', '7.9']},
          {cells: ['RTMPose (generic)', '10.29', '69.91', '12.1', '7.9']},
          {cells: ['NSAQA (diving-finetuned)', '9.48', '33.99', '8.4', '7.9'], tone: 'best'},
          {cells: ['Human self-disagreement', '7.8', '—', '—', '—'], tone: 'reference'},
          {cells: ['Synthetic requirement', '≈3', '—', '—', '—'], tone: 'bound'},
        ], caption: '440 measured errors from 478 visible joint labels per model. A gross failure places a joint more than half a hand-labelled torso away. Synthetic noise is per-coordinate and model errors are Euclidean. The comparison is indicative.'},
      {kind: 'notes', items: [
        {title: 'Tail collapse', body: 'Fine-tuning cut p90 by 57% (78.97 → 33.99 px) and gross failures from 14.2% to 8.4%.', tone: 'teal'},
        {title: 'Median floor', body: 'The median barely moved (9.87 → 9.48 px).'},
        {title: 'Verification gap', body: 'The best median is about 3.2× the ≈3 px requirement.', tone: 'coral'},
      ]},
      {kind: 'ranges', title: 'Human consistency by joint', max: 22, rows: [
        {label: 'Overall', low: 7.8, high: 7.8}, {label: 'Excluding probable left/right swaps', low: 6.5, high: 6.5},
        {label: 'Hips', low: 20, high: 22, note: 'Worst agreement'},
        {label: 'Shoulders, elbows, wrists and ankles', low: 7, high: 10},
        {label: 'Head', low: 5, high: 5, note: 'Approximate'},
      ], caption: 'Visibility decisions agreed 99%.'},
      {kind: 'figure', index: 0}, {kind: 'figure', index: 1},
    ]},
    {id: 'limits', title: 'What this does not show', blocks: [{kind: 'limits', items: [
      {title: 'Single frames', body: 'Temporal filtering might close part of the gap or suppress the signal. It was untested.'},
      {title: 'Entry unmeasured', body: '0 of 20 entry frames had a labellable torso.'},
      {title: 'Head excluded', body: 'The label sets use different head definitions.'},
      {title: 'Monocular projection', body: 'Camera motion, segment-mass approximations and out-of-plane motion limit interpretation.'},
      {title: 'No scoring claim', body: 'These experiments do not establish that residuals predict judges’ scores.'},
    ]}]},
    {id: 'reproduce', title: 'Reproduce it', blocks: [{kind: 'terminal', file: 'Terminal', code: [
      'git clone https://github.com/donti507/physics-residual-aqa.git',
      'cd physics-residual-aqa',
      'python -m venv .venv',
      '. .venv/bin/activate',
      'python -m pip install numpy matplotlib',
      'python src/summarize_results.py',
      'python src/make_figures.py --results results',
    ].join('\n')}]},
    {id: 'next', title: 'What’s next', base: ['next'], blocks: []},
  ],
  provenance: 'Frames from MTL-AQA broadcast diving clips. 160 hand-labelled PNGs; 81 had a labelled shoulder and hip; 478 visible joint labels per model.',
  dossier: {venue: 'ISRC 2026, Dhaka University Research Society (Dec 2026)', datasets: ['MTL-AQA clips'],
    stack: ['Python', 'NumPy', 'SciPy', 'ffmpeg', 'Matplotlib', 'ViTPose', 'RTMPose', 'NSAQA']},
};


const defenceMatrix = [
  { label: 'topo_1', baseline: [-153.0, -113.0, -137.2, -107.0], randomised: [238.0, 238.0, 238.0, -107.0], baselineContains: false },
  { label: 'topo_2', baseline: [218.0, 218.0, 218.0, -107.0], randomised: [259.0, 259.0, 259.0, -107.0], baselineContains: true },
  { label: 'topo_3', baseline: [-139.0, -119.0, -132.2, -107.0], randomised: [248.0, 248.0, 248.0, -107.0], baselineContains: false },
  { label: 'topo_4 (unseen)', baseline: [-149.0, -124.0, -144.4, -107.0], randomised: [238.0, 238.0, 238.0, -107.0], baselineContains: false },
  { label: 'topo_5 (unseen)', baseline: [-141.0, -126.0, -140.0, -107.0], randomised: [259.0, 259.0, 259.0, -107.0], baselineContains: false },
];
const testProfiles = ['Aggressive', 'Stealthy', 'Opportunistic', 'Cloud pivot (unseen)'];

deepProjects['cyber-defense-generalization'] = {
  metrics: [
    {label: 'Familiar attacker profiles', value: '100%', caption: 'Containment with domain randomisation, including on unseen networks', tone: 'teal', icon: 'shield'},
    {label: 'Held-out mechanism', value: '0%', caption: 'Containment against the cloud pivot for both methods', tone: 'coral', icon: 'target'},
    {label: 'Baseline variability', value: '172.7', caption: 'Reward standard deviation across seeds on topo_3', tone: 'neutral', icon: 'activity'},
    {label: 'Training seeds', value: '3', caption: '20 deterministic episodes per test cell', tone: 'primary', icon: 'layers'},
  ],
  artifact: {title: 'Containment and reward on held-out tests', eyebrow: 'Table II · Single training run', split: true,
    blocks: [
      {kind: 'containment', title: 'Baseline', headers: testProfiles, rows: defenceMatrix.map(row => ({
        label: row.label, values: row.baseline, containment: row.baseline.map((_, i) => i < 3 && row.baselineContains),
      }))},
      {kind: 'containment', title: 'Domain-randomised', headers: testProfiles, rows: defenceMatrix.map(row => ({
        label: row.label, values: row.randomised, containment: row.randomised.map((_, i) => i < 3),
      }))},
    ],
  },
  sections: [
    {id: 'question', title: 'The question', base: ['question'], blocks: []},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'What we did', blocks: [
      {kind: 'steps', items: [
        {title: 'Two cooperating defenders', tools: ['Independent PPO', 'Stable-Baselines3'], body: 'A Detector flags nodes and a Responder re-images them. We trained the defenders in Microsoft CyberBattleSim in 50-step episodes against a scripted opponent.'},
        {title: 'Domain randomisation', tools: ['Procedural topologies'], body: 'Each training episode sampled a tree network with 7–10 nodes and one of three attacker profiles: aggressive, stealthy or opportunistic.'},
        {title: 'Matched baseline', body: 'We trained the same defenders on a fixed, hand-built network with seven nodes.'},
        {title: 'Held-out tests', body: 'We held out two networks and one attack mechanism. The multi-seed comparison used three training seeds, with 20 deterministic episodes per test cell.'},
      ]},
      {kind: 'figure', index: 0},
    ]},
    {id: 'findings', title: 'What we found', blocks: [
      {kind: 'list', items: [
        'The domain-randomised defenders contained every familiar attacker profile, including on both held-out networks.',
        'The baseline varied substantially across seeds. Its single-run success on topo_2 did not repeat across the three comparison seeds.',
        'Both defenders failed against the held-out mechanism across all five networks.',
      ]},
      {kind: 'figure', index: 1},
      {kind: 'table', title: 'Across 3 seeds (aggressive attacker)', headers: ['Topology', 'Baseline', 'Domain-randomised'], caption: 'Table III. Mean episode reward ± standard deviation.', rows: [
        {cells: ['topo_1', '-142.7 ± 14.6', '264.7 ± 9.4']},
        {cells: ['topo_2', '-134.7 ± 9.4', '259.0 ± 0.0']},
        {cells: ['topo_3', '-27.0 ± 172.7', '261.3 ± 9.4']},
        {cells: ['topo_4 (unseen)', '-152.0 ± 12.8', '238.0 ± 16.3']},
        {cells: ['topo_5 (unseen)', '-39.3 ± 166.2', '259.0 ± 0.0']},
      ]},
    ]},
    {id: 'limits', title: 'Limits', blocks: [{kind: 'limits', items: [
      {title: 'Small networks', body: 'The test networks had seven to ten simulated nodes.'},
      {title: 'Scripted opponent', body: 'The benchmark did not test an adaptive attacker.'},
      {title: 'One held-out mechanism', body: 'The experiment tested a single unfamiliar attack mechanism.'},
      {title: 'Three seeds', body: 'The multi-seed comparison measures variability over three training runs.'},
    ]}]},
    {id: 'reproduce', title: 'Reproduce it', base: ['reproduce'], blocks: []},
  ],
  provenance: 'Table II reports an earlier single training run. Table III reports three training seeds against the aggressive profile. The repository documents differences between the original run and the seeded reproduction.',
  dossier: {venue: 'IEEE ICCIT 2026 · Paper ID 648'},
};
