"use client";

import { useState } from "react";

export default function TitanicPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const form = e.currentTarget;

    const payload = {
      pclass: Number(form.pclass.value),
      age: Number(form.age.value),
      sibsp: Number(form.sibsp.value),
      parch: Number(form.parch.value),
      adult_male: form.adult_male.checked ? 1 : 0,
      alone: form.alone.checked ? 1 : 0,
      male: form.male.checked ? 1 : 0,
    };

    try {
      const response = await fetch(
        "https://halfdigit-api.onrender.com/predict-titanic",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 px-4 py-8">
      <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-6 shadow">

        <h1 className="text-2xl font-semibold">
          Titanic Survival Prediction
        </h1>

        <p className="text-slate-300 text-sm mt-3">
          This demo shows a <strong>machine learning classification API</strong>{" "}
          that predicts passenger survival based on demographic and travel
          attributes. The model is deployed as a REST API and invoked in real time.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Passenger Class
            </label>
            <input
              type="number"
              name="pclass"
              min={1}
              max={3}
              defaultValue={1}
              required
              className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2"
            />
            <p className="text-xs text-slate-500 mt-1">
              1 = First class, 2 = Second, 3 = Third
            </p>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Age</label>
            <input
              type="number"
              step="0.1"
              name="age"
              defaultValue={28}
              required
              className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Siblings / Spouses
            </label>
            <input
              type="number"
              name="sibsp"
              defaultValue={0}
              required
              className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Parents / Children
            </label>
            <input
              type="number"
              name="parch"
              defaultValue={0}
              required
              className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2"
            />
          </div>

          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="adult_male" defaultChecked />
              Adult Male
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="alone" defaultChecked />
              Traveling Alone
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="male" defaultChecked />
              Male
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 rounded-full bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 disabled:opacity-60"
          >
            {loading ? "Running prediction..." : "Run Prediction"}
          </button>

          {loading && (
            <div className="mt-4 text-sm text-yellow-400 bg-yellow-400/10 p-3 rounded">
              First prediction may take ~30–60 seconds while the model wakes up.
              Please don’t refresh.
            </div>
          )}
        </form>

        {/* RESULT */}
        {result && (
          <div
            className={`mt-6 p-4 rounded border ${
              result.survived
                ? "bg-green-500/10 border-green-500 text-green-300"
                : "bg-red-500/10 border-red-500 text-red-300"
            }`}
          >
            <strong>
              Prediction: {result.survived ? "Survived" : "Did Not Survive"}
            </strong>
            <div className="text-sm mt-1">
              Confidence: {(result.probability * 100).toFixed(1)}%
            </div>
          </div>
        )}

        {/* DETAILS */}
        <details className="mt-6 text-sm">
          <summary className="cursor-pointer text-sky-400">
            How does this model work?
          </summary>
          <p className="text-slate-300 mt-2">
            This is a supervised machine learning classification model trained on
            the{" "}
            <a
              href="https://github.com/abhayas/DataScience/blob/main/Titanic/titanic_train.csv"
              target="_blank"
              className="text-sky-400 underline"
            >
              Titanic dataset
            </a>
            . Features such as passenger class, age, family size, and gender were
            engineered to predict survival probability. The model is deployed as
            a REST API and invoked in real time.
          </p>
        </details>

        <p className="text-xs text-slate-500 mt-6">
          Model: Logistic Regression / Random Forest · Feature engineered · API
          predictions logged
        </p>
      </div>
    </main>
  );
}
