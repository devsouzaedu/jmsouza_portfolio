CREATE POLICY "Permitir inserção para todos" ON habits FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura para todos" ON habits FOR SELECT USING (true);
CREATE POLICY "Permitir inserção para todos" ON habit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura para todos" ON habit_logs FOR SELECT USING (true);
