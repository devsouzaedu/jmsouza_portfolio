CREATE POLICY IF NOT EXISTS "Permitir inserção para todos" ON habits FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Permitir leitura para todos" ON habits FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Permitir atualização para todos" ON habits FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "Permitir exclusão para todos" ON habits FOR DELETE USING (true);
CREATE POLICY IF NOT EXISTS "Permitir inserção para todos" ON habit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Permitir leitura para todos" ON habit_logs FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Permitir atualização para todos" ON habit_logs FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "Permitir exclusão para todos" ON habit_logs FOR DELETE USING (true);
