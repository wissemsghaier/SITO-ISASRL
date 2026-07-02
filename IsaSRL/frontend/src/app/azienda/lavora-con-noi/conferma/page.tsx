import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function ConfermaLavoraConNoiPage() {
  return (
    <SiteFrame activePath="/azienda">
      <section className="azienda-form-page shell-card reveal reveal-2 scroll-section">
        <div className="contact-form-head">
          <p className="contact-kicker">Lavora con noi | Conferma invio</p>
          <h2>Candidatura inviata con successo</h2>
          <p>
            Abbiamo ricevuto la tua candidatura e il CV in PDF. Il team ISA ti aggiornera
            dopo la prima valutazione.
          </p>
        </div>

        <div className="service-detail-actions">
          <Link href="/azienda/lavora-con-noi" className="btn-secondary">
            Invia un'altra candidatura
          </Link>
          <Link href="/" className="btn-primary">
            Torna alla home
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
