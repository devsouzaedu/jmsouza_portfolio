-- Tabela para rastreamento de hábitos
CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    habit_name VARCHAR(255) NOT NULL,
    habit_type VARCHAR(100) NOT NULL, -- leitura, corrida, agua, exercicio, calorias, escrita, estudo
    goal_value NUMERIC, -- meta diária (ex: 8 copos d'água, 30 minutos de corrida)
    unit VARCHAR(50), -- unidade de medida (minutos, páginas, copos, etc)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para rastrear os registros diários
CREATE TABLE IF NOT EXISTS habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    value NUMERIC NOT NULL, -- valor alcançado
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_habit_id ON habit_logs(habit_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_log_date ON habit_logs(log_date); 