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
