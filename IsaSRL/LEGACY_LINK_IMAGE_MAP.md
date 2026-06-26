# ISA Legacy Link and Image Map

Date: 2026-06-26
Source audited: root legacy pages in SITO ISASRL + images folder
Target: IsaSRL/frontend (Next.js)

## 1) Legacy page to Next route mapping

- index.html -> /
- assistenza.html -> /assistenza
- servizi.html -> /servizi
- contatti.html -> /contatti
- forniture_mepa.html -> /mepa
- gestionale_azienda.html -> /gestionale
- gestionale_ordini.html -> /gestionale
- firma_digitale.html -> /firma-digitale
- whistleblowing.html -> /whistleblowing
- privacy.html -> /privacy

## 2) Internal legacy links audited

Common internal links detected in legacy pages:

- index.html
- assistenza.html
- servizi.html
- servizi_backup.html
- servizi_fatel.html
- contatti.html
- forniture_mepa.html
- gestionale_azienda.html
- gestionale_ordini.html
- firma_digitale.html
- whistleblowing.html
- privacy.html

Status:

- Core pages migrated to Next routes listed above.
- Legacy backup pages servizi_backup.html and servizi_fatel.html were treated as service content references and consolidated into /servizi.

## 3) External links audited

Detected examples from legacy pages:

- https://www.zucchetti.it/website/cms/home.html
- https://zutec.it/
- https://www.dell.com/it-it
- https://store.hp.com
- https://www.yashiweb.com/ (legacy had malformed https:/// variant)
- https://edatalia.com/
- https://it-it.facebook.com/
- https://twitter.com/search-home
- https://dribbble.com
- https://www.google.it
- https://www.tumblr.com/

Support/remote links detected and preserved in modern assistance page:

- https://anydesk.it/download?os=win
- https://logins.livecare.net/liveletexecustom/2Q5CT3D5CIP23I9P
- https://www.isasrl.it/Supremo_ISAsrl.exe

## 4) Image sources audited from legacy HTML

Legacy src references included:

- images/logo.png
- images/HOME.jpg
- images/assistenza.jpg
- images/soluzioni-ict.jpg
- images/mepa.png
- images/aulainformatica2.jpg
- images/monitor.jpg
- images/carta_docente.png
- images/gestionali.jpg
- images/gestionali1.jpg
- images/gestionali3.jpg
- images/firma-elettronica-blu.jpg
- images/firma-digitale-mini.png
- images/edatalia.png
- images/Whistleblowing_img.jpg
- images/whistleblowing_mini.jpg
- images/zucchetti_logo.jpg
- images/DELL_LOGO.jpg
- images/HP_LOGO.jpg
- images/yashi_logo.jpg

## 5) Image migration status to Next public folder

Target folder: frontend/public/site

Already present / migrated:

- logo.png
- logo_big.png
- HOME.jpg
- assistenza.jpg
- soluzioni-ict.jpg
- mepa.png
- aulainformatica2.jpg
- aula-informatica1.jpg
- monitor.jpg
- carta_docente.png
- gestionali.jpg
- gestionali1.jpg
- gestionali3.jpg
- firma-elettronica-blu.jpg
- firma-digitale-mini.png
- edatalia.png
- whistleblowing_img.jpg
- whistleblowing_mini.jpg
- zucchetti_logo.jpg
- zucchetti_logo_partner.jpg
- DELL_logo.jpg
- HP_logo.jpg
- YASHI_logo.jpg
- LIM.jpg
- backup.jpg
- fatel.jpg
- banner_progetto_lc.png
- GettyImages-693472268.jpg

## 6) Legacy documents migrated

Target folder: frontend/public/documents

- Informativa_privacy.pdf
- Informativa_cookie.pdf
- Informativaclienti.pdf
- Contratto_Intervento_remoto.pdf

## 7) Notes for deploy consistency

- Legacy had mixed file name casing (for example DELL_LOGO.jpg vs DELL_logo.jpg).
- Next deployment on Linux is case-sensitive, so the modern app uses normalized names under frontend/public/site.
- Legacy malformed URL https:///www.yashiweb.com/ should be normalized to https://www.yashiweb.com/ where used.
