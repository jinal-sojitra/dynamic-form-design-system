import { LeadForm } from "./features/lead/LeadForm";

export default function App() {
  return (
    <main className="page">
      <section className="form-card">
        <header className="page-header">
          <p className="eyebrow">GET IN TOUCH</p>
          <h1>Let's start a conversation</h1>
          <p className="page-description">
            Tell us a little about yourself and how we can help.
          </p>
        </header>

        <LeadForm />
      </section>
    </main>
  );
}
