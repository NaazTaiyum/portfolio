import { Link } from 'react-router-dom';
import { Button, CitationCard, SectionHeading, Tags, Timeline, label } from '../components/ui';
import { cv } from '../components/Shell';
import { publishedProjects } from '../data/catalog';
import { education, person, publications, skills } from '../data/site';
import { Certifications, Experience, Languages } from './About';
import { ConferenceList } from './Research';

const researchProjects = publishedProjects.filter(project => project.tier === 'research');

export default function CV() {
  return <article className="cv mx-auto max-w-[1000px]">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
      <div><p className={label}>CV</p><h1>{person.name}</h1><p className="mt-2 text-muted">{person.tagline}</p></div>
    </header>
    {cv && <div className="sticky top-22 z-10 mb-5 flex justify-end print:hidden"><Button href={cv} variant="primary">Download PDF</Button></div>}
    <div className="grid gap-6 md:grid-cols-[90px_minmax(0,1fr)]">
      <aside aria-label="Timeline years" className="hidden md:block print:hidden"><ol className={label + ' sticky top-38 space-y-5 border-l border-line pl-3'}>
        {['2026', '2022', '2020', '2018', '2016'].map(year => <li key={year}>{year}</li>)}
      </ol></aside>
      <div className="space-y-8">
        <section><SectionHeading>Education</SectionHeading><Timeline>{education.map(item => <li key={item.degree}>
          <p className={label}>{item.dates}</p><h3>{item.degree}</h3><p>{item.school}{item.location && ` · ${item.location}`}</p>
          <p className="text-sm text-muted">{item.result}</p>
          {item.coursework && <div className="mt-2"><Tags values={item.coursework} /></div>}
        </li>)}</Timeline></section>
        <section className="space-y-4"><SectionHeading>Publications</SectionHeading><ConferenceList coauthored /><div className="space-y-3">{publications.map(publication =>
          <CitationCard key={publication.title} publication={publication} compact />)}</div></section>
        <section><SectionHeading>Conference papers and talks</SectionHeading><ConferenceList /></section>
        <section><SectionHeading>Research projects</SectionHeading><ul className="divide-y divide-line border-y border-line">
          {researchProjects.map(project => <li key={project.slug} className="flex flex-wrap justify-between gap-2 py-2">
            <Link to={`/projects/${project.slug}`}>{project.shortTitle}</Link><span className={label}>{project.dates}</span>
          </li>)}
        </ul></section>
        <section><SectionHeading>Certifications</SectionHeading><Certifications /></section>
        <section><SectionHeading>Volunteering and leadership</SectionHeading><Experience /></section>
        <section><SectionHeading>Skills</SectionHeading><dl className="space-y-3">{Object.entries(skills).map(([name, values]) =>
          <div key={name}><dt className="mb-1 font-semibold">{name}</dt><dd><Tags values={values} /></dd></div>)}</dl></section>
        <section><SectionHeading>Languages</SectionHeading><Languages /></section>
        <p>References available on request.</p>
      </div>
    </div>
  </article>;
}
