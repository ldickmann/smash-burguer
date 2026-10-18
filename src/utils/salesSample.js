// Dados de exemplo do painel: os mesmos valores no Painel e nos Relatórios.
import { formatPrice } from "@/utils/formatters";

export const SALES_KPIS = [
  { id: "sales", label: "Vendas totais", value: formatPrice(12450), note: "Últimos 30 dias" },
  { id: "orders", label: "Total de pedidos", value: "324", note: "Pedidos realizados" },
  { id: "ticket", label: "Ticket médio", value: formatPrice(38.42), note: "Por pedido" },
  { id: "top", label: "Mais vendido", value: "234 un.", note: "Coca-Cola" },
];

export const TOP_PRODUCTS = [
  { id: 4, name: "Coca-Cola", quantity: 234 },
  { id: 1, name: "Smash Burger", quantity: 156 },
  { id: 2, name: "Double Smash", quantity: 98 },
  { id: 3, name: "Chicken Burger", quantity: 87 },
];
