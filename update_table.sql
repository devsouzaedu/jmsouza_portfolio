-- Execute este SQL no Editor SQL do Supabase
ALTER TABLE posts ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT false; 