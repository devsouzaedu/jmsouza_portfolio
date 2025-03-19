"use client";

import { useState, useEffect } from 'react';
import { getHabits, saveHabit, deleteHabit, addHabitLog, getHabitLogs, Habit, HabitLog, getDefaultUserId } from '@/lib/habitTracker';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import HabitCalendar from '@/components/HabitCalendar';

export default function HabitTracker() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<{[key: string]: HabitLog[]}>({});
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Estado para novo hábito
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({
    habit_name: '',
    habit_type: 'leitura',
    goal_value: 0,
    unit: 'páginas'
  });
  
  // Estado para novo log
  const [newLog, setNewLog] = useState<Partial<HabitLog>>({
    log_date: selectedDate,
    value: 0
  });

  useEffect(() => {
    // Verificar se o usuário já está autenticado no localStorage
    const isAuth = localStorage.getItem('habitTrackerAuth') === 'true';
    setAuthenticated(isAuth);
    
    // Garantir que um ID de usuário padrão está definido e definir o estado
    const defaultId = getDefaultUserId();
    setUserId(defaultId);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha simples para demonstração - em produção, use autenticação adequada
    if (password === '21dias') {
      setAuthenticated(true);
      localStorage.setItem('habitTrackerAuth', 'true');
      setError('');
    } else {
      setError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('habitTrackerAuth');
  };

  // Carregar hábitos quando autenticado
  useEffect(() => {
    if (authenticated && userId) {
      loadHabits();
    }
  }, [authenticated, userId]);

  // Carregar logs quando a data mudar
  useEffect(() => {
    if (authenticated && habits.length > 0) {
      loadLogs();
    }
  }, [authenticated, habits]);

  // Função para carregar hábitos do usuário
  const loadHabits = async () => {
    const userHabits = await getHabits(userId);
    setHabits(userHabits);
  };

  // Função para carregar logs dos hábitos
  const loadLogs = async () => {
    const logsMap: {[key: string]: HabitLog[]} = {};
    
    for (const habit of habits) {
      const logs = await getHabitLogs(habit.id, selectedDate, selectedDate);
      logsMap[habit.id] = logs;
    }
    
    setHabitLogs(logsMap);
  };

  // Criar novo hábito
  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newHabit.habit_name || !newHabit.habit_type) {
      alert('Por favor, preencha o nome e tipo do hábito');
      return;
    }
    
    const habitToSave = {
      ...newHabit,
      user_id: userId
    };
    
    const { success } = await saveHabit(habitToSave, true);
    
    if (success) {
      setNewHabit({
        habit_name: '',
        habit_type: 'leitura',
        goal_value: 0,
        unit: 'páginas'
      });
      loadHabits();
    } else {
      alert('Erro ao criar hábito');
    }
  };

  // Excluir hábito
  const handleDeleteHabit = async (habitId: string) => {
    if (confirm('Tem certeza que deseja excluir este hábito? Todos os registros serão perdidos.')) {
      const { success } = await deleteHabit(habitId);
      
      if (success) {
        loadHabits();
      } else {
        alert('Erro ao excluir hábito');
      }
    }
  };

  // Registrar log
  const handleLogHabit = async (habitId: string, value: number) => {
    const logToSave = {
      habit_id: habitId,
      log_date: selectedDate,
      value
    };
    
    const { success } = await addHabitLog(logToSave);
    
    if (success) {
      loadLogs();
    } else {
      alert('Erro ao registrar hábito');
    }
  };

  // Obter o tipo de unidade com base no tipo de hábito
  const getUnitByHabitType = (type: string) => {
    const unitMap: {[key: string]: string} = {
      'leitura': 'páginas',
      'corrida': 'minutos',
      'agua': 'copos',
      'exercicio': 'minutos',
      'calorias': 'cal',
      'escrita': 'palavras',
      'estudo': 'minutos'
    };
    
    return unitMap[type] || 'unidades';
  };

  // Atualizar unidade ao mudar o tipo de hábito
  const handleHabitTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    const unit = getUnitByHabitType(type);
    
    setNewHabit({
      ...newHabit,
      habit_type: type,
      unit
    });
  };

  // Calcular o progresso
  const calculateProgress = (habit: Habit, logs: HabitLog[]) => {
    if (!logs || logs.length === 0) return 0;
    
    const totalValue = logs.reduce((sum, log) => sum + log.value, 0);
    return habit.goal_value > 0 ? Math.min(100, (totalValue / habit.goal_value) * 100) : 0;
  };

  // Calcular a cor do progresso
  const getProgressColor = (progress: number) => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Rastreador de Hábitos</h1>
      
      {authenticated ? (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between mb-4">
            <Link 
              href="/habittracker/stats" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Sair
            </button>
          </div>
          
          {/* Novo componente de calendário de hábitos */}
          <HabitCalendar />
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </form>
        </div>
      )}
      
      <footer className="mt-8">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Eduardo
            </Link>
            <div className="mx-2">|</div>
            <Link href="/projetos" className="text-blue-600 hover:text-blue-800">
              Projetos
            </Link>
            <div className="mx-2">|</div>
            <Link href="/contato" className="text-blue-600 hover:text-blue-800">
              Contato
            </Link>
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">
            © 2025 Eduardo. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
} 