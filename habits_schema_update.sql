-- Modificar a tabela de habit_logs para suportar três estados
-- Primeiro, vamos ver se precisamos recriar ou modificar a tabela existente

-- Verificar se a tabela habit_logs existe
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'habit_logs'
  ) THEN
    -- Se a tabela existir, adicionar uma coluna status se não existir
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'habit_logs' AND column_name = 'status'
    ) THEN
      -- Adicionar coluna status (0 = não marcado, 1 = concluído, 2 = não concluído)
      ALTER TABLE habit_logs ADD COLUMN status SMALLINT NOT NULL DEFAULT 0;
      RAISE NOTICE 'Coluna status adicionada à tabela habit_logs';
    ELSE
      RAISE NOTICE 'Coluna status já existe na tabela habit_logs';
    END IF;
  ELSE
    -- Se a tabela não existir, recriá-la com a nova estrutura
    CREATE TABLE habit_logs (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
      log_date DATE NOT NULL,
      value NUMERIC DEFAULT 0,
      status SMALLINT NOT NULL DEFAULT 0, -- 0 = não marcado, 1 = concluído, 2 = não concluído
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Habilitar RLS na nova tabela
    ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
    
    -- Adicionar políticas para permitir todas as operações
    CREATE POLICY "Permitir inserção para todos" ON habit_logs FOR INSERT WITH CHECK (true);
    CREATE POLICY "Permitir leitura para todos" ON habit_logs FOR SELECT USING (true);
    CREATE POLICY "Permitir atualização para todos" ON habit_logs FOR UPDATE USING (true);
    CREATE POLICY "Permitir exclusão para todos" ON habit_logs FOR DELETE USING (true);
    
    RAISE NOTICE 'Tabela habit_logs criada com estrutura atualizada';
  END IF;
END $$;

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
  COALESCE(l.status, 0) AS status -- 0 = não marcado, 1 = concluído, 2 = não concluído
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

-- Função para atualizar o status de um hábito
CREATE OR REPLACE FUNCTION toggle_habit_status(
  p_habit_id UUID,
  p_date DATE,
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