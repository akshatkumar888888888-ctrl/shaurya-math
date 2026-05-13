-- ============================================================
-- SHAURYA MATH — Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. INQUIRIES TABLE (contact form + admissions form submissions)
CREATE TABLE IF NOT EXISTS inquiries (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  course      TEXT NOT NULL,
  message     TEXT,
  status      TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','enrolled','closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TOPPERS TABLE (Wall of Fame)
CREATE TABLE IF NOT EXISTS toppers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  achievement TEXT NOT NULL,
  year        TEXT NOT NULL,
  exam        TEXT NOT NULL DEFAULT 'JEE Main',
  score       TEXT,
  photo_url   TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote       TEXT NOT NULL,
  author      TEXT NOT NULL,
  rank        TEXT NOT NULL,
  avatar_url  TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE inquiries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT inquiries (contact/admission form)
CREATE POLICY "Public can insert inquiries"
  ON inquiries FOR INSERT TO anon WITH CHECK (true);

-- Anyone can READ toppers (Wall of Fame page)
CREATE POLICY "Public can read toppers"
  ON toppers FOR SELECT TO anon USING (true);

-- Anyone can READ active testimonials
CREATE POLICY "Public can read active testimonials"
  ON testimonials FOR SELECT TO anon USING (is_active = true);

-- Service role (admin dashboard) gets full access automatically.
-- For the admin dashboard to work with the anon key, also add:
CREATE POLICY "Anon full access to inquiries"
  ON inquiries FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Anon full access to toppers"
  ON toppers FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Anon full access to testimonials"
  ON testimonials FOR ALL TO anon USING (true) WITH CHECK (true);

-- ============================================================
-- SAMPLE DATA (optional — remove before going live)
-- ============================================================

INSERT INTO toppers (name, achievement, year, exam, score, is_featured) VALUES
  ('Rahul Kumar',   'AIR 127 JEE Main',          '2026', 'JEE Main',     '99.2 Percentile', TRUE),
  ('Priya Jha',     'Bihar Board Rank 4',         '2025', 'Bihar Board',  '98%',             TRUE),
  ('Amit Raj',      'IIT Kanpur (EE)',            '2024', 'JEE Advanced', 'CRL 340',         TRUE),
  ('Sneha Kumari',  'AIR 892 JEE Advanced',       '2024', 'JEE Advanced', 'CRL 892',         FALSE),
  ('Rohan Sinha',   'Bihar Board Rank 12',        '2025', 'Bihar Board',  '97%',             FALSE),
  ('Ananya Mishra', 'AIR 445 JEE Main',           '2025', 'JEE Main',     '98.7 Percentile', FALSE);

INSERT INTO testimonials (quote, author, rank, is_active) VALUES
  ('Shaurya Math changed my perspective on JEE problems. The logical approach is unparalleled.', 'Rahul Kumar', 'AIR 127 JEE Main 2026', TRUE),
  ('Individual attention and doubt clearing sessions helped me top the Bihar Board Exams.', 'Priya Singh', '98% Bihar Board 2025', TRUE),
  ('Best coaching in Darbhanga for Mathematics. Concepts cleared from foundation level.', 'Amit Raj', 'JEE Advanced Qualified', TRUE),
  ('The weekly mock tests give a real exam-like feel. Highly recommended for JEE aspirants.', 'Sneha Jha', '12th Board Topper', TRUE);
