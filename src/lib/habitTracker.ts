import { createClient } from '@supabase/supabase-js';

// Função para gerar UUIDs
function generateUUID() {
  // Implementação simplificada de UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, 
          v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Função para obter um user_id padrão (para uso quando autenticação não é necessária)
export function getDefaultUserId() {
  // Tentar obter o ID do localStorage para consistência entre sessões
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('habit_tracker_user_id');
    if (!userId) {
      userId = generateUUID();
      localStorage.setItem('habit_tracker_user_id', userId);
    }
    return userId;
  }
  
  // Fallback para quando localStorage não está disponível
  return generateUUID();
}

// Configurações do Supabase para o Habit Tracker
// Usa variáveis de ambiente quando disponíveis ou as credenciais fixas como fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_HABIT || "https://amvpytrzaukoovokslyg.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_HABIT || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdnB5dHJ6YXVrb292b2tzbHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDc2NTIsImV4cCI6MjA1Nzk4MzY1Mn0.EkM9PHTLSK--3mvtngmnOAAgJRc7lIv5sKfUmZfMBQY";

// Criar o cliente do Supabase para o Habit Tracker
export const supabaseHabit = createClient(supabaseUrl, supabaseAnonKey);

// Interfaces
export interface Habit {
  id: string;
  user_id: string;
  habit_name: string;
  habit_type: string;
  goal_value: number;
  unit: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  log_date: string | Date;
  value: number;
  notes?: string;
  created_at: string | Date;
}

/**
 * Função para buscar todos os hábitos de um usuário
 * @param userId - ID do usuário
 */
export async function getHabits(userId: string): Promise<Habit[]> {
  try {
    const { data, error } = await supabaseHabit
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar hábitos:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar hábitos:', error);
    return [];
  }
}

/**
 * Função para buscar um hábito pelo ID
 * @param habitId - ID do hábito
 */
export async function getHabitById(habitId: string): Promise<Habit | null> {
  try {
    const { data, error } = await supabaseHabit
      .from('habits')
      .select('*')
      .eq('id', habitId)
      .single();

    if (error) {
      console.error(`Erro ao buscar hábito ${habitId}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Erro ao buscar hábito ${habitId}:`, error);
    return null;
  }
}

/**
 * Função para criar ou atualizar um hábito
 * @param habit - Os dados do hábito
 * @param isNew - Se true, cria um novo hábito; se false, atualiza um existente
 */
export async function saveHabit(habit: Partial<Habit>, isNew = true): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // Log para debugging
    console.log('Tentando salvar hábito:', JSON.stringify(habit, null, 2));
    console.log('URL do Supabase:', supabaseUrl);
    
    // Cria uma cópia do hábito para não modificar o original
    const habitData = { ...habit };
    
    // Usar o user_id padrão se não for fornecido
    if (!habitData.user_id) {
      habitData.user_id = getDefaultUserId();
      console.log('Usando user_id padrão:', habitData.user_id);
    }
    
    // Validação de dados obrigatórios
    if (!habitData.habit_name) {
      console.error('Erro: habit_name é obrigatório');
      return { success: false, error: 'habit_name é obrigatório' };
    }
    
    if (!habitData.habit_type) {
      console.error('Erro: habit_type é obrigatório');
      return { success: false, error: 'habit_type é obrigatório' };
    }
    
    if (habitData.goal_value === undefined || habitData.goal_value === null) {
      console.error('Erro: goal_value é obrigatório');
      return { success: false, error: 'goal_value é obrigatório' };
    }
    
    if (!habitData.unit) {
      console.error('Erro: unit é obrigatório');
      return { success: false, error: 'unit é obrigatório' };
    }
    
    // Garantir que goal_value seja numérico
    if (typeof habitData.goal_value !== 'number') {
      try {
        habitData.goal_value = Number(habitData.goal_value);
      } catch (e) {
        console.error('Erro: goal_value deve ser numérico');
        return { success: false, error: 'goal_value deve ser numérico' };
      }
    }
    
    // Adicionar data de criação/atualização se não existir
    if (isNew && !habitData.created_at) {
      habitData.created_at = new Date().toISOString();
    }
    
    habitData.updated_at = new Date().toISOString();
    
    console.log('Dados finais do hábito:', JSON.stringify(habitData, null, 2));
    
    const operation = isNew
      ? supabaseHabit.from('habits').insert([habitData])
      : supabaseHabit.from('habits').update(habitData).eq('id', habitData.id);

    const { data, error } = await operation;

    if (error) {
      console.error(`Erro ao ${isNew ? 'criar' : 'atualizar'} hábito:`, JSON.stringify(error, null, 2));
      return { success: false, error };
    }

    console.log('Hábito salvo com sucesso:', data);
    return { success: true, data };
  } catch (error) {
    console.error(`Erro ao ${isNew ? 'criar' : 'atualizar'} hábito:`, error);
    return { success: false, error };
  }
}

