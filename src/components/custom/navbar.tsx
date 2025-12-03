'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Truck, 
  Menu, 
  LayoutDashboard, 
  Users, 
  Package, 
  UserCircle, 
  Route, 
  BarChart3, 
  LogOut 
} from 'lucide-react';
import { signOut } from '@/lib/supabase';
import { toast } from 'sonner';

interface NavbarProps {
  userRole: 'admin' | 'entregador';
}

export function Navbar({ userRole }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logout realizado com sucesso');
      router.push('/login');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  const adminLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/clientes', label: 'Clientes', icon: Users },
    { href: '/pedidos', label: 'Pedidos', icon: Package },
    { href: '/entregadores', label: 'Entregadores', icon: UserCircle },
    { href: '/rotas', label: 'Rotas', icon: Route },
    { href: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  ];

  const entregadorLinks = [
    { href: '/dashboard', label: 'Minhas Entregas', icon: LayoutDashboard },
    { href: '/rotas', label: 'Rotas', icon: Route },
  ];

  const links = userRole === 'admin' ? adminLinks : entregadorLinks;

  const NavLinks = () => (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{link.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
              Solid Express
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Solid Express</h2>
                    <p className="text-xs text-gray-500">
                      {userRole === 'admin' ? 'Administrador' : 'Entregador'}
                    </p>
                  </div>
                </div>
                <NavLinks />
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 mt-4"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
