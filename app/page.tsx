import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 px-4 py-8">
  <div className="max-w-4xl mx-auto space-y-12">

    {/* Hero Section */}
    <header className="space-y-4">
      <span className="inline-block text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-slate-700/40">
        Data Science Specialist · AI & Machine Learning · Microsoft Certified
      </span>

      <h1 className="text-3xl sm:text-4xl font-semibold">
        Hi, I’m Abhay <span className="ml-1">👋</span>
      </h1>

      <p className="text-slate-300 max-w-3xl">
        I’m a <span className="text-sky-400 font-medium">Data Science Specialist at Accenture</span> with
        17+ years of experience in IT, analytics, and automation, now focused on
        <span className="text-sky-400 font-medium">
          {" "}AI/ML engineering, model deployment, and decision intelligence
        </span>.
      </p>

      <p className="text-slate-300 max-w-3xl">
        My journey started with SharePoint and Power Platform development and evolved into
        building production-ready ML systems that connect models to real business workflows.
      </p>

      <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
        <a href="#about" className="hover:text-sky-400">About</a>
        <a href="#skills" className="hover:text-sky-400">Skills</a>
        <a href="#projects" className="hover:text-sky-400">Projects</a>
        <a href="#contact" className="hover:text-sky-400">Contact</a>
      </nav>
    </header>

    {/* Featured Demo */}
    <section className="rounded-xl border border-sky-400/30 bg-sky-400/10 p-6">
      <h2 className="text-xl font-semibold">
        Featured Live Demo
      </h2>

      <p className="text-slate-300 text-sm mt-2 max-w-2xl">
        Explore a production-style machine learning API that performs real-time inference
        and logs predictions for analytics.
      </p>

      <a
        href="/titanic"
        className="inline-block mt-4 px-6 py-2 rounded-full bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300"
      >
        ▶ Try the Titanic Survival Demo
      </a>
    </section>

    {/* Projects */}
    <section id="projects" className="space-y-6">
      <h2 className="text-xl font-semibold">Projects</h2>

      {/* Titanic Project */}
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
        <h3 className="text-lg font-semibold">
          Titanic Survival Prediction
        </h3>

        <p className="text-slate-300 text-sm mt-2">
          An end-to-end ML classification demo deployed as a REST API with a dynamic frontend.
        </p>

        <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
          <li>Feature-engineered classification model</li>
          <li>Flask-based inference API</li>
          <li>Next.js frontend with Tailwind UI</li>
          <li>Prediction & visit logging for analytics</li>
        </ul>

        <div className="flex flex-wrap gap-2 mt-4 text-xs">
          <span className="px-2 py-1 rounded-full border border-slate-500">Python</span>
          <span className="px-2 py-1 rounded-full border border-slate-500">Scikit-learn</span>
          <span className="px-2 py-1 rounded-full border border-slate-500">Flask API</span>
          <span className="px-2 py-1 rounded-full border border-slate-500">Next.js</span>
          <span className="px-2 py-1 rounded-full border border-slate-500">Tailwind CSS</span>
        </div>

        <div className="mt-4 flex gap-4 text-sm">
          <a href="/titanic" className="text-sky-400 hover:underline">
            Live Demo
          </a>
          <a
            href="https://github.com/abhayas/DataScience"
            target="_blank"
            className="text-sky-400 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Loan Project */}
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
        <h3 className="text-lg font-semibold">
          Loan Approval Prediction (Deep Learning)
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full border border-yellow-400 text-yellow-400">
            Coming Soon
          </span>
        </h3>

        <p className="text-slate-300 text-sm mt-2">
          Deep learning–based loan eligibility model trained on structured financial data.
        </p>

        <p className="text-slate-400 text-sm mt-2">
          Planned: API deployment, inference logging, and interactive demo UI.
        </p>

        <a
          href="https://github.com/abhayas/DataScience/blob/main/DeepLearning/Loan_Eligibility.ipynb"
          target="_blank"
          className="inline-block mt-3 text-sm text-sky-400 hover:underline"
        >
          View Notebook
        </a>
      </div>
    </section>

    {/* Skills */}
    <section id="skills" className="space-y-4">
      <h2 className="text-xl font-semibold">Skills & Tools</h2>

      <div className="flex flex-wrap gap-2 text-xs">
        {[
          "Python",
          "Machine Learning",
          "Scikit-learn",
          "Flask / REST APIs",
          "Next.js",
          "Tailwind CSS",
          "SQL",
          "Power BI",
          "Azure ML",
          "Model Deployment",
          "MLOps (foundations)"
        ].map(skill => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full border border-slate-500"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>

    {/* Contact */}
    <section id="contact" className="space-y-3">
      <h2 className="text-xl font-semibold">Contact</h2>

      <p className="text-slate-300 text-sm">
        Open to AI/ML engineering roles, collaborations, and discussions around
        production ML systems.
      </p>

      <div className="flex gap-4 text-sm">
        <a
          href="mailto:abhayas@zohomail.in"
          className="text-sky-400 hover:underline"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/abhaya-sahu/"
          target="_blank"
          className="text-sky-400 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/abhayas"
          target="_blank"
          className="text-sky-400 hover:underline"
        >
          GitHub
        </a>
      </div>
    </section>

    <footer className="text-xs text-slate-500 pt-8 border-t border-slate-700">
      © {new Date().getFullYear()} Halfdigit · Built with Next.js & Flask
    </footer>

  </div>
</main>

  );
}
