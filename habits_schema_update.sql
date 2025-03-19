-- Verificar se a extensão uuid-ossp está instalada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Limpar tabelas existentes para começar do zero
DROP TABLE IF EXISTS habit_logs CASCADE;
DROP TABLE IF EXISTS habits CASCADE;

-- Criar tabela de hábitos
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    habit_name TEXT NOT NULL,
    habit_type TEXT NOT NULL,
    goal_value NUMERIC NOT NULL DEFAULT 1,
    unit TEXT NOT NULL DEFAULT 'vez',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela de hábitos
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Criar políticas para hábitos
CREATE POLICY "Permitir acesso a todos" ON habits FOR ALL USING (true);

-- Criar tabela de logs de hábitos
CREATE TABLE IF NOT EXISTS public.habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    value NUMERIC DEFAULT 0,
    status SMALLINT NOT NULL DEFAULT 0, -- 0 = não marcado, 1 = concluído, 2 = não concluído
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela de logs
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;

-- Criar políticas para logs
CREATE POLICY "Permitir acesso a todos" ON habit_logs FOR ALL USING (true);

-- Remover a função existente antes de recriar com novos parâmetros
DROP FUNCTION IF EXISTS toggle_habit_status(UUID, DATE, SMALLINT);

-- Criar função para toggle de status
CREATE OR REPLACE FUNCTION toggle_habit_status(
  p_habit_id UUID,
  p_date DATE,  -- Mantendo o nome original p_date em vez de p_log_date
  p_status SMALLINT
) RETURNS VOID AS $$
BEGIN
  -- Verificar se o registro existe
  IF EXISTS (
    SELECT 1 FROM habit_logs
    WHERE habit_id = p_habit_id AND log_date = p_date
  ) THEN
    -- Atualizar o status
    UPDATE habit_logs
    SET status = p_status, updated_at = NOW()
    WHERE habit_id = p_habit_id AND log_date = p_date;
  ELSE
    -- Inserir novo registro
    INSERT INTO habit_logs (habit_id, log_date, status)
    VALUES (p_habit_id, p_date, p_status);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Criar view para consultar o status dos hábitos por dia
CREATE OR REPLACE VIEW habit_calendar AS
SELECT
  h.id AS habit_id,
  h.habit_name,
  h.habit_type,
  h.goal_value,
  h.unit,
  h.user_id,
  l.log_date,
  COALESCE(l.status, 0) AS status
FROM
  habits h
CROSS JOIN
  generate_series(
    (CURRENT_DATE - INTERVAL '14 days')::date,
    (CURRENT_DATE + INTERVAL '14 days')::date,
    '1 day'::interval
  ) AS dates(log_date)
LEFT JOIN
  habit_logs l ON h.id = l.habit_id AND l.log_date = dates.log_date
ORDER BY
  h.habit_name, dates.log_date; 