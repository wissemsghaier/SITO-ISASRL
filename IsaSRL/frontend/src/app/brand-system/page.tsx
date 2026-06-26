import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

type BrandToken = {
  name: string;
  value: string;
  usage: string;
};

const palette: BrandToken[] = [
  { name: "Midnight Core", value: "#060f2a", usage: "Base background and deep layout layers" },
  { name: "Cobalt Flux", value: "#145dff", usage: "Primary actions, active states, key accents" },
  { name: "Azure Pulse", value: "#63b3ff", usage: "Interactive highlights and progressive emphasis" },
  { name: "Aurora Mint", value: "#45ffd8", usage: "Success states, positive signals, luxury contrast" },
  { name: "Solar Copper", value: "#ff8340", usage: "Premium callouts and conversion-driving accents" },
  { name: "Frost Text", value: "#e9f1ff", usage: "Primary text on dark surfaces" },
  { name: "Slate Secondary", value: "#afc2e8", usage: "Secondary copy and supportive information" },
  { name: "Line Ether", value: "rgba(147,183,255,0.28)", usage: "Borders and structural separators" },
];

const motionRules = [
  "Use meaningful motion only: reveal hierarchy, not decoration.",
  "Default duration range: 260ms to 820ms depending on visual weight.",
  "Stagger sequence in steps of 60ms for grouped content blocks.",
  "Prefer transform + opacity transitions for smooth performance.",
  "Provide reduced-motion fallback for accessibility.",
];

const editorialRules = [
  "Headlines: concise, high-contrast, max 11 words per line cluster.",
  "Body text: 60 to 75 characters per line for readability.",
  "Use kicker + title + supporting paragraph structure for all major blocks.",
  "Avoid empty white zones: every section must have intentional visual texture.",
  "Every CTA must have a value proposition, not generic wording.",
];

export default function BrandSystemPage() {
  return (
    <SiteFrame activePath="/brand-system">
      <section className="brand-system-hero reveal reveal-2 scroll-section">
        <p className="brand-system-kicker">Internal Guide</p>
        <h1>Brand System ISA 2026</h1>
        <p>
          Riferimento interno per mantenere qualita visiva premium, coerenza editoriale e performance UX
          su tutte le future pagine della piattaforma.
        </p>
        <div className="brand-system-hero-actions">
          <Link href="/contatti" className="btn-primary">
            Richiedi nuova pagina
          </Link>
          <Link href="/" className="btn-secondary">
            Torna alla home
          </Link>
        </div>
      </section>

      <section className="brand-system-section reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Color System</h2>
          <span>Palette strategica multi-livello</span>
        </div>
        <div className="brand-token-grid">
          {palette.map((token) => (
            <article key={token.name} className="brand-token-card stagger-item">
              <div className="brand-token-swatch" style={{ background: token.value }} aria-hidden="true" />
              <h3>{token.name}</h3>
              <p className="brand-token-value">{token.value}</p>
              <p>{token.usage}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-system-section reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Typography and Microcopy</h2>
          <span>Gerarchia, ritmo e leggibilita</span>
        </div>
        <div className="brand-type-grid">
          <article className="brand-type-card stagger-item">
            <p className="brand-type-label">Display</p>
            <h3 className="brand-type-display">Design che converte fiducia in crescita.</h3>
            <p>Uso: hero headline, statement premium, sezioni strategiche.</p>
          </article>
          <article className="brand-type-card stagger-item">
            <p className="brand-type-label">Body</p>
            <p className="brand-type-body">
              La tipografia di corpo deve mantenere ritmo costante, tono professionale e struttura orientata
              alla chiarezza decisionale.
            </p>
            <p>Uso: contenuti informativi, descrizioni servizio, spiegazioni operative.</p>
          </article>
          <article className="brand-type-card stagger-item">
            <p className="brand-type-label">Code / Data</p>
            <p className="brand-type-mono">KPI_DELTA = +18.7% | LATENCY_P95 = 120ms | UPTIME = 99.98%</p>
            <p>Uso: dati tecnici, metriche, componenti dashboard, back-office.</p>
          </article>
        </div>
      </section>

      <section className="brand-system-section reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Motion Standards</h2>
          <span>Animazioni ad alto valore percepito</span>
        </div>
        <div className="brand-rule-grid">
          {motionRules.map((rule) => (
            <article key={rule} className="brand-rule-card stagger-item">
              <p>{rule}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-system-section reveal reveal-3 scroll-section">
        <div className="section-head">
          <h2>Editorial Standards</h2>
          <span>Regole per contenuti premium e coerenti</span>
        </div>
        <div className="brand-rule-grid">
          {editorialRules.map((rule) => (
            <article key={rule} className="brand-rule-card stagger-item">
              <p>{rule}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
