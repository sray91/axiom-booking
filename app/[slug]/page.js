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
  return { title: `Book with ${member.name}` };
}

export default async function BookingPage({ params }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-center gap-4 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </Link>
        <div className="flex items-center gap-3">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${member.color} text-xs font-bold text-white`}
            >
              {member.initials}
            </div>
          )}
          <div>
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {member.name}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {member.role}
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <iframe
          src={member.calendarUrl}
          className="h-[700px] w-full max-w-3xl rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800"
          frameBorder="0"
          title={`Book a meeting with ${member.name}`}
        />
      </main>
    </div>
  );
}
