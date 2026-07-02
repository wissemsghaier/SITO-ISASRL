"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { SiteFrame } from "@/components/site-frame";

type CareerFormData = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  portfolio: string;
  message: string;
  website: string;
  consentPrivacy: boolean;
};

const initialData: CareerFormData = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  experience: "",
  portfolio: "",
  message: "",
  website: "",
  consentPrivacy: false,
};

export default function AziendaLavoraConNoiPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CareerFormData>(initialData);
  const [cvFile, setCvFile] = useState<File | null>(null);
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

    if (!cvFile) {
      setStatus("error");
      setFeedback("Il CV in formato PDF e obbligatorio.");
      return;
    }

    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("role", formData.role);
    payload.append("experience", formData.experience);
    payload.append("portfolio", formData.portfolio);
    payload.append("message", formData.message);
    payload.append("website", formData.website);
    payload.append("consentPrivacy", String(formData.consentPrivacy));
    payload.append("cvFile", cvFile);

    try {
      const response = await fetch(`${apiBaseUrl}/api/career`, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Impossibile inviare la candidatura in questo momento.");
      }

      setStatus("success");
      setFeedback(result.message || "Candidatura inviata con successo.");
      setFormData(initialData);
      setCvFile(null);
      router.push("/azienda/lavora-con-noi/conferma");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Si e verificato un errore inatteso.");
    }
  };

  return (
    <SiteFrame activePath="/azienda">
      <section className="azienda-form-page contact-form-shell studio-contact-shell shell-card reveal reveal-2 scroll-section">
        <div className="contact-form-head">
          <p className="contact-kicker">Azienda | Lavora con noi</p>
          <h2>Form candidatura</h2>
          <p>Compila il modulo per inviare la tua candidatura al team ISA.</p>
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
            Ruolo desiderato*
            <select
              required
              value={formData.role}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, role: event.target.value }))
              }
            >
              <option value="">Seleziona un ruolo</option>
              <option value="Sviluppatore Software">Sviluppatore Software</option>
              <option value="Tecnico Sistemi e Reti">Tecnico Sistemi e Reti</option>
              <option value="Supporto Applicativo">Supporto Applicativo</option>
              <option value="Commerciale IT">Commerciale IT</option>
              <option value="Stage">Stage</option>
            </select>
          </label>

          <label>
            Anni di esperienza
            <input
              type="text"
              placeholder="Es. 3 anni"
              value={formData.experience}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, experience: event.target.value }))
              }
            />
          </label>

          <label className="full-row">
            Link CV o portfolio
            <input
              type="url"
              placeholder="https://..."
              value={formData.portfolio}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, portfolio: event.target.value }))
              }
            />
          </label>

          <label className="full-row">
            Upload CV (PDF)*
            <input
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(event) => setCvFile(event.target.files?.[0] || null)}
            />
          </label>

          <label className="full-row">
            Presentazione*
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
              {status === "loading" ? "Invio in corso..." : "Invia candidatura"}
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
