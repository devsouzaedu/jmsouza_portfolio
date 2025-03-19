-- Verificar e adicionar a coluna goal_value se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name='habits' AND column_name='goal_value'
  ) THEN
    ALTER TABLE habits ADD COLUMN goal_value NUMERIC NOT NULL DEFAULT 1;
    RAISE NOTICE 'Coluna goal_value adicionada';
  ELSE
    RAISE NOTICE 'Coluna goal_value já existe';
  END IF;
END $$;

-- Verificar e adicionar a coluna unit se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name='habits' AND column_name='unit'
  ) THEN
    ALTER TABLE habits ADD COLUMN unit TEXT NOT NULL DEFAULT 'unidades';
    RAISE NOTICE 'Coluna unit adicionada';
  ELSE
    RAISE NOTICE 'Coluna unit já existe';
  END IF;
END $$;

-- Garantir que RLS está habilitado
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Adicionar políticas liberais para todas as operações
DROP POLICY IF EXISTS "Permitir inserção para todos" ON habits;
CREATE POLICY "Permitir inserção para todos" ON habits FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura para todos" ON habits;
CREATE POLICY "Permitir leitura para todos" ON habits FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir atualização para todos" ON habits;
CREATE POLICY "Permitir atualização para todos" ON habits FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir exclusão para todos" ON habits;
CREATE POLICY "Permitir exclusão para todos" ON habits FOR DELETE USING (true);

-- Verificar a estrutura da tabela habits
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'habits'; 