/**
 * Função para excluir um hábito
 * @param habitId - O ID do hábito a ser excluído
 */
export async function deleteHabit(habitId: string): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabaseHabit
      .from('habits')
      .delete()
      .eq('id', habitId);

    if (error) {
      console.error(`Erro ao excluir hábito ${habitId}:`, error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error(`Erro ao excluir hábito ${habitId}:`, error);
    return { success: false, error };
  }
}

/**
 * Função para buscar logs de um hábito em um período
 * @param habitId - ID do hábito
 * @param startDate - Data de início (opcional)
 * @param endDate - Data de fim (opcional)
 */
export async function getHabitLogs(habitId: string, startDate?: string, endDate?: string): Promise<HabitLog[]> {
  try {
    let query = supabaseHabit
      .from('habit_logs')
      .select('*')
      .eq('habit_id', habitId)
      .order('log_date', { ascending: false });

    if (startDate) {
      query = query.gte('log_date', startDate);
    }

    if (endDate) {
      query = query.lte('log_date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar logs de hábito:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar logs de hábito:', error);
    return [];
  }
}

/**
 * Função para registrar uma entrada de log
 * @param log - Os dados do log
 */
export async function addHabitLog(log: Partial<HabitLog>): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // Verifica se já existe um log para este hábito nesta data
    const { data: existingLog } = await supabaseHabit
      .from('habit_logs')
      .select('id')
      .eq('habit_id', log.habit_id)
      .eq('log_date', log.log_date)
      .single();

    let operation;
    
    if (existingLog) {
      // Atualiza o log existente
      operation = supabaseHabit
        .from('habit_logs')
        .update({ value: log.value, notes: log.notes })
        .eq('id', existingLog.id);
    } else {
      // Cria um novo log
      operation = supabaseHabit
        .from('habit_logs')
        .insert([log]);
    }

    const { data, error } = await operation;

    if (error) {
      console.error('Erro ao registrar log de hábito:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao registrar log de hábito:', error);
    return { success: false, error };
  }
}

/**
 * Função para excluir um log
 * @param logId - O ID do log a ser excluído
 */
export async function deleteHabitLog(logId: string): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabaseHabit
      .from('habit_logs')
      .delete()
      .eq('id', logId);

    if (error) {
      console.error(`Erro ao excluir log ${logId}:`, error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error(`Erro ao excluir log ${logId}:`, error);
    return { success: false, error };
  }
}

/**
 * Função para obter o resumo de todos os hábitos de um usuário no período
 * @param userId - ID do usuário
 * @param startDate - Data de início
 * @param endDate - Data de fim
 */
export async function getHabitsSummary(userId: string, startDate: string, endDate: string) {
  try {
    // Primeiro, obtem todos os hábitos do usuário
    const habits = await getHabits(userId);
    
    // Para cada hábito, busca os logs no período
    const summary = await Promise.all(habits.map(async (habit) => {
      const logs = await getHabitLogs(habit.id, startDate, endDate);
      
      // Calcula o progresso médio (valor / meta)
      const completedDays = logs.length;
      const totalValue = logs.reduce((sum, log) => sum + log.value, 0);
      const avgValue = completedDays > 0 ? totalValue / completedDays : 0;
      const avgProgress = habit.goal_value > 0 ? (avgValue / habit.goal_value) * 100 : 0;
      
      return {
        habit,
        logs,
        stats: {
          completedDays,
          totalValue,
          avgValue,
          avgProgress
        }
      };
    }));
    
    return summary;
  } catch (error) {
    console.error('Erro ao obter resumo de hábitos:', error);
    return [];
  }
} 