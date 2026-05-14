TÖBB, MINT KOSÁR — Landing page
==================================

ADMIN
-----
URL:     https://a-domained.hu/#/ablakzsiraf
Jelszó:  kosar2024

Az adminban szerkesztheted:
- Logót (feltöltés)
- Shop URL, email, telefon, cím
- Térkép (Google Maps embed URL)
- Termelőket (hozzáadás / törlés / sorrend)
- GYIK kérdéseket
- Hírlevél feliratkozókat (CSV export)

Az adatok a böngésző localStorage-ében tárolódnak (mint az ÉLET-Közösség oldalán).

FUTTATÁS LOKÁLISAN
------------------
  cd tobbmintkosar-app
  npm install
  npm run dev
  → http://localhost:8081

BUILD ÉS FELTÖLTÉS cPANEL-RE
----------------------------
  npm run build
  → a dist/ mappa tartalmát töltsd fel a cPanel public_html-be (vagy aldomén mappájába).

A .htaccess automatikusan a buildbe kerül a public/ mappából.

GOOGLE MAPS BEÁGYAZÁS
---------------------
1) Nyisd meg: https://www.google.com/maps
2) Keress rá a címedre.
3) Megosztás → Térkép beágyazása → másold ki a src="..." URL-t.
4) Az adminban (Általános → Térkép) illeszd be.

Egyszerű alternatíva (kulcs nélkül):
  https://www.google.com/maps?q=Budapest, Andrássy út 1&output=embed
