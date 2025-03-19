"use client";

import { useState, useEffect } from 'react';
import { supabaseHabit, getDefaultUserId } from '@/lib/habitTracker';
import { format, addDays, subDays, isToday, parseISO, isEqual, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlusCircle, Trash2, Check, X, AlertTriangle } from 'lucide-react';

interface Habit {
  id: string;
  user_id: string;
  habit_name: string;
  habit_type: string;
  goal_value: number;
  unit: string;
  created_at: string;
}

interface HabitLog {
  id: string;
  habit_id: string;
  log_date: string;
  status: number; // 0 = não marcado, 1 = concluído, 2 = não concluído
}

interface CalendarDay {
  date: Date;
  formattedDate: string;
  dayName: string;
  isToday: boolean;
}

const HabitCalendar: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<Record<string, HabitLog[]>>({});
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [newHabitName, setNewHabitName] = useState('');
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(16); // Mostrar 16 dias
  const [progress, setProgress] = useState(0);

  // Definir os dias do calendário
  useEffect(() => {
    const generateDays = () => {
      const daysArray: CalendarDay[] = [];
      const startDate = subDays(currentDate, 15);
      
      for (let i = 0; i < totalDays; i++) {
        const date = addDays(startDate, i);
        daysArray.push({
          date,
          formattedDate: format(date, 'yyyy-MM-dd'),
          dayName: format(date, 'EEE', { locale: ptBR }),
          isToday: isToday(date)
        });
      }
      
      setDays(daysArray);
    };
    
    generateDays();
  }, [currentDate, totalDays]);

  // Buscar hábitos e logs
  useEffect(() => {
    const fetchHabitsAndLogs = async () => {
      try {
        setLoading(true);
        
        // Buscar o ID do usuário usando a função do habitTracker
        const userId = getDefaultUserId();
        
        // Buscar hábitos
        const { data: habitsData, error: habitsError } = await supabaseHabit
          .from('habits')
          .select('*')
          .eq('user_id', userId);
          
        if (habitsError) throw habitsError;
        
        // Se não houver hábitos, parar aqui
        if (!habitsData || habitsData.length === 0) {
          setHabits([]);
          setLoading(false);
          return;
        }
        
        setHabits(habitsData);
        
        // Buscar logs para a faixa de datas
        const startDate = days[0]?.formattedDate;
        const endDate = days[days.length - 1]?.formattedDate;
        
        if (startDate && endDate) {
          const { data: logsData, error: logsError } = await supabaseHabit
            .from('habit_logs')
            .select('*')
            .in('habit_id', habitsData.map((h: Habit) => h.id))
            .gte('log_date', startDate)
            .lte('log_date', endDate);
            
          if (logsError) throw logsError;
          
          // Organizar logs por hábito e data
          const logsMap: Record<string, HabitLog[]> = {};
          
          habitsData.forEach((habit: Habit) => {
            logsMap[habit.id] = days.map(day => {
              const existingLog = logsData?.find(
                (log: any) => log.habit_id === habit.id && log.log_date === day.formattedDate
              );
              
              return existingLog || {
                id: `temp-${habit.id}-${day.formattedDate}`,
                habit_id: habit.id,
                log_date: day.formattedDate,
                status: 0 // Não marcado por padrão
              };
            });
          });
          
          setHabitLogs(logsMap);
          
          // Calcular progresso
          calculateProgress(logsMap, habitsData);
        }
      } catch (error) {
        console.error('Erro ao buscar hábitos ou logs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (days.length > 0) {
      fetchHabitsAndLogs();
    }
  }, [days]);

  // Função para calcular o progresso
  const calculateProgress = (logs: Record<string, HabitLog[]>, habitsData: Habit[]) => {
    if (!habitsData || habitsData.length === 0) {
      setProgress(0);
      return;
    }
    
    // Filtrar apenas os logs de hoje
    const today = format(new Date(), 'yyyy-MM-dd');
    let completed = 0;
    let total = 0;
    
    habitsData.forEach(habit => {
      const habitLogs = logs[habit.id] || [];
      const todayLog = habitLogs.find(log => log.log_date === today);
      
      if (todayLog) {
        total++;
        if (todayLog.status === 1) completed++;
      }
    });
    
    const progressValue = total > 0 ? (completed / total) * 100 : 0;
    setProgress(progressValue);
  };

  // Função para alternar o status de um hábito
  const toggleHabitStatus = async (habitId: string, date: string, currentStatus: number) => {
    try {
      // Circular entre os estados: 0 (não marcado) -> 1 (concluído) -> 2 (não concluído) -> 0 ...
      const newStatus = (currentStatus + 1) % 3;
      
      // Atualizar o estado local imediatamente para feedback visual
      const updatedLogs = { ...habitLogs };
      
      if (updatedLogs[habitId]) {
        const logIndex = updatedLogs[habitId].findIndex(log => log.log_date === date);
        
        if (logIndex !== -1) {
          updatedLogs[habitId][logIndex] = {
            ...updatedLogs[habitId][logIndex],
            status: newStatus
          };
        }
      }
      
      setHabitLogs(updatedLogs);
      
      // Calcular o novo progresso
      calculateProgress(updatedLogs, habits);
      
      // Atualizar no banco de dados
      const { data, error } = await supabaseHabit
        .rpc('toggle_habit_status', {
          p_habit_id: habitId,
          p_date: date,
          p_status: newStatus
        });
        
      if (error) throw error;
      
    } catch (error) {
      console.error('Erro ao atualizar status do hábito:', error);
      // Reverter a mudança local em caso de erro
      fetchData();
    }
  };

  // Função para recarregar os dados
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Buscar o ID do usuário usando a função do habitTracker
      const userId = getDefaultUserId();
      
      // Buscar hábitos
      const { data: habitsData, error: habitsError } = await supabaseHabit
        .from('habits')
        .select('*')
        .eq('user_id', userId);
        
      if (habitsError) throw habitsError;
      
      setHabits(habitsData || []);
      
      // Buscar logs para a faixa de datas
      if (habitsData && habitsData.length > 0 && days.length > 0) {
        const startDate = days[0]?.formattedDate;
        const endDate = days[days.length - 1]?.formattedDate;
        
        if (startDate && endDate) {
          const { data: logsData, error: logsError } = await supabaseHabit
            .from('habit_logs')
            .select('*')
            .in('habit_id', habitsData.map((h: Habit) => h.id))
            .gte('log_date', startDate)
            .lte('log_date', endDate);
            
          if (logsError) throw logsError;
          
          // Organizar logs por hábito
          const logsMap: Record<string, HabitLog[]> = {};
          
          habitsData.forEach((habit: Habit) => {
            logsMap[habit.id] = days.map(day => {
              const existingLog = logsData?.find(
                (log: any) => log.habit_id === habit.id && log.log_date === day.formattedDate
              );
              
              return existingLog || {
                id: `temp-${habit.id}-${day.formattedDate}`,
                habit_id: habit.id,
                log_date: day.formattedDate,
                status: 0
              };
            });
          });
          
          setHabitLogs(logsMap);
          
          // Calcular progresso
          calculateProgress(logsMap, habitsData);
        }
      }
    } catch (error) {
      console.error('Erro ao recarregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar novo hábito
  const addHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newHabitName.trim()) return;
    
    try {
      const userId = getDefaultUserId();
      
      const { data, error } = await supabaseHabit
        .from('habits')
        .insert({
          user_id: userId,
          habit_name: newHabitName,
          habit_type: 'simples',
          goal_value: 1,
          unit: 'vez'
        })
        .select();
        
      if (error) throw error;
      
      setNewHabitName('');
      setIsAddingHabit(false);
      fetchData();
      
    } catch (error) {
      console.error('Erro ao adicionar hábito:', error);
    }
  };

  // Função para excluir hábito
  const deleteHabit = async (habitId: string) => {
    if (!confirm('Tem certeza que deseja excluir este hábito e todos os seus registros?')) {
      return;
    }
    
    try {
      // Primeiro excluir os logs relacionados
      const { error: logsError } = await supabaseHabit
        .from('habit_logs')
        .delete()
        .eq('habit_id', habitId);
        
      if (logsError) throw logsError;
      
      // Depois excluir o hábito
      const { error: habitError } = await supabaseHabit
        .from('habits')
        .delete()
        .eq('id', habitId);
        
      if (habitError) throw habitError;
      
      // Atualizar estado local
      setHabits(habits.filter(h => h.id !== habitId));
      const updatedLogs = { ...habitLogs };
      delete updatedLogs[habitId];
      setHabitLogs(updatedLogs);
      
    } catch (error) {
      console.error('Erro ao excluir hábito:', error);
    }
  };

  // Renderizar célula do calendário
  const renderCalendarCell = (habit: Habit, day: CalendarDay) => {
    const logs = habitLogs[habit.id] || [];
    const dayLog = logs.find(log => log.log_date === day.formattedDate);
    const status = dayLog?.status || 0;
    
    // Estilos baseados no status
    let cellClass = "w-10 h-10 flex items-center justify-center rounded cursor-pointer transition-colors";
    
    if (status === 0) {
      // Não marcado - cinza
      cellClass += " bg-gray-700 hover:bg-gray-600 text-gray-300";
    } else if (status === 1) {
      // Concluído - verde
      cellClass += " bg-green-500 hover:bg-green-600 text-white";
    } else if (status === 2) {
      // Não concluído - vermelho
      cellClass += " bg-red-500 hover:bg-red-600 text-white";
    }
    
    // Adicionar borda para destacar o dia atual
    if (day.isToday) {
      cellClass += " ring-2 ring-blue-500";
    }
    
    let icon = null;
    if (status === 1) {
      icon = <Check className="w-5 h-5" />;
    } else if (status === 2) {
      icon = <X className="w-5 h-5" />;
    }
    
    return (
      <div 
        className={cellClass}
        onClick={() => toggleHabitStatus(habit.id, day.formattedDate, status)}
        title={`${habit.habit_name} - ${day.formattedDate}`}
      >
        {icon}
      </div>
    );
  };

  // Frases motivacionais baseadas no progresso
  const getMotivationalQuote = () => {
    if (progress >= 80) {
      return "Excelente! Continue com esse ritmo incrível!";
    } else if (progress >= 50) {
      return "Bom progresso! Você está no caminho certo.";
    } else if (progress >= 30) {
      return "Continue se esforçando, cada pequeno passo conta!";
    } else {
      return "Comece devagar, mantenha-se consistente. Você consegue!";
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendário de Hábitos</h2>
          <p className="text-gray-300">{format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
          <p className="text-sm text-blue-400 mt-1">{getMotivationalQuote()}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex items-center mb-2">
            <div className="w-40 h-3 bg-gray-700 rounded-full mr-2">
              <div 
                className="h-3 bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-300">{Math.round(progress)}% hoje</span>
          </div>
          
          <button
            onClick={() => setIsAddingHabit(!isAddingHabit)}
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            <span>Novo hábito</span>
          </button>
        </div>
      </div>
      
      {isAddingHabit && (
        <form onSubmit={addHabit} className="mb-6 flex">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Nome do novo hábito"
            className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          >
            Adicionar
          </button>
        </form>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
          <p className="mt-2 text-gray-300">Carregando...</p>
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
          <p className="text-gray-300">Nenhum hábito encontrado. Adicione seu primeiro hábito!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Legenda */}
            <div className="flex items-center justify-end mb-4 space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
                <span className="text-xs text-gray-300">Concluído</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-1"></div>
                <span className="text-xs text-gray-300">Não concluído</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-500 rounded mr-1"></div>
                <span className="text-xs text-gray-300">Não marcado</span>
              </div>
            </div>
            
            {/* Cabeçalho do calendário - Dias */}
            <div className="flex mb-2">
              <div className="w-60 font-medium text-gray-300">Hábito</div>
              {days.map((day, index) => (
                <div 
                  key={index} 
                  className={`w-10 text-center text-xs font-medium ${day.isToday ? 'text-blue-400' : 'text-gray-400'}`}
                >
                  <div className="mb-1">{day.dayName}</div>
                  <div>{day.date.getDate()}</div>
                </div>
              ))}
            </div>
            
            {/* Linhas de hábitos */}
            {habits.map(habit => (
              <div key={habit.id} className="flex items-center mb-3 py-2 border-t border-gray-700">
                <div className="w-60 pr-4 flex items-center justify-between">
                  <span className="font-medium truncate text-white" title={habit.habit_name}>
                    {habit.habit_name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHabit(habit.id);
                    }}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {days.map((day, index) => (
                  <div key={index} className="w-10 flex justify-center">
                    {renderCalendarCell(habit, day)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitCalendar; 