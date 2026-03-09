import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { team } from "../data/team";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }) {
  const member = team.find((m) => m.slug === params.slug);
  if (!member) return {};
  return { title: `Book with ${member.name} | Axiom` };
}

export default async function BookingPage({ params }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      {/* Top nav with centered logo */}
      <header className="flex items-center justify-center border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <Link href="/">
          <Image
            src="/axiom-logo.png"
            alt="Axiom"
            width={160}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
      </header>

      {/* Landing page content */}
      <main className="flex flex-1 flex-col lg:flex-row">
        {/* Left panel — info */}
        <div className="flex flex-col items-center justify-center gap-6 px-8 py-12 lg:w-[420px] lg:items-start lg:border-r lg:border-zinc-200 lg:px-12 lg:py-16 dark:lg:border-zinc-800">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={160}
              height={160}
              className="h-40 w-40 rounded-2xl object-cover shadow-md"
            />
          ) : (
            <div
              className={`flex h-40 w-40 items-center justify-center rounded-2xl ${member.color} text-4xl font-bold text-white shadow-md`}
            >
              {member.initials}
            </div>
          )}

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {member.name}
            </h1>
            <p className="mt-1 text-lg font-medium text-zinc-500 dark:text-zinc-400">
              {member.role}
            </p>
          </div>

          <p className="max-w-sm whitespace-pre-line text-center text-base leading-relaxed text-zinc-600 lg:text-left dark:text-zinc-400">
            {member.bio}
          </p>

          <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            30 min meeting
          </div>
        </div>

        {/* Right panel — calendar */}
        <div className="flex min-h-[700px] flex-1 items-stretch p-4 lg:p-8">
          <iframe
            src={member.calendarUrl}
            className="w-full flex-1 rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800"
            style={{ border: 0 }}
            title={`Book a meeting with ${member.name}`}
          />
        </div>
      </main>
    </div>
  );
}
