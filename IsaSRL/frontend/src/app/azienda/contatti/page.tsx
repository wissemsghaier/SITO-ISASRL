"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { SiteFrame } from "@/components/site-frame";

type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
  website: string;
  consentPrivacy: boolean;
};

const initialData: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  serviceInterest: "",
  message: "",
  website: "",
  consentPrivacy: false,
};

export default function AziendaContattiPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>(initialData);
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
      router.push("/azienda/contatti/conferma");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Si e verificato un errore inatteso.");
    }
  };

  return (
    <SiteFrame activePath="/azienda">
      <section className="azienda-form-page contact-form-shell studio-contact-shell shell-card reveal reveal-2 scroll-section">
        <div className="contact-form-head">
          <p className="contact-kicker">Azienda | Contatti</p>
          <h2>Form contatti</h2>
          <p>Compila questo modulo per richieste commerciali, tecniche o informative.</p>
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
    </SiteFrame>
  );
}
