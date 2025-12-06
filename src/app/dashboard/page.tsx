'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getUser } from '@/lib/supabase';
import { Navbar } from '@/components/custom/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Users, MapPin, TrendingUp, Clock } from 'lucide-react';
import type { UserRole } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('admin');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro ao buscar role do usuário:', error);
        router.push('/login');
        return;
      }
      
      setUserRole(data.role);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Pedidos Hoje',
      value: '24',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Em Entrega',
      value: '8',
      icon: Truck,
      color: 'from-green-500 to-green-600',
      change: '+5%',
    },
    {
      title: 'Entregadores Ativos',
      value: '12',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      change: '+2',
    },
    {
      title: 'Rotas Ativas',
      value: '5',
      icon: MapPin,
      color: 'from-orange-500 to-orange-600',
      change: '+1',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar userRole={userRole} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {userRole === 'admin' ? 'Dashboard Administrativo' : 'Minhas Entregas'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bem-vindo ao sistema Solid Express - Aracaju/SE
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-sm font-medium">
                      {stat.title}
                    </CardDescription>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>Últimas atualizações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Pedido #00{i} atualizado
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Status: Em entrega - Bairro Atalaia
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">há {i}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Rotas do Dia
              </CardTitle>
              <CardDescription>Rotas planejadas para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Atalaia', 'Farolândia', 'Jardins', 'Grageru'].map((bairro, i) => (
                  <div key={bairro} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-full">
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{bairro}</p>
                        <p className="text-xs text-gray-500">{3 + i} entregas</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      Ativa
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
