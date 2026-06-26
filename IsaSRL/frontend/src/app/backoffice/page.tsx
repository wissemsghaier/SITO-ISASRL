"use client";

import { FormEvent, useMemo, useState } from "react";
import { SiteFrame } from "@/components/site-frame";

type ContactLead = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  message: string;
  source: string | null;
  createdAt: string;
};

export default function BackofficePage() {
  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    []
  );

  const [adminKey, setAdminKey] = useState("");
  const [contacts, setContacts] = useState<ContactLead[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const loadContacts = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/contacts?limit=150`, {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to load contacts.");
      }

      setContacts(payload.data || []);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setContacts([]);
      setErrorMessage(error instanceof Error ? error.message : "Unexpected error.");
    }
  };

  return (
    <SiteFrame activePath="/backoffice">
      <section className="backoffice-shell reveal reveal-2 scroll-section">
        <div className="backoffice-head">
          <p className="contact-kicker">Administration</p>
          <h1>Back-office demandes de contact</h1>
          <p>
            Entrez la cle admin pour consulter les dernieres demandes stockees dans PostgreSQL.
          </p>
        </div>

        <form className="backoffice-auth" onSubmit={loadContacts}>
          <label>
            Cle admin
            <input
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="x-admin-key"
              required
            />
          </label>
          <button type="submit" className="btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Chargement..." : "Charger les demandes"}
          </button>
          {status === "error" ? <p className="form-feedback error">{errorMessage}</p> : null}
        </form>
      </section>

      <section className="backoffice-table-shell reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Dernieres demandes ({contacts.length})</h2>
        </div>

        {!contacts.length ? (
          <p className="backoffice-empty">Aucune demande chargee pour le moment.</p>
        ) : (
          <div className="backoffice-table-wrap">
            <table className="backoffice-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Entreprise</th>
                  <th>Service</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="stagger-item">
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || "-"}</td>
                    <td>{contact.company || "-"}</td>
                    <td>{contact.serviceInterest || "-"}</td>
                    <td>{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </SiteFrame>
  );
}
