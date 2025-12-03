export type UserRole = 'admin' | 'entregador';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  nome: string;
  created_at: string;
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia?: string;
  created_at: string;
}

export interface Entregador {
  id: string;
  user_id: string;
  nome: string;
  telefone: string;
  veiculo: string;
  placa: string;
  status: 'ativo' | 'inativo';
  created_at: string;
}

export type StatusPedido = 
  | 'pendente' 
  | 'em_rota' 
  | 'em_entrega' 
  | 'entregue' 
  | 'cancelado';

export interface Pedido {
  id: string;
  cliente_id: string;
  entregador_id?: string;
  numero_pedido: string;
  descricao: string;
  valor: number;
  status: StatusPedido;
  bairro: string;
  endereco_completo: string;
  observacoes?: string;
  data_criacao: string;
  data_entrega?: string;
  latitude?: number;
  longitude?: number;
}

export interface Rota {
  id: string;
  nome: string;
  bairro: string;
  entregador_id?: string;
  pedidos: string[]; // IDs dos pedidos
  data: string;
  status: 'planejada' | 'em_andamento' | 'concluida';
  created_at: string;
}
