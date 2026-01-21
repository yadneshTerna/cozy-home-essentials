// Mock orders data - TODO: Replace with API fetch from your backend
// Example: const orders = await fetch('/api/orders').then(res => res.json());

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'Delivered',
    items: [
      {
        id: '1',
        name: 'Premium Cotton Bedsheet Set',
        image: '/src/assets/product-1.jpg',
        quantity: 1,
        price: 89.99,
        size: 'King',
        color: 'Ivory White',
      },
      {
        id: '2',
        name: 'Velvet Cushion Cover',
        image: '/src/assets/product-3.jpg',
        quantity: 2,
        price: 24.99,
        color: 'Forest Green',
      },
    ],
    subtotal: 139.97,
    shipping: 0,
    total: 139.97,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'Shipped',
    items: [
      {
        id: '3',
        name: 'Linen Sofa Cover',
        image: '/src/assets/product-5.jpg',
        quantity: 1,
        price: 149.99,
        size: '3-Seater',
        color: 'Natural Beige',
      },
    ],
    subtotal: 149.99,
    shipping: 9.99,
    total: 159.98,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'Processing',
    items: [
      {
        id: '4',
        name: 'Silk Pillow Cover Set',
        image: '/src/assets/product-2.jpg',
        quantity: 4,
        price: 34.99,
        color: 'Blush Pink',
      },
    ],
    subtotal: 139.96,
    shipping: 0,
    total: 139.96,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
];
