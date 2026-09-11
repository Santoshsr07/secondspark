"use client";

import Link from "next/link";
import { useState } from "react";

type DeviceType =
  | "Laptop"
  | "Smartphone"
  | "Tablet"
  | "Desktop"
  | "Gaming Console"
  | "TV"
  | "Other";

type Condition =
  | "Works normally"
  | "Works with problems"
  | "Barely works"
  | "Doesn't work"
  | "Physically damaged";

type Intent =
  | "Keep using it"
  | "Repair it"
  | "Sell / donate it"
  | "Recycle it"
  | "I'm not sure";

interface AssessmentData {
  deviceType: DeviceType | "";
  brand: string;
  model: string;
  age: string;
  condition: Condition | "";
  problem: string;
  intent: Intent | "";
}

const devices: {
  type: DeviceType;
  icon: string;
  description: string;
}[] = [
  {
    type: "Laptop",
    icon: "💻",
    description: "Portable computers",
  },
  {
    type: "Smartphone",
    icon: "📱",
    description: "Phones & mobile devices",
  },
  {
    type: "Tablet",
    icon: "📟",
    description: "Tablets & e-readers",
  },
  {
    type: "Desktop",
    icon: "🖥️",
    description: "Desktop computers",
  },
  {
    type: "Gaming Console",
    icon: "🎮",
    description: "Consoles & gaming devices",
  },
  {
    type: "TV",
    icon: "📺",
    description: "Televisions & displays",
  },
  {
    type: "Other",
    icon: "🔌",
    description: "Other electronics",
  },
];

const conditions: {
  value: Condition;
  description: string;
}[] = [
  {
    value: "Works normally",
    description: "Everything works as expected.",
  },
  {
    value: "Works with problems",
    description: "It works, but something isn't right.",
  },
  {
    value: "Barely works",
    description: "It works occasionally or very slowly.",
  },
  {
    value: "Doesn't work",
    description: "It won't turn on or function.",
  },
  {
    value: "Physically damaged",
    description: "Cracked, broken, dented, or visibly damaged.",
  },
];

const intents: {
  value: Intent;
  icon: string;
  description: string;
}[] = [
  {
    value: "Keep using it",
    icon: "♻️",
    description: "I want to keep using it.",
  },
  {
    value: "Repair it",
    icon: "🔧",
    description: "I'd like to fix it.",
  },
  {
    value: "Sell / donate it",
    icon: "🤝",
    description: "I want someone else to use it.",
  },
  {
    value: "Recycle it",
    icon: "🌱",
    description: "I think it's ready for recycling.",
  },
  {
    value: "I'm not sure",
    icon: "✨",
    description: "Help me decide.",
  },
];

