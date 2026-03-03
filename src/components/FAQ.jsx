import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ_ITEMS = [
  {
    question: "How quickly can we get a quote?",
    answer:
      "Most homeowners get a same-day response and a scoped estimate conversation within 24 hours. For larger remodels, we schedule a walkthrough first so pricing is realistic and not a rough guess.",
  },
  {
    question: "Do you handle permits and inspections?",
    answer:
      "Yes. We manage permit coordination and inspection steps as part of project planning, so your remodel or addition stays compliant and on track.",
  },
  {
    question: "What project sizes do you take on?",
    answer:
      "We handle kitchens, bathrooms, additions, whole-home renovations, and custom builds. If your project is complex or multi-phase, we can break it into clear milestones with timeline and budget guidance.",
  },
  {
    question: "Can we stay in the home during construction?",
    answer:
      "Usually yes for many remodels, but it depends on scope and utilities impacted. During planning we outline disruption level, work hours, and staging so you can decide what is practical for your household.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "Tetelestai Renovations serves Dallas, Richardson, Flower Mound, and nearby communities in North Texas.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(FAQ_ITEMS[0].question);

  const faqStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
    [],
  );

  return (
    <section id="faq" className="section-shell pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_16px_50px_rgba(10,14,20,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#92671d]">
          FAQ
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--brand-deep)] md:text-3xl">
          Common questions before starting a remodel
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Quick answers for timeline, permits, and scope so you can move from
          research to an actual estimate conversation.
        </p>

        <div className="mt-6 space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openQuestion === item.question;

            return (
              <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50/70">
                <button
                  type="button"
                  onClick={() => setOpenQuestion(isOpen ? "" : item.question)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-slate-800 md:text-base">{item.question}</span>
                  <FiChevronDown
                    size={18}
                    className={`shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen ? (
                  <p className="border-t border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
