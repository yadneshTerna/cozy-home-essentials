import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatsCard } from '@/components/admin/StatsCard';
import { getDashboardStats, adminOrders } from '@/data/adminData';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const statusColors = {
  Processing: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export const Dashboard = () => {
  const stats = getDashboardStats();

  return (
    <div>
      <AdminHeader title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>

        {/* Order Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#E8E4DC] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B7B6E]">Pending Orders</p>
                <p className="text-2xl font-semibold text-[#2C3E2D]">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8E4DC] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B7B6E]">Shipped Orders</p>
                <p className="text-2xl font-semibold text-[#2C3E2D]">{stats.shippedOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8E4DC] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#6B7B6E]">Delivered Orders</p>
                <p className="text-2xl font-semibold text-[#2C3E2D]">{stats.deliveredOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] shadow-sm">
          <div className="p-6 border-b border-[#E8E4DC]">
            <h2 className="text-lg font-['Playfair_Display'] font-semibold text-[#2C3E2D]">
              Recent Orders
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAF9F6]">
                <TableHead className="text-[#6B7B6E]">Order ID</TableHead>
                <TableHead className="text-[#6B7B6E]">Customer</TableHead>
                <TableHead className="text-[#6B7B6E]">Date</TableHead>
                <TableHead className="text-[#6B7B6E]">Total</TableHead>
                <TableHead className="text-[#6B7B6E]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-[#FAF9F6]">
                  <TableCell className="font-medium text-[#2C3E2D]">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-[#6B7B6E]">
                    {order.shippingAddress.name}
                  </TableCell>
                  <TableCell className="text-[#6B7B6E]">{order.date}</TableCell>
                  <TableCell className="font-medium text-[#2C3E2D]">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
