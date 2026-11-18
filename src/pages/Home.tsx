import { Link } from 'react-router-dom';
import { Button, CitationCard, Figure, ProjectCard, SectionHeading, StatTile, label, panel } from '../components/ui';
import { cv, email } from '../components/Shell';
import { projectBySlug, publishedConferences, publishedProjects } from '../data/catalog';
import { asset, hasAsset } from '../data/assets';
import { home, person, publications, researchInterests } from '../data/site';

export function Interests() {
  return <div className="grid gap-4 md:grid-cols-3">{researchInterests.map((interest) => <article className={panel + ' p-5'} key={interest.title}>
    <h3>{interest.title}</h3>
    <p className="mt-2 text-muted">{interest.body}</p>
  </article>)}</div>;
}

export default function Home() {
  const [cgpa, preprint, records] = home.stats;
  const stats = [cgpa, preprint, { value: String(publishedConferences.length), label: 'conference papers and talks' }, records];
  const now = [...home.now, ...publishedConferences.flatMap(entry => entry.now ? [entry.now] : [])];
  const figure = projectBySlug('fly-connectome')?.figures?.[0];
  const showFigure = figure && hasAsset(figure.src);
  return <div className="mx-auto max-w-[1120px] space-y-12">
    <section className={`grid items-start gap-7 ${showFigure ? 'md:grid-cols-[1.4fr_1fr]' : ''}`}>
      <div className="space-y-5">
        <p className={label}>{person.name} · Cumilla</p>
        <h1 className="md:text-[42px]">{home.heroTitle}</h1>
        <p className="max-w-3xl text-muted">{home.heroBody}</p>
        <div className="flex flex-wrap gap-2">
          <Button to="/projects" variant="primary">View projects</Button>
          <Button href={person.links.arxiv}>Read the preprint</Button>
          {cv && <Button href={cv}>Download CV</Button>}
        </div>
      </div>
      {showFigure && <Figure figure={{ ...figure, caption: 'Figure from arXiv:2610.29205' }} priority />}
      {hasAsset('portrait.jpg') && <img src={asset('portrait.jpg')} alt={person.name} className="w-full max-w-60 rounded-lg" />}
    </section>
    <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">{stats.map(stat => <StatTile key={stat.label} stat={stat} />)}</dl>
    <section><SectionHeading>Research questions</SectionHeading><Interests /></section>
    <section>
      <div className="flex flex-wrap justify-between gap-2"><SectionHeading>Featured work</SectionHeading><Link to="/projects">All projects →</Link></div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">{publishedProjects.filter(project => project.featured).map((project, index) =>
        <ProjectCard key={project.slug} project={project} variant="featured" placement={index === 0 ? 'lead' : 'support'} />)}</div>
    </section>
    <section><SectionHeading>Latest preprint</SectionHeading><CitationCard publication={publications[0]} /></section>
    <section className={panel + ' p-5'}><SectionHeading>Now, Nov 2026</SectionHeading>
      <ul className="list-disc space-y-2 pl-5">{now.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-tint p-5">
      <h2>Working on something related? I'd like to hear about it.</h2>
      <div className="flex gap-2"><Button href={email} variant="primary">Email</Button><Button to="/cv">CV</Button></div>
    </section>
  </div>;
}
