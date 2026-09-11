"use client";

import { useState } from "react";
import Link from "next/link";

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

const devices: DeviceType[] = [
  "Laptop",
  "Smartphone",
  "Tablet",
  "Desktop",
  "Gaming Console",
  "TV",
  "Other",
];

const conditions: Condition[] = [
  "Works normally",
  "Works with problems",
  "Barely works",
  "Doesn't work",
  "Physically damaged",
];

const intents: Intent[] = [
  "Keep using it",
  "Repair it",
  "Sell / donate it",
  "Recycle it",
  "I'm not sure",
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

  const updateData = (field: keyof AssessmentData, value: string) => {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep((previous) => previous + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((previous) => previous - 1);
    }
  };

  const resetAssessment = () => {
    setStep(1);

    setData({
      deviceType: "",
      brand: "",
      model: "",
      age: "",
      condition: "",
      problem: "",
      intent: "",
    });
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* Header */}
      <header className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-sm dark:bg-white">
              ⚡
            </div>

            <span className="font-bold tracking-tight">SECONDSPARK</span>
          </Link>

          <div className="text-sm text-zinc-500">
            Assessment {step} of 4
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main */}
      <section className="mx-auto flex min-h-[calc(100vh-130px)] max-w-3xl flex-col px-6 py-12">
        {step === 1 && (
          <StepOne
            value={data.deviceType}
            onChange={(value) => updateData("deviceType", value)}
          />
        )}

        {step === 2 && (
          <StepTwo
            data={data}
            updateData={updateData}
          />
        )}

        {step === 3 && (
          <StepThree
            data={data}
            updateData={updateData}
          />
        )}

        {step === 4 && (
          <StepFour
            value={data.intent}
            onChange={(value) => updateData("intent", value)}
          />
        )}

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-8 dark:border-zinc-900">
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 1}
            className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            ← Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-zinc-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(5)}
              className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Get My Assessment →
            </button>
          )}
        </div>
      </section>

      {/* Result */}
      {step === 5 && (
        <AssessmentResult data={data} onReset={resetAssessment} />
      )}
    </main>
  );
}

/* ------------------------------------------------ */
/* Step 1 */
/* ------------------------------------------------ */

function StepOne({
  value,
  onChange,
}: {
  value: DeviceType | "";
  onChange: (value: DeviceType) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
        Step 01
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        What device are you assessing?
      </h1>

      <p className="mt-4 text-lg leading-7 text-zinc-500">
        Start with the basics. Choose the device you want SECONDSPARK to
        evaluate.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {devices.map((device) => (
          <OptionCard
            key={device}
            selected={value === device}
            onClick={() => onChange(device)}
            icon={getDeviceIcon(device)}
            title={device}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* Step 2 */
/* ------------------------------------------------ */

function StepTwo({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: (field: keyof AssessmentData, value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        Step 02
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Tell us about your device.
      </h1>

      <p className="mt-4 text-lg leading-7 text-zinc-500">
        A little more information helps us make a better assessment.
      </p>

      <div className="mt-10 space-y-6">
        <Input
          label="Brand"
          placeholder="e.g. HP, Apple, Samsung"
          value={data.brand}
          onChange={(value) => updateData("brand", value)}
        />

        <Input
          label="Model"
          placeholder="e.g. Pavilion 15, iPhone 13"
          value={data.model}
          onChange={(value) => updateData("model", value)}
        />

        <Input
          label="Approximate age"
          placeholder="e.g. 3 years"
          value={data.age}
          onChange={(value) => updateData("age", value)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* Step 3 */
/* ------------------------------------------------ */

function StepThree({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: (field: keyof AssessmentData, value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
        Step 03
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        What's the condition?
      </h1>

      <p className="mt-4 text-lg leading-7 text-zinc-500">
        Be honest here. There are no wrong answers.
      </p>

      <div className="mt-10 space-y-3">
        {conditions.map((condition) => (
          <button
            key={condition}
            type="button"
            onClick={() => updateData("condition", condition)}
            className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
              data.condition === condition
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            }`}
          >
            <span className="font-medium">{condition}</span>

            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                data.condition === condition
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
            >
              {data.condition === condition && "✓"}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <label className="text-sm font-semibold">
          What seems to be wrong?
          <span className="ml-2 font-normal text-zinc-400">(optional)</span>
        </label>

        <textarea
          value={data.problem}
          onChange={(event) =>
            updateData("problem", event.target.value)
          }
          placeholder="Describe any problems, damage, unusual behavior, or anything you've noticed..."
          rows={5}
          className="mt-3 w-full resize-none rounded-2xl border border-zinc-200 bg-white p-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* Step 4 */
/* ------------------------------------------------ */

function StepFour({
  value,
  onChange,
}: {
  value: Intent | "";
  onChange: (value: Intent) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
        Step 04
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        What are you thinking of doing with it?
      </h1>

      <p className="mt-4 text-lg leading-7 text-zinc-500">
        Your intention helps us understand what guidance will be most useful.
      </p>

      <div className="mt-10 space-y-3">
        {intents.map((intent) => (
          <button
            key={intent}
            type="button"
            onClick={() => onChange(intent)}
            className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
              value === intent
                ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            }`}
          >
            <span className="font-medium">{intent}</span>

            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                value === intent
                  ? "border-purple-500 bg-purple-500 text-white"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
            >
              {value === intent && "✓"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* Result */
/* ------------------------------------------------ */

function AssessmentResult({
  data,
  onReset,
}: {
  data: AssessmentData;
  onReset: () => void;
}) {
  const recommendation = calculateRecommendation(data);

  return (
    <section className="mx-auto max-w-3xl px-6 pb-20">
      <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Assessment complete
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Your SECONDSPARK recommendation
        </h1>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-950">
          <div className="text-4xl">
            {recommendation.icon}
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Recommended path
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {recommendation.title}
          </h2>

          <p className="mt-4 leading-7 text-zinc-500">
            {recommendation.description}
          </p>
        </div>

        <div className="mt-5 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="font-semibold">Your device</h3>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Info label="Device" value={data.deviceType} />
            <Info label="Brand" value={data.brand || "Not provided"} />
            <Info label="Model" value={data.model || "Not provided"} />
            <Info label="Age" value={data.age || "Not provided"} />
            <Info
              label="Condition"
              value={data.condition || "Not provided"}
            />
            <Info label="Intent" value={data.intent || "Not provided"} />
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
            className="rounded-full bg-zinc-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950"
          >
            Back to SECONDSPARK
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* Reusable UI */
/* ------------------------------------------------ */

function OptionCard({
  selected,
  onClick,
  icon,
  title,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border p-6 text-left transition ${
        selected
          ? "border-emerald-500 bg-emerald-50 shadow-sm dark:bg-emerald-950/20"
          : "border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-lg dark:border-zinc-800 dark:hover:border-zinc-600"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
            selected
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-zinc-300 dark:border-zinc-700"
          }`}
        >
          {selected && "✓"}
        </span>
      </div>

      <p className="mt-6 font-semibold">{title}</p>
    </button>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

/* ------------------------------------------------ */
/* Assessment Logic */
/* ------------------------------------------------ */

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
        "Your device appears to be functioning normally. The most sustainable option is to continue using it rather than replacing it.",
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
        "The device is currently non-functional. Consider whether repair is practical; if not, responsible recycling may be the best option.",
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
    icon: "🌱",
    title: "Assess → Choose Responsibly",
    description:
      "We need a little more information before making a strong recommendation. Consider the device's condition, repairability, and intended use.",
  };
}

/* ------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------ */

function getDeviceIcon(device: DeviceType) {
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