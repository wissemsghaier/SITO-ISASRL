CREATE TABLE IF NOT EXISTS service_highlights (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO service_highlights (title, description)
VALUES
  (
    'Cloud Continuity',
    'Architecture de sauvegarde et reprise pour garantir la continuite operationnelle.'
  ),
  (
    'Security Operations',
    'Protection proactive, supervision et reduction durable du risque cyber.'
  ),
  (
    'Business Process Digitalization',
    'Automatisation des processus internes et optimisation de la performance.'
  )
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(160),
  service_interest VARCHAR(160),
  message TEXT NOT NULL,
  consent_privacy BOOLEAN NOT NULL DEFAULT FALSE,
  source VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at
  ON contact_requests (created_at DESC);
