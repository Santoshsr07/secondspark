import Link from "next/link";

const paths = [
  {
    icon: "🔧",
    title: "Repair",
    description: "Find out whether your device may still be worth fixing.",
  },
  {
    icon: "♻️",
    title: "Reuse",
    description: "Discover ways to give an unwanted device a second life.",
  },
  {
    icon: "🔐",
    title: "Protect Data",
    description: "Follow safer steps before selling, donating, or recycling.",
  },
  {
    icon: "🌱",
    title: "Recycle",
    description: "Find the responsible path when a device reaches end of life.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us about your device",
    description:
      "Enter basic information about the device, its age, condition, and known problems.",
  },
  {
    number: "02",
    title: "Understand your options",
    description:
      "SECONDSPARK evaluates the available information and identifies the most responsible next step.",
  },
  {
    number: "03",
    title: "Take responsible action",
    description:
      "Get practical guidance for repair, reuse, data safety, or responsible recycling.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* Navigation */}
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-lg shadow-lg dark:bg-white">
            ⚡
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">SECONDSPARK</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Give it another life
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-300">
          <a href="#how-it-works" className="transition hover:text-zinc-950 dark:hover:text-white">
            How it works
          </a>

          <a href="#paths" className="transition hover:text-zinc-950 dark:hover:text-white">
            What we help with
          </a>

          <a
            href="#start"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="start"
        className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-6 py-20 lg:px-8"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Hero copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Intelligent e-waste guidance
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Don't throw it away.
              <span className="mt-2 block text-zinc-400 dark:text-zinc-500">
                Give it a second chance.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              SECONDSPARK helps you understand what to do with an old,
              damaged, or unwanted electronic device — from repair and reuse
              to secure data erasure and responsible recycling.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#assessment"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-zinc-900 px-7 font-semibold text-white shadow-xl shadow-zinc-900/10 transition hover:-translate-y-0.5 hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Assess My Device
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#how-it-works"
                className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-200 px-7 font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-500">
              <span>♻️ Reuse first</span>
              <span>🔐 Protect your data</span>
              <span>🌱 Recycle responsibly</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 shadow-2xl shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="rounded-[1.5rem] bg-white p-6 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Device assessment
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      Your old laptop
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-xl dark:bg-zinc-900">
                    💻
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-zinc-500">Reuse potential</span>
                      <span className="font-semibold">High</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[82%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-zinc-500">Repair potential</span>
                      <span className="font-semibold">Good</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[68%] rounded-full bg-blue-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-zinc-500">Recycle need</span>
                      <span className="font-semibold">Low</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[32%] rounded-full bg-amber-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Recommended path
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-bold">Repair → Reuse</p>
                    <span className="text-xl">✨</span>
                  </div>

                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    This device may still have useful life left.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs text-zinc-500">SECONDSPARK principle</p>
              <p className="mt-1 font-semibold">Reuse before replace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Paths */}
      <section
        id="paths"
        className="border-y border-zinc-100 bg-zinc-50 py-24 dark:border-zinc-900 dark:bg-zinc-900/40"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              One device. Multiple possibilities.
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              SECONDSPARK helps you choose what comes next.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((path) => (
              <div
                key={path.title}
                className="rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl dark:bg-zinc-900">
                  {path.icon}
                </div>

                <h3 className="mt-6 text-lg font-semibold">{path.title}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {path.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Simple by design
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From unwanted device to responsible action.
          </h2>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            You don't need to know everything about electronics. SECONDSPARK
            guides you through the decision.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-6xl font-bold tracking-tight text-zinc-100 dark:text-zinc-900">
                {step.number}
              </span>

              <h3 className="relative -mt-5 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-500 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment CTA */}
      <section id="assessment" className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-zinc-900 px-8 py-16 text-center text-white dark:bg-white dark:text-zinc-950 sm:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Your device deserves a decision
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to give your device a second chance?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-400 dark:text-zinc-500">
            Start with a simple assessment. We'll build the intelligence
            behind this experience next.
          </p>

          <button
            type="button"
            className="mt-8 rounded-full bg-white px-7 py-3.5 font-semibold text-zinc-950 transition hover:bg-zinc-200 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800"
          >
            Start Device Assessment →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-6 py-8 dark:border-zinc-900 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 SECONDSPARK. Give electronics a second life.</p>

          <p>Reuse • Repair • Protect • Recycle</p>
        </div>
      </footer>
    </main>
  );
}