import { Button, SectionHeading, Timeline, label, panel } from '../components/ui';
import { publishedExperience } from '../data/catalog';
import { certifications, home, languages } from '../data/site';
import { photos } from '../data/photos';
import { PhotoImage } from '../components/PhotoImage';

export function Experience() {
  return <Timeline>{publishedExperience.map(entry => <li key={entry.org} className="space-y-1">
    {entry.dates && <p className={label}>{entry.dates}</p>}
    <h3>{entry.role}</h3><p className="text-sm text-muted">{entry.org}</p>
    <ul className="list-disc space-y-1 pl-5">{entry.points.map(point => <li key={point}>{point}</li>)}</ul>
  </li>)}</Timeline>;
}

export function Certifications() {
  return <Timeline>{certifications.map(item => <li key={item.issuer} className="space-y-1">
    <p className={label}>{item.date}</p>
    <h3>{item.issuer}</h3><p>{item.title}</p><p className="text-sm text-muted">{item.note}</p>
  </li>)}</Timeline>;
}

export function Languages() {
  return <div className={panel + ' overflow-hidden'}>
    <table className="w-full border-collapse text-left text-sm">
      <thead className="bg-tint"><tr><th scope="col" className="p-3">Language or skill</th><th scope="col" className="p-3">Level</th></tr></thead>
      <tbody>{languages.map(item => <tr key={item.skill} className="border-t border-line">
        <th scope="row" className="p-3 font-semibold">{item.skill}</th><td className="p-3">{item.level}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}

export default function About() {
  return <div className="mx-auto max-w-[1120px] space-y-9">
    <header className="max-w-3xl space-y-3"><h1>About</h1><p>{home.heroBody}</p></header>
    <section><SectionHeading>Volunteering and leadership</SectionHeading><Experience /></section>
    <section><SectionHeading>Certifications</SectionHeading><Certifications /></section>
    <section><SectionHeading>Languages</SectionHeading><Languages /></section>
    {photos.length >= 3 && <section><SectionHeading>Photography</SectionHeading>
      <div className="mb-4 grid grid-cols-3 items-start gap-3">{photos.slice(0, 3).map(photo =>
        <PhotoImage key={photo.src800} photo={photo} sizes="33vw" className="rounded-lg border border-line" />)}</div>
      <Button to="/photography">See more photos →</Button>
    </section>}
  </div>;
}