export default function AssessPage() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState<AssessmentData>({
    deviceType: "",
    brand: "",
    model: "",
    age: "",
    condition: "",
    problem: "",
    intent: "",
  });

  const updateData = <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K]
  ) => {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const canContinue = () => {
    if (step === 1) return Boolean(data.deviceType);

    if (step === 2) {
      return Boolean(data.brand.trim() && data.model.trim() && data.age.trim());
    }

    if (step === 3) return Boolean(data.condition);

    if (step === 4) return Boolean(data.intent);

    return false;
  };

  const nextStep = () => {
    if (!canContinue()) return;

    setStep((previous) => Math.min(previous + 1, 5));
  };

  const previousStep = () => {
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const resetAssessment = () => {
    setData({
      deviceType: "",
      brand: "",
      model: "",
      age: "",
      condition: "",
      problem: "",
      intent: "",
    });

    setStep(1);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <AssessmentHeader step={step} />

      {step <= 4 && (
        <ProgressIndicator
          currentStep={step}
          totalSteps={4}
        />
      )}

      {step <= 4 ? (
        <section className="mx-auto flex min-h-[calc(100vh-145px)] max-w-5xl flex-col px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex-1">
            {step === 1 && (
              <DeviceStep
                value={data.deviceType}
                onChange={(value) =>
                  updateData("deviceType", value)
                }
              />
            )}

            {step === 2 && (
              <DetailsStep
                data={data}
                updateData={updateData}
              />
            )}

            {step === 3 && (
              <ConditionStep
                value={data.condition}
                problem={data.problem}
                updateData={updateData}
              />
            )}

            {step === 4 && (
              <IntentStep
                value={data.intent}
                onChange={(value) =>
                  updateData("intent", value)
                }
              />
            )}
          </div>

          <AssessmentNavigation
            step={step}
            canContinue={canContinue()}
            onBack={previousStep}
            onNext={nextStep}
          />
        </section>
      ) : (
        <AssessmentResult
          data={data}
          onReset={resetAssessment}
        />
      )}
    </main>
  );
}

/* ================================================= */
/* HEADER */
/* ================================================= */

function AssessmentHeader({ step }: { step: number }) {
  return (
    <header className="border-b border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-base shadow-lg transition group-hover:-translate-y-0.5 dark:bg-white">
            <span className="dark:invert">⚡</span>
          </div>

          <div>
            <p className="font-bold tracking-tight">
              SECONDSPARK
            </p>

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 sm:block">
              Device assessment
            </p>
          </div>
        </Link>

        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {step <= 4 ? "Assessment" : "Complete"}
          </p>

          <p className="mt-0.5 text-sm font-semibold">
            {step <= 4 ? `${step} / 4` : "✓"}
          </p>
        </div>
      </div>
    </header>
  );
}

/* ================================================= */
/* PROGRESS */
/* ================================================= */

function ProgressIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const labels = ["Device", "Details", "Condition", "Intent"];

  return (
    <div className="border-b border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto max-w-5xl px-5 py-5 sm:px-8">
        <div className="flex items-center">
          {labels.map((label, index) => {
            const number = index + 1;
            const active = number <= currentStep;

            return (
              <div
                key={label}
                className="flex flex-1 items-center"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                      active
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-900"
                    }`}
                  >
                    {number < currentStep ? "✓" : number}
                  </div>

                  <span
                    className={`hidden text-xs font-medium sm:block ${
                      active
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>

                {number !== totalSteps && (
                  <div
                    className={`mx-3 h-px flex-1 transition ${
                      number < currentStep
                        ? "bg-zinc-900 dark:bg-white"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* STEP 1 */
/* ================================================= */

function DeviceStep({
  value,
  onChange,
}: {
  value: DeviceType | "";
  onChange: (value: DeviceType) => void;
}) {
  return (
    <div className="animate-[fadeIn_.35s_ease-out]">
      <StepHeading
        eyebrow="01 — Device"
        title="What are we giving a second chance?"
        description="Choose the type of electronic device you want SECONDSPARK to assess."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <button
            key={device.type}
            type="button"
            onClick={() => onChange(device.type)}
            className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition duration-200 ${
              value === device.type
                ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10 dark:bg-emerald-950/20"
                : "border-zinc-200 bg-white hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl transition group-hover:scale-105 dark:bg-zinc-900">
                {device.icon}
              </div>

              <SelectionIndicator selected={value === device.type} />
            </div>

            <h2 className="mt-6 font-semibold">
              {device.type}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {device.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================= */
/* STEP 2 */
/* ================================================= */

function DetailsStep({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K]
  ) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="02 — Details"
        title="Tell us a little more."
        description="These details help us understand the device and make a more useful recommendation."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Input
          label="Brand"
          required
          placeholder="e.g. HP, Apple, Samsung"
          value={data.brand}
          onChange={(value) => updateData("brand", value)}
        />

        <Input
          label="Model"
          required
          placeholder="e.g. Pavilion 15, iPhone 13"
          value={data.model}
          onChange={(value) => updateData("model", value)}
        />

        <Input
          label="Approximate age"
          required
          placeholder="e.g. 3 years"
          value={data.age}
          onChange={(value) => updateData("age", value)}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-950/20">
        <div className="flex gap-3">
          <span className="text-lg">💡</span>

          <div>
            <p className="text-sm font-semibold">
              Why do we ask?
            </p>

            <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Device age, model, and condition can influence whether
              repair, continued use, or recycling makes the most sense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* STEP 3 */
/* ================================================= */

function ConditionStep({
  value,
  problem,
  updateData,
}: {
  value: Condition | "";
  problem: string;
  updateData: <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K]
  ) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="03 — Condition"
        title="How is it doing?"
        description="Tell us what the device is like today. An honest answer gives us a better starting point."
      />

      <div className="mt-10 space-y-3">
        {conditions.map((condition) => (
          <button
            key={condition.value}
            type="button"
            onClick={() =>
              updateData("condition", condition.value)
            }
            className={`flex w-full items-center gap-5 rounded-2xl border p-5 text-left transition ${
              value === condition.value
                ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
                : "border-zinc-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700"
            }`}
          >
            <SelectionIndicator
              selected={value === condition.value}
            />

            <div>
              <p className="font-semibold">
                {condition.value}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {condition.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <label className="text-sm font-semibold">
          What's wrong with it?
          <span className="ml-2 font-normal text-zinc-400">
            Optional
          </span>
        </label>

        <textarea
          value={problem}
          onChange={(event) =>
            updateData("problem", event.target.value)
          }
          placeholder="Battery problems, cracked screen, overheating, slow performance..."
          rows={4}
          className="mt-3 w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-900"
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* STEP 4 */
/* ================================================= */

function IntentStep({
  value,
  onChange,
}: {
  value: Intent | "";
  onChange: (value: Intent) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="04 — Intent"
        title="What would you like to do?"
        description="Don't worry if you're unsure. That's exactly what SECONDSPARK is here to help with."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {intents.map((intent) => (
          <button
            key={intent.value}
            type="button"
            onClick={() => onChange(intent.value)}
            className={`group rounded-3xl border p-6 text-left transition ${
              value === intent.value
                ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/10 dark:bg-purple-950/20"
                : "border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">
                {intent.icon}
              </span>

              <SelectionIndicator
                selected={value === intent.value}
              />
            </div>

            <p className="mt-6 font-semibold">
              {intent.value}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              {intent.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================= */
/* NAVIGATION */
/* ================================================= */

function AssessmentNavigation({
  step,
  canContinue,
  onBack,
  onNext,
}: {
  step: number;
  canContinue: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-900">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1}
        className="rounded-full px-5 py-3 text-sm font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none disabled:opacity-0 dark:hover:bg-zinc-900 dark:hover:text-white"
      >
        ← Back
      </button>

      <div className="flex items-center gap-4">
        {!canContinue && (
          <span className="hidden text-xs text-zinc-400 sm:block">
            Complete this step to continue
          </span>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="rounded-full bg-zinc-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition hover:-translate-y-0.5 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {step === 4
            ? "Get My Assessment →"
            : "Continue →"}
        </button>
      </div>
    </div>
  );
}

/* ================================================= */
/* RESULT */
/* ================================================= */

function AssessmentResult({
  data,
  onReset,
}: {
  data: AssessmentData;
  onReset: () => void;
}) {
  const recommendation = calculateRecommendation(data);

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <span>✓</span>
                Assessment complete
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                Your device has options.
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
                Based on the information you provided, here's the
                direction we recommend starting with.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm dark:bg-zinc-950">
              {getDeviceIcon(data.deviceType)}
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-3xl bg-white p-7 shadow-sm dark:bg-zinc-950 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Recommended path
              </p>

              <div className="mt-5 flex items-start gap-4">
                <span className="text-4xl">
                  {recommendation.icon}
                </span>

                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {recommendation.title}
                  </h2>

                  <p className="mt-3 leading-7 text-zinc-500">
                    {recommendation.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Assessment summary
              </p>

              <div className="mt-5 space-y-4">
                <SummaryRow
                  label="Device"
                  value={data.deviceType}
                />

                <SummaryRow
                  label="Brand"
                  value={data.brand}
                />

                <SummaryRow
                  label="Model"
                  value={data.model}
                />

                <SummaryRow
                  label="Condition"
                  value={data.condition}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/30 dark:bg-emerald-950/20">
            <div className="flex gap-4">
              <span className="text-xl">🌱</span>

              <div>
                <h3 className="font-semibold">
                  Remember the SECONDSPARK principle
                </h3>

                <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  Reuse and repair should be considered before
                  disposal whenever practical. If recycling becomes
                  the right choice, protect your data first.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition hover:bg-white dark:border-zinc-800 dark:hover:bg-zinc-950"
            >
              Start another assessment
            </button>

            <Link
              href="/"
              className="rounded-full bg-zinc-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Back to SECONDSPARK
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================= */
/* REUSABLE COMPONENTS */
/* ================================================= */

function StepHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
        {eyebrow}
      </p>

      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function SelectionIndicator({
  selected,
}: {
  selected: boolean;
}) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition ${
        selected
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-zinc-300 dark:border-zinc-700"
      }`}
    >
      {selected && "✓"}
    </span>
  );
}

function Input({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}

        {required && (
          <span className="ml-1 text-emerald-600">*</span>
        )}
      </label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-900"
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-3 last:border-0 last:pb-0 dark:border-zinc-900">
      <span className="text-sm text-zinc-400">
        {label}
      </span>

      <span className="text-right text-sm font-semibold">
        {value || "Not provided"}
      </span>
    </div>
  );
}

/* ================================================= */
/* ASSESSMENT ENGINE — TEMPORARY */
/* ================================================= */

function calculateRecommendation(data: AssessmentData) {
  if (
    data.condition === "Works normally" &&
    (data.intent === "Keep using it" ||
      data.intent === "I'm not sure")
  ) {
    return {
      icon: "♻️",
      title: "Keep using / Reuse",
      description:
        "Your device appears to be functioning normally. Continuing to use it is likely the most sustainable option.",
    };
  }

  if (
    data.condition === "Works with problems" ||
    data.condition === "Barely works"
  ) {
    return {
      icon: "🔧",
      title: "Repair → Reuse",
      description:
        "Your device may still have useful life left. Consider diagnosing the issue and exploring repair before recycling it.",
    };
  }

  if (data.condition === "Doesn't work") {
    return {
      icon: "🌱",
      title: "Evaluate → Recycle",
      description:
        "The device is currently non-functional. Consider whether repair is practical; if not, responsible recycling may be the better option.",
    };
  }

  if (data.condition === "Physically damaged") {
    return {
      icon: "🔐",
      title: "Protect Data → Evaluate",
      description:
        "Before selling, donating, repairing, or recycling a damaged device, protect your personal data and then determine whether repair or recycling makes more sense.",
    };
  }

  return {
    icon: "✨",
    title: "Assess → Choose Responsibly",
    description:
      "More information may be needed before making a strong recommendation.",
  };
}

function getDeviceIcon(device: DeviceType | "") {
  switch (device) {
    case "Laptop":
      return "💻";
    case "Smartphone":
      return "📱";
    case "Tablet":
      return "📟";
    case "Desktop":
      return "🖥️";
    case "Gaming Console":
      return "🎮";
    case "TV":
      return "📺";
    default:
      return "🔌";
  }
}