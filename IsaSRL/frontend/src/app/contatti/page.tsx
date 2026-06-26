"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { ContactBanner, PartnersSection, ServicesStrip } from "@/components/common-sections";
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
        eyebrow="Contatti"
        title="Parla con il team ISA"
        subtitle="Sede operativa a Ragusa, supporto commerciale e tecnico dedicato."
        paragraphs={[
          "Sede: Via delle Betulle, 137 Ragusa (RG) 97100.",
          "Email generale: info@isasrl.it.",
          "Telefono: 0932 252022.",
        ]}
        image="/site/GettyImages-693472268.jpg"
        imageAlt="Team commerciale in consulenza"
        mediaSecondaryImage="/site/logo_big.png"
        mediaSecondaryAlt="Brand ISA"
        highlights={["Ragusa HQ", "Consulenza enterprise", "Supporto rapido", "Roadmap personalizzata"]}
        ctaLabel="Prenota una call"
        ctaHref="/contatti"
        details={[
          {
            title: "Contatto diretto",
            text: "Telefono 0932 252022 per richieste immediate su servizi e progetti digitali.",
          },
          {
            title: "Supporto commerciale",
            text: "Consulenza dedicata per software, cloud, sicurezza e piattaforme verticali.",
          },
          {
            title: "Pianificazione progetto",
            text: "Analisi tecnica, roadmap e proposta personalizzata per la tua realta.",
          },
        ]}
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
