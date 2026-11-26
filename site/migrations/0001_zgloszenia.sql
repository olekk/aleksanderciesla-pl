-- Zgłoszenia z formularza kontaktowego. Zapisujemy każde, także gdy mail się nie wyśle.
CREATE TABLE IF NOT EXISTS zgloszenia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  utworzono TEXT NOT NULL DEFAULT (datetime('now')),
  imie TEXT NOT NULL,
  firma TEXT,
  telefon TEXT,
  email TEXT,
  uslugi TEXT,
  wiadomosc TEXT,
  strona TEXT,
  mail_wyslany INTEGER NOT NULL DEFAULT 0,
  blad TEXT
);
