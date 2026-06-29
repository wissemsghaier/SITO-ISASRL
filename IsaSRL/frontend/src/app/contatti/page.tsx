"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ContactBanner,
  ExecutiveTrustBand,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
import { PremiumRouteShell } from "@/components/premium-route-shell";
import { SiteFrame } from "@/components/site-frame";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
  website: string;
  consentPrivacy: boolean;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  serviceInterest: "",
  message: "",
  website: "",
  consentPrivacy: false,
};

const contactVisuals = [
  {
    label: "Strategic Call",
    title: "Kickoff orientato ai risultati",
    text: "Primo confronto con obiettivi chiari, priorita e roadmap operativa condivisa.",
    image: "/site/premium-final/12-solution-workshop.jpg",
    imageAlt: "Meeting strategico con clienti",
  },
  {
    label: "Solution Workshop",
    title: "Co-design tecnico e business",
    text: "Workshop con stakeholder per allineare tecnologia, processi e metriche di successo.",
    image: "/site/premium-final/11-monitoring-delivery.jpg",
    imageAlt: "Workshop su soluzioni digitali",
  },
  {
    label: "Delivery Plan",
    title: "Piano di esecuzione trasparente",
    text: "Timeline, responsabilita e milestone definiti per una delivery solida e prevedibile.",
    image: "/site/premium-final/05-control-center.png",
    imageAlt: "Piano di delivery progetto",
  },
];

const contactTrustPoints = [
  {
    title: "Briefing strategico immediato",
    text: "Allineiamo priorita, obiettivi e contesto tecnico gia dal primo contatto.",
  },
  {
    title: "Roadmap con ownership chiare",
    text: "Milestone, ruoli e output condivisi per ridurre incertezza e accelerare decisioni.",
  },
  {
    title: "Canale unico verso il team ISA",
    text: "Supporto coordinato commerciale-tecnico con tempi di risposta rapidi e trasparenti.",
  },
];

