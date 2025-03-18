"use client";

import { useState, useEffect } from 'react';
import { getHabits, saveHabit, deleteHabit, addHabitLog, getHabitLogs, Habit, HabitLog } from '@/lib/habitTracker';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HabitTracker() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
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

  // Autenticação
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar senha (hardcoded para este exemplo)
    if (password === '2210') {
      setIsAuthenticated(true);
      // Usar um ID de usuário fixo para o exemplo
      const demoUserId = '123e4567-e89b-12d3-a456-426614174000';
      setUserId(demoUserId);
      localStorage.setItem('habitTrackerAuth', 'true');
      localStorage.setItem('habitTrackerUserId', demoUserId);
    } else {
      alert('Senha incorreta!');
    }
  };

  // Carregar autenticação do localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('habitTrackerAuth');
    const savedUserId = localStorage.getItem('habitTrackerUserId');
    
    if (savedAuth === 'true' && savedUserId) {
      setIsAuthenticated(true);
      setUserId(savedUserId);
    }
  }, []);

  // Carregar hábitos quando autenticado
  useEffect(() => {
    if (isAuthenticated && userId) {
      loadHabits();
    }
  }, [isAuthenticated, userId]);

  // Carregar logs quando a data mudar
  useEffect(() => {
    if (isAuthenticated && habits.length > 0) {
      loadLogs();
    }
  }, [selectedDate, habits]);

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

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Rastreador de Hábitos</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-medium transition duration-200"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Rastreador de Hábitos</h1>
          <div className="flex items-center space-x-4">
            <Link 
              href="/habittracker/stats" 
              className="text-blue-400 hover:text-blue-300 mr-4 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Estatísticas
            </Link>
            <label htmlFor="date" className="font-medium">Data:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Formulário para adicionar novo hábito */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Hábito</h2>
          <form onSubmit={handleCreateHabit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="habit_name" className="block mb-2 text-sm font-medium">Nome</label>
              <input
                type="text"
                id="habit_name"
                value={newHabit.habit_name}
                onChange={(e) => setNewHabit({...newHabit, habit_name: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="habit_type" className="block mb-2 text-sm font-medium">Tipo</label>
              <select
                id="habit_type"
                value={newHabit.habit_type}
                onChange={handleHabitTypeChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="leitura">Leitura</option>
                <option value="corrida">Corrida</option>
                <option value="agua">Água</option>
                <option value="exercicio">Exercício</option>
                <option value="calorias">Calorias</option>
                <option value="escrita">Escrita</option>
                <option value="estudo">Estudo</option>
              </select>
            </div>
            <div>
              <label htmlFor="goal_value" className="block mb-2 text-sm font-medium">Meta Diária</label>
              <div className="flex">
                <input
                  type="number"
                  id="goal_value"
                  value={newHabit.goal_value || ''}
                  onChange={(e) => setNewHabit({...newHabit, goal_value: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 rounded-l bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
                <span className="px-3 py-2 rounded-r bg-gray-600 border border-gray-600">
                  {newHabit.unit}
                </span>
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-medium transition duration-200"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>

        {/* Lista de hábitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.length === 0 ? (
            <div className="col-span-full text-center py-8 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Nenhum hábito encontrado. Adicione seu primeiro hábito!</p>
            </div>
          ) : (
            habits.map((habit) => {
              const logs = habitLogs[habit.id] || [];
              const todayLog = logs.length > 0 ? logs[0] : null;
              const progress = calculateProgress(habit, logs);
              const progressColor = getProgressColor(progress);
              
              return (
                <div key={habit.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{habit.habit_name}</h3>
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {habit.habit_type.charAt(0).toUpperCase() + habit.habit_type.slice(1)} • Meta: {habit.goal_value} {habit.unit}
                    </p>
                    
                    <div className="mb-4">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${progressColor}`} 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>{todayLog ? todayLog.value : 0} {habit.unit}</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={todayLog ? todayLog.value : ''}
                        onChange={(e) => handleLogHabit(habit.id, parseFloat(e.target.value))}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                        placeholder={`Registrar ${habit.unit}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 