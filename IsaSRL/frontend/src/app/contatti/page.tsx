"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ContactBanner,
  PartnersSection,
  PremiumSignatureSection,
  ServicesStrip,
} from "@/components/common-sections";
import { InternalPageTemplate } from "@/components/internal-page-template";
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
    image: "/site/GettyImages-693472268.jpg",
    imageAlt: "Meeting strategico con clienti",
  },
  {
    label: "Solution Workshop",
    title: "Co-design tecnico e business",
    text: "Workshop con stakeholder per allineare tecnologia, processi e metriche di successo.",
    image: "/site/soluzioni-ict.jpg",
    imageAlt: "Workshop su soluzioni digitali",
  },
  {
    label: "Delivery Plan",
    title: "Piano di esecuzione trasparente",
    text: "Timeline, responsabilita e milestone definiti per una delivery solida e prevedibile.",
    image: "/site/HOME.jpg",
    imageAlt: "Piano di delivery progetto",
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
        throw new Error(result.message || "Impossible d'envoyer votre message pour le moment.");
      }

      setStatus("success");
      setFeedback(result.message || "Message envoye avec succes.");
      setFormData(initialData);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Une erreur inattendue est survenue.");
    }
  };

  return (
    <SiteFrame activePath="/contatti">
      <InternalPageTemplate
        variant="studio"
        eyebrow="Advisory & Sales"
        title="Parla con il team che guida la tua evoluzione digitale"
        subtitle="Un percorso consulenziale premium: analisi, roadmap e delivery strutturata per trasformare obiettivi in risultati."
        paragraphs={[
          "Headquarter: Via delle Betulle, 137 Ragusa (RG) 97100.",
          "Canale diretto: info@isasrl.it per richieste tecniche e commerciali.",
          "Telefono: 0932 252022 con supporto dedicato nella stessa giornata lavorativa.",
        ]}
        image="/site/GettyImages-693472268.jpg"
        imageAlt="Team commerciale in consulenza"
        mediaSecondaryImage="/site/logo_big.png"
        mediaSecondaryAlt="Brand ISA"
        highlights={["Executive advisory", "Technical workshop", "Roadmap delivery", "Conversion focus"]}
        ctaLabel="Prenota una call strategica"
        ctaHref="/contatti"
        details={[
          {
            title: "Discovery immediata",
            text: "Telefono 0932 252022 per avviare rapidamente la fase di analisi su servizi e progetti.",
          },
          {
            title: "Consulenza premium",
            text: "Supporto dedicato su software, cloud, sicurezza e piattaforme verticali per il tuo settore.",
          },
          {
            title: "Execution planning",
            text: "Roadmap operativa, milestone e proposta su misura per accelerare il time-to-value.",
          },
        ]}
      />

      <PremiumSignatureSection
        eyebrow="Client experience"
        title="Contatti riprogettati per conversione premium"
        description="Una pagina orientata alla fiducia: percorsi chiari, autorevolezza visiva e onboarding commerciale piu efficace."
        panels={contactVisuals}
      />

      <section className="studio-contact-grid reveal reveal-3 scroll-section">
        <article className="studio-contact-card stagger-item">
          <p>Telefono</p>
          <h3>0932 252022</h3>
          <span>Linea diretta per assistenza tecnica e commerciale.</span>
        </article>
        <article className="studio-contact-card stagger-item">
          <p>Email</p>
          <h3>info@isasrl.it</h3>
          <span>Risposta rapida con triage della richiesta entro la giornata.</span>
        </article>
        <article className="studio-contact-card stagger-item">
          <p>Office</p>
          <h3>Via delle Betulle 137</h3>
          <span>Ragusa (RG) 97100, ricevimento su appuntamento.</span>
        </article>
        <article className="studio-contact-card stagger-item">
          <p>Area Commerciale</p>
          <h3>Roberto Gallo</h3>
          <span>Riferimento storico per richieste commerciali e sviluppo opportunita.</span>
        </article>
      </section>

      <section className="contact-form-shell studio-contact-shell reveal reveal-3 scroll-section">
        <div className="studio-form-layout">
          <div className="contact-form-head">
            <p className="contact-kicker">Richiesta consulenza</p>
            <h2>Invia il tuo messaggio</h2>
            <p>
              Compila il form: il nostro team ti ricontatta rapidamente con una proposta su misura.
            </p>
          </div>

          <aside className="studio-contact-facts">
            <h3>Advisory Track</h3>
            <ul>
              <li>Assessment tecnico iniziale del contesto aziendale.</li>
              <li>Roadmap operativa con priorita, budget e milestone.</li>
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

      <section className="ultra-premium-band reveal reveal-3 scroll-section">
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Executive Advisory</p>
          <h3>Kickoff in 48h</h3>
          <p>Primo confronto strategico rapido con piano di azione calibrato sulle tue priorita.</p>
        </article>
        <article className="ultra-premium-card stagger-item">
          <p className="ultra-kicker">Delivery Governance</p>
          <h3>Roadmap Trasparente</h3>
          <p>Timeline, milestone e ownership definite per garantire visibilita durante tutto il progetto.</p>
        </article>
      </section>

      <ServicesStrip />
      <PartnersSection />
      <ContactBanner />
    </SiteFrame>
  );
}