export default function ContattiPage() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Impossibile inviare la richiesta in questo momento.");
      }

      setStatus("success");
      setFeedback(result.message || "Richiesta inviata con successo.");
      setFormData(initialData);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Si e verificato un errore inatteso.");
    }
  };

  return (
    <SiteFrame activePath="/contatti">
      <PremiumRouteShell
        eyebrow="Contatti Premium"
        title="Richiesta consulenza piu chiara, con percorso visivo immediato"
        description="Abbiamo mantenuto lo stesso significato delle sezioni ma con immagini diverse e piu comprensibili, per guidare il cliente fino alla richiesta finale senza confusione."
        chips={["Call to action visibile", "Form leggibile", "Visual coerenti", "Messaggi semplici"]}
      >
        <InternalPageTemplate
          variant="studio"
          eyebrow="Consulenza e Commerciale"
          title="Parla con il team che trasforma esigenze in progetti concreti"
          subtitle="Un percorso guidato: ascolto, analisi e piano operativo per trasformare obiettivi in risultati misurabili."
          paragraphs={[
            "Sede operativa: Via delle Betulle, 137 Ragusa (RG) 97100.",
            "Canale diretto: info@isasrl.it per richieste tecniche, consulenziali e commerciali.",
            "Telefono: 0932 252022 con risposta rapida nella stessa giornata lavorativa.",
          ]}
          image="/site/premium-final/12-solution-workshop.jpg"
          imageAlt="Team commerciale in consulenza tecnica"
          mediaSecondaryImage="/site/premium-final/10-modular-architecture.jpg"
          mediaSecondaryAlt="Brand e visione progettuale ISA"
          highlights={["Ascolto strategico", "Workshop tecnico", "Roadmap operativa", "Proposta su misura"]}
          ctaLabel="Prenota un confronto con ISA"
          ctaHref="/contatti"
          details={[
            {
              title: "Primo confronto immediato",
              text: "Chiama lo 0932 252022 per avviare subito analisi e inquadramento della richiesta.",
            },
            {
              title: "Consulenza specialistica",
              text: "Supporto dedicato su software, cloud, sicurezza e piattaforme verticali per il tuo settore.",
            },
            {
              title: "Piano esecutivo",
              text: "Roadmap operativa, milestone e proposta personalizzata per accelerare il time-to-value.",
            },
          ]}
        />

        <ExecutiveTrustBand
          eyebrow="Conversion clarity"
          title="Contatti progettati per trasformare interesse in progetto"
          description="Sequenza UX high-conversion: chiarezza del valore, prova operativa e form con priorita visuale netta."
          points={contactTrustPoints}
          primaryCtaLabel="Invia la richiesta ora"
          primaryCtaLabelB="Blocca una consulenza adesso"
          primaryCtaHref="/contatti#contact-form"
          secondaryCtaLabel="Scopri tutti i servizi"
          secondaryCtaLabelB="Vedi percorsi ad alto impatto"
          secondaryCtaHref="/servizi"
        />

        <PremiumSignatureSection
          eyebrow="Esperienza cliente"
          title="Contatti pensati per essere chiari, veloci e affidabili"
          description="Ogni sezione guida il cliente dal primo messaggio alla proposta operativa con linguaggio semplice e orientato al risultato."
          panels={contactVisuals}
        />

        <section className="studio-contact-grid premium-route-section reveal reveal-3 scroll-section">
          <article className="studio-contact-card stagger-item premium-route-stagger">
            <p>Telefono</p>
            <h3>0932 252022</h3>
            <span>Linea diretta per supporto tecnico, consulenza e area commerciale.</span>
          </article>
          <article className="studio-contact-card stagger-item premium-route-stagger">
            <p>Email</p>
            <h3>info@isasrl.it</h3>
            <span>Risposta rapida con triage della richiesta entro la giornata.</span>
          </article>
          <article className="studio-contact-card stagger-item premium-route-stagger">
            <p>Sede</p>
            <h3>Via delle Betulle 137</h3>
            <span>Ragusa (RG) 97100, ricevimento su appuntamento.</span>
          </article>
          <article className="studio-contact-card stagger-item premium-route-stagger">
            <p>Area Commerciale</p>
            <h3>Roberto Gallo</h3>
            <span>Riferimento storico per richieste commerciali e sviluppo opportunita.</span>
          </article>
        </section>

        <section id="contact-form" className="contact-form-shell studio-contact-shell premium-route-section reveal reveal-3 scroll-section">
          <div className="studio-form-layout">
            <div className="contact-form-head">
              <p className="contact-kicker">Richiesta consulenza</p>
              <h2>Raccontaci il tuo progetto</h2>
              <p>
                Compila il form e ti ricontattiamo con indicazioni concrete, tempi e prossimi step.
              </p>
            </div>

            <aside className="studio-contact-facts premium-route-stagger">
              <h3>Percorso consulenziale</h3>
              <ul>
                <li>Assessment tecnico iniziale del contesto aziendale.</li>
                <li>Roadmap con priorita, budget e milestone condivise.</li>
                <li>Supporto alla governance del progetto e monitoraggio KPI.</li>
              </ul>
            </aside>
          </div>

          <form className="contact-form studio-contact-form" onSubmit={handleSubmit}>
          <label className="honeypot-field" aria-hidden="true">
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, website: event.target.value }))
              }
            />
          </label>

          <label>
            Nome e Cognome*
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, fullName: event.target.value }))
              }
            />
          </label>

          <label>
            Email*
            <input
              type="email"
              required
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </label>

          <label>
            Telefono
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </label>

          <label>
            Azienda
            <input
              type="text"
              value={formData.company}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, company: event.target.value }))
              }
            />
          </label>

          <label>
            Servizio di interesse
            <select
              value={formData.serviceInterest}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, serviceInterest: event.target.value }))
              }
            >
              <option value="">Seleziona un servizio</option>
              <option value="Gestionale Aziendale">Gestionale Aziendale</option>
              <option value="Ordini Professionali">Ordini Professionali</option>
              <option value="MEPA e Scuola Digitale">MEPA e Scuola Digitale</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Firma Digitale">Firma Digitale</option>
              <option value="Business Continuity">Business Continuity</option>
            </select>
          </label>

          <label className="full-row">
            Messaggio*
            <textarea
              required
              minLength={12}
              rows={5}
              value={formData.message}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, message: event.target.value }))
              }
            />
          </label>

          <label className="full-row consent-row">
            <input
              type="checkbox"
              checked={formData.consentPrivacy}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, consentPrivacy: event.target.checked }))
              }
              required
            />
            <span>
              Ho letto e accetto la <Link href="/privacy">Privacy Policy</Link>.
            </span>
          </label>

          <div className="full-row form-actions">
            <button type="submit" className="btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Invio in corso..." : "Invia richiesta"}
            </button>
            {feedback ? (
              <p className={`form-feedback ${status === "success" ? "ok" : "error"}`}>{feedback}</p>
            ) : null}
          </div>
          </form>
        </section>

        <section className="ultra-premium-band premium-route-section reveal reveal-3 scroll-section">
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Advisory rapido</p>
            <h3>Kickoff entro 48h</h3>
            <p>Primo confronto strategico con un piano di azione calibrato sulle tue priorita reali.</p>
          </article>
          <article className="ultra-premium-card stagger-item premium-route-stagger">
            <p className="ultra-kicker">Governance delivery</p>
            <h3>Roadmap trasparente</h3>
            <p>Timeline, milestone e ownership definite per garantire visibilita durante tutto il progetto.</p>
          </article>
        </section>

        <ServicesStrip />
        <PartnersSection />
        <ContactBanner />
      </PremiumRouteShell>
    </SiteFrame>
  );
}
