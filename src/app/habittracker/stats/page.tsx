"use client";

import { useState, useEffect } from 'react';
import { getHabitsSummary, Habit, HabitLog } from '@/lib/habitTracker';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Interface para o resumo do hábito
interface HabitSummary {
  habit: Habit;
  logs: HabitLog[];
  stats: {
    completedDays: number;
    totalValue: number;
    avgValue: number;
    avgProgress: number;
  };
}

export default function HabitStats() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [summary, setSummary] = useState<HabitSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Últimos 30 dias
    endDate: new Date().toISOString().split('T')[0] // Hoje
  });
  
  // Verificar autenticação do localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('habitTrackerAuth');
    const savedUserId = localStorage.getItem('habitTrackerUserId');
    
    if (savedAuth === 'true' && savedUserId) {
      setIsAuthenticated(true);
      setUserId(savedUserId);
    } else {
      router.push('/habittracker');
    }
  }, [router]);

  // Carregar resumo quando autenticado ou quando mudar o período
  useEffect(() => {
    if (isAuthenticated && userId) {
      loadSummary();
    }
  }, [isAuthenticated, userId, dateRange]);

  // Função para carregar o resumo
  const loadSummary = async () => {
    setLoading(true);
    const data = await getHabitsSummary(userId, dateRange.startDate, dateRange.endDate);
    setSummary(data);
    setLoading(false);
  };

  // Calcular a cor do progresso
  const getProgressColor = (progress: number) => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Calcular quantos dias há no período selecionado
  const getDaysInRange = () => {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia final
  };

  // Renderizar o gráfico de barras para cada hábito
  const renderBarChart = (habit: Habit, logs: HabitLog[], totalDays: number) => {
    // Organizar logs por data
    const logsByDate: { [key: string]: number } = {};
    logs.forEach(log => {
      const dateStr = new Date(log.log_date).toISOString().split('T')[0];
      logsByDate[dateStr] = log.value;
    });
    
    // Criar array de datas no período
    const datesInRange: string[] = [];
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      datesInRange.push(dt.toISOString().split('T')[0]);
    }
    
    // Calcular altura máxima para o gráfico (meta ou valor máximo registrado)
    const maxValueInLogs = Math.max(...logs.map(log => log.value), 0);
    const maxHeight = Math.max(habit.goal_value, maxValueInLogs);
    
    return (
      <div className="mt-4 flex items-end h-32 space-x-1 overflow-x-auto pb-2">
        {datesInRange.map(date => {
          const value = logsByDate[date] || 0;
          const percentage = maxHeight > 0 ? (value / maxHeight) * 100 : 0;
          const isAboveGoal = value >= habit.goal_value && habit.goal_value > 0;
          const formattedDate = new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          
          return (
            <div key={date} className="flex flex-col items-center flex-shrink-0" style={{ minWidth: '20px' }}>
              <div className="w-full flex flex-col items-center justify-end h-24">
                <div 
                  className={`w-5 ${isAboveGoal ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ height: `${percentage}%`, minHeight: value > 0 ? '4px' : '0' }}
                  title={`${value} ${habit.unit}`}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1 transform -rotate-45 origin-top-left">
                {formattedDate}
              </div>
            </div>
          );
        })}
        
        {/* Linha da meta */}
        {habit.goal_value > 0 && (
          <div 
            className="absolute border-t border-dashed border-yellow-500" 
            style={{ 
              bottom: `${(habit.goal_value / maxHeight) * 96}px`, // Ajuste a posição em relação à altura do gráfico
              width: '100%'
            }}
          ></div>
        )}
      </div>
    );
  };

  if (!isAuthenticated) {
    return <div>Redirecionando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Estatísticas dos Hábitos</h1>
          <Link href="/habittracker" className="text-blue-400 hover:text-blue-300">
            Voltar ao Rastreador
          </Link>
        </div>
        
        {/* Seletor de período */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Período de Análise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block mb-2 text-sm font-medium">Data de Início</label>
              <input
                type="date"
                id="start_date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block mb-2 text-sm font-medium">Data de Fim</label>
              <input
                type="date"
                id="end_date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Carregando dados...</p>
          </div>
        )}
        
        {/* Resumo */}
        {!loading && summary.length === 0 && (
          <div className="text-center py-8 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Nenhum hábito encontrado para o período selecionado.</p>
          </div>
        )}
        
        {/* Cards dos hábitos */}
        {!loading && summary.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {summary.map(({ habit, logs, stats }) => {
              const totalDays = getDaysInRange();
              const completion = (stats.completedDays / totalDays) * 100;
              
              return (
                <div key={habit.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{habit.habit_name}</h3>
                      <div className="px-2 py-1 rounded bg-gray-700 text-xs">
                        {habit.habit_type.charAt(0).toUpperCase() + habit.habit_type.slice(1)}
                      </div>
                    </div>
                    
                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Regularidade</p>
                        <div className="flex items-center">
                          <span className="text-xl font-bold">{stats.completedDays}</span>
                          <span className="text-xs text-gray-400 ml-2">/ {totalDays} dias</span>
                          <span className="ml-auto text-sm">{completion.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                          <div 
                            className={`h-1.5 rounded-full ${getProgressColor(completion)}`} 
                            style={{ width: `${completion}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Progresso Médio</p>
                        <div className="flex items-center">
                          <span className="text-xl font-bold">{stats.avgValue.toFixed(1)}</span>
                          <span className="text-xs text-gray-400 ml-2">/ {habit.goal_value} {habit.unit}</span>
                          <span className="ml-auto text-sm">{stats.avgProgress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                          <div 
                            className={`h-1.5 rounded-full ${getProgressColor(stats.avgProgress)}`} 
                            style={{ width: `${Math.min(100, stats.avgProgress)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Totalizador */}
                    <div className="bg-gray-700 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Total no Período</p>
                      <p className="text-2xl font-bold">{stats.totalValue.toFixed(1)} <span className="text-sm font-normal text-gray-400">{habit.unit}</span></p>
                    </div>
                    
                    {/* Gráfico */}
                    <div className="mt-4 relative">
                      <h4 className="text-sm font-medium mb-2">Histórico Diário</h4>
                      {renderBarChart(habit, logs, totalDays)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 