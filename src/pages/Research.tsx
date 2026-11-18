import { Link } from 'react-router-dom';
import { CitationCard, SectionHeading, StatusPill, Timeline, label } from '../components/ui';
import { publishedConferences } from '../data/catalog';
import { publications } from '../data/site';
import { Interests } from './Home';

export function ConferenceList({ coauthored = false }: { coauthored?: boolean }) {
  return <Timeline>{publishedConferences.filter(entry => Boolean(entry.authors) === coauthored).map(entry => <li key={entry.title} className="space-y-2">
    <div className="flex flex-wrap items-center gap-2">
      <p className={label}>{entry.dates}</p><StatusPill>{entry.badge ?? entry.status}{!entry.badge && entry.status === 'Accepted' && <span className="sr-only"> for oral presentation</span>}</StatusPill>
    </div>
    <h3>{entry.title}</h3>
    <p className="text-sm text-muted">{entry.venue}</p>
    {entry.authors && <p className="text-sm">{entry.authors}</p>}
    {entry.note && <p className="text-sm text-muted">{entry.note}</p>}
    {entry.role && <p className="text-sm">{entry.role}</p>}
    {(entry.project || entry.code) && <p className="flex flex-wrap gap-4 text-sm">
      {entry.project && <Link to={`/projects/${entry.project}`}>Project details</Link>}
      {entry.code && <a href={entry.code}>Code</a>}
    </p>}
  </li>)}</Timeline>;
}

export default function Research() {
  return <div className="mx-auto max-w-[1120px] space-y-10">
    <header className="space-y-3 border-b border-line pb-5"><p className={label}>Research</p><h1>Questions I’m working on</h1></header>
    <section><SectionHeading>Research interests</SectionHeading><Interests /></section>
    <section className="space-y-4"><SectionHeading>Publications</SectionHeading>
      <ConferenceList coauthored />
      {publications.map(publication => <CitationCard key={publication.title} publication={publication} />)}
    </section>
    <section><SectionHeading>Conference papers and talks</SectionHeading><ConferenceList /></section>
    <section className="rounded-lg bg-tint p-5"><SectionHeading>How I work</SectionHeading>
      <ul className="flex flex-wrap gap-x-6 gap-y-2"><li>Keep data local</li><li>Report what doesn’t work</li><li>Write it down</li></ul>
    </section>
  </div>;
}
