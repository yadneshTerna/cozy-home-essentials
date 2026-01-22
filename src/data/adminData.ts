// Mock admin data based on ER diagram
// TODO: Replace with API calls to your backend

import { products, categories as productCategories } from './products';
import { mockOrders } from './orders';

// Category interface matching ER diagram
export interface Category {
  id: string;
  categoryName: string;
  description: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// User interface matching ER diagram
export interface AdminUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  ordersCount: number;
}

// Address interface matching ER diagram
export interface Address {
  id: string;
  userId: string;
  shippingAddress: string;
  shippingPhone: string;
}

// Mock categories data
export const mockCategories: Category[] = productCategories.map((cat, index) => ({
  id: `cat-${index + 1}`,
  categoryName: cat.label,
  description: cat.description,
  productCount: products.filter(p => p.category === cat.slug).length,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-15',
}));

// Mock users data
export const mockUsers: AdminUser[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    phone: '+1 234 567 8900',
    email: 'john@example.com',
    createdAt: '2024-01-05',
    ordersCount: 3,
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    phone: '+1 234 567 8901',
    email: 'jane@example.com',
    createdAt: '2024-01-10',
    ordersCount: 1,
  },
  {
    id: 'user-3',
    name: 'Bob Wilson',
    phone: '+1 234 567 8902',
    email: 'bob@example.com',
    createdAt: '2024-01-12',
    ordersCount: 2,
  },
  {
    id: 'user-4',
    name: 'Alice Brown',
    phone: '+1 234 567 8903',
    email: 'alice@example.com',
    createdAt: '2024-01-14',
    ordersCount: 0,
  },
  {
    id: 'user-5',
    name: 'Charlie Davis',
    phone: '+1 234 567 8904',
    email: 'charlie@example.com',
    createdAt: '2024-01-18',
    ordersCount: 5,
  },
];

// Mock addresses data
export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    userId: 'user-1',
    shippingAddress: '123 Main Street, New York, NY 10001',
    shippingPhone: '+1 234 567 8900',
  },
  {
    id: 'addr-2',
    userId: 'user-2',
    shippingAddress: '456 Oak Avenue, Los Angeles, CA 90001',
    shippingPhone: '+1 234 567 8901',
  },
  {
    id: 'addr-3',
    userId: 'user-3',
    shippingAddress: '789 Pine Road, Chicago, IL 60601',
    shippingPhone: '+1 234 567 8902',
  },
];

// Dashboard stats
export const getDashboardStats = () => {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalUsers = mockUsers.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'Processing').length;
  const shippedOrders = mockOrders.filter(o => o.status === 'Shipped').length;
  const deliveredOrders = mockOrders.filter(o => o.status === 'Delivered').length;

  return {
    totalOrders,
    totalRevenue,
    totalProducts,
    totalUsers,
    pendingOrders,
    shippedOrders,
    deliveredOrders,
    recentOrders: mockOrders.slice(0, 5),
    lowStockProducts: products.filter(p => !p.inStock).length,
    categoriesCount: mockCategories.length,
  };
};

// Export orders for admin use
export { mockOrders as adminOrders };
export { products as adminProducts };
