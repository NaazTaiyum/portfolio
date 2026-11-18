import { CitationCard, SectionHeading, StatusPill, Timeline, label } from '../components/ui';
import { publishedConferences } from '../data/catalog';
import { publications } from '../data/site';
import { Interests } from './Home';

export function ConferenceList() {
  return <Timeline>{publishedConferences.map(entry => <li key={entry.title} className="space-y-2">
    <div className="flex flex-wrap items-center gap-2">
      <p className={label}>{entry.dates}</p><StatusPill>{entry.status}</StatusPill>
    </div>
    <h3>{entry.title}</h3>
    <p className="text-sm text-muted">{entry.venue}</p>
    {entry.role && <p className="text-sm">{entry.role}</p>}
  </li>)}</Timeline>;
}

export default function Research() {
  return <div className="mx-auto max-w-[1120px] space-y-10">
    <header className="space-y-3 border-b border-line pb-5"><p className={label}>Research</p><h1>Questions I’m working on</h1></header>
    <section><SectionHeading>Research interests</SectionHeading><Interests /></section>
    <section><SectionHeading>Publications</SectionHeading>
      {publications.map(publication => <CitationCard key={publication.title} publication={publication} />)}
    </section>
    <section><SectionHeading>Conference papers and talks</SectionHeading><ConferenceList /></section>
    <section className="rounded-lg bg-tint p-5"><SectionHeading>How I work</SectionHeading>
      <ul className="flex flex-wrap gap-x-6 gap-y-2"><li>Keep data local</li><li>Report what doesn’t work</li><li>Write it down</li></ul>
    </section>
  </div>;
}
