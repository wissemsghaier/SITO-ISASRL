import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export default function ConfermaContattiPage() {
  return (
    <SiteFrame activePath="/azienda">
      <section className="azienda-form-page shell-card reveal reveal-2 scroll-section">
        <div className="contact-form-head">
          <p className="contact-kicker">Contatti | Conferma invio</p>
          <h2>Richiesta inviata con successo</h2>
          <p>
            Il team ISA ha ricevuto il tuo messaggio e ti ricontattera nel minor tempo
            possibile.
          </p>
        </div>

        <div className="service-detail-actions">
          <Link href="/azienda/contatti" className="btn-secondary">
            Invia un'altra richiesta
          </Link>
          <Link href="/" className="btn-primary">
            Torna alla home
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
