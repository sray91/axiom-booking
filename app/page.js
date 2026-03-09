import Image from "next/image";
import Link from "next/link";
import { team } from "./data/team";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <header className="mb-12 flex flex-col items-center text-center">
        <Image
          src="/axiom-dark-logo.png"
          alt="Axiom"
          width={160}
          height={48}
          className="mb-8 h-12 w-auto"
        />
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Book a Meeting
        </h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
          Select a team member to schedule time with
        </p>
      </header>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <Link
            key={member.slug}
            href={`/${member.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${member.color} text-2xl font-bold text-white`}
              >
                {member.initials}
              </div>
            )}
            <h2 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {member.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {member.role}
            </p>
            <span className="mt-5 inline-flex items-center rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-700 transition-colors group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900">
              Book a time
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
