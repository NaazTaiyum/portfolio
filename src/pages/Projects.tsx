import { useSearchParams } from 'react-router-dom';
import { Button, FilterChips, ProjectCard, SectionHeading, label, panel } from '../components/ui';
import { cv } from '../components/Shell';
import { publishedProjects } from '../data/catalog';
import { person } from '../data/site';

const tiers = [
  { value: '', label: 'All' }, { value: 'research', label: 'Research' },
  { value: 'software', label: 'Software' }, { value: 'engineering', label: 'Engineering' },
].filter(option => !option.value || publishedProjects.some(project => project.tier === option.value));

const topics = [...new Set(publishedProjects.flatMap(project => project.tags))]
  .sort().map(tag => ({ value: tag, label: tag }));

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const tier = tiers.find(option => option.value === params.get('tier'))?.value ?? '';
  const tag = topics.find(option => option.value === params.get('tag'))?.value ?? '';
  function update(key: 'tier' | 'tag', value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }
  const filtered = publishedProjects.filter(project => (!tier || project.tier === tier) && (!tag || project.tags.includes(tag)));
  const featured = filtered.filter(project => project.featured);
  const remaining = filtered.filter(project => !featured.includes(project));
  return <div className="mx-auto max-w-[1120px] space-y-8">
    <header className="space-y-3 border-b border-line pb-6">
      <p className={label}>Projects</p>
      <h1>Things I've built and questions I've asked</h1>
      <p className="max-w-3xl text-muted">I built a federated intrusion detector for my final-year project and contributed statistical analysis to a study of the fly compass connectome.</p>
    </header>
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {tiers.length > 2 && <FilterChips name="Project tier" options={tiers} value={tier} onChange={value => update('tier', value)} />}
        <p className={label} role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
      </div>
      <FilterChips name="Project topic" options={[{ value: '', label: 'All topics' }, ...topics]} value={tag}
        onChange={value => update('tag', value === tag ? '' : value)} />
    </div>
    {!!featured.length && <section aria-labelledby="featured-projects" className={featured.length === 3 ? 'grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]' : 'grid items-start gap-4 md:grid-cols-2'}>
      <h2 id="featured-projects" className="sr-only">Featured projects</h2>
      {featured.map((project, index) => <ProjectCard key={project.slug} project={project} variant="featured"
        placement={featured.length === 3 ? (index === 0 ? 'lead' : 'support') : undefined} />)}
    </section>}
    {!!remaining.length && <section>
      <SectionHeading>More projects</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {remaining.map(project => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>}
    <aside className={panel + ' flex flex-wrap items-center justify-between gap-4 bg-tint p-5'}>
      <p className="font-heading text-headline-md">More about my research</p>
      <div className="flex flex-wrap gap-2"><Button to="/cv">View CV</Button>{cv && <Button href={cv}>Download CV (PDF)</Button>}
        <Button href={person.links.arxiv} variant="primary">Read the preprint</Button></div>
    </aside>
  </div>;
}
