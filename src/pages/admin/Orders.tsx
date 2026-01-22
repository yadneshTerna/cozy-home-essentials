import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminOrders } from '@/data/adminData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, Pencil } from 'lucide-react';
import { Order } from '@/data/orders';

const statusColors = {
  Processing: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredOrders = adminOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <div>
      <AdminHeader title="Orders" />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7B6E]" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-[#E8E4DC] focus:border-[#2C3E2D]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-[#E8E4DC]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAF9F6]">
                <TableHead className="text-[#6B7B6E]">Order ID</TableHead>
                <TableHead className="text-[#6B7B6E]">Customer</TableHead>
                <TableHead className="text-[#6B7B6E]">Date</TableHead>
                <TableHead className="text-[#6B7B6E]">Items</TableHead>
                <TableHead className="text-[#6B7B6E]">Total</TableHead>
                <TableHead className="text-[#6B7B6E]">Status</TableHead>
                <TableHead className="text-[#6B7B6E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-[#FAF9F6]">
                  <TableCell className="font-medium text-[#2C3E2D]">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#2C3E2D]">
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-sm text-[#6B7B6E]">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6B7B6E]">{order.date}</TableCell>
                  <TableCell className="text-[#6B7B6E]">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </TableCell>
                  <TableCell className="font-medium text-[#2C3E2D]">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                        className="text-[#6B7B6E] hover:text-[#2C3E2D]"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#6B7B6E] hover:text-[#2C3E2D]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-['Playfair_Display'] text-xl">
                Order Details - {selectedOrder?.orderNumber}
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6 mt-4">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B7B6E]">Order Date</p>
                    <p className="font-medium text-[#2C3E2D]">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7B6E]">Status</p>
                    <Badge className={statusColors[selectedOrder.status]}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <p className="text-sm text-[#6B7B6E] mb-2">Shipping Address</p>
                  <div className="bg-[#FAF9F6] p-4 rounded-lg">
                    <p className="font-medium text-[#2C3E2D]">
                      {selectedOrder.shippingAddress.name}
                    </p>
                    <p className="text-[#6B7B6E]">
                      {selectedOrder.shippingAddress.street}
                    </p>
                    <p className="text-[#6B7B6E]">
                      {selectedOrder.shippingAddress.city},{' '}
                      {selectedOrder.shippingAddress.state}{' '}
                      {selectedOrder.shippingAddress.zip}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <p className="text-sm text-[#6B7B6E] mb-2">Order Items</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#2C3E2D]">{item.name}</p>
                          <p className="text-sm text-[#6B7B6E]">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium text-[#2C3E2D]">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-[#E8E4DC] pt-4">
                  <div className="flex justify-between text-[#6B7B6E]">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7B6E]">
                    <span>Shipping</span>
                    <span>
                      {selectedOrder.shipping === 0
                        ? 'Free'
                        : `$${selectedOrder.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#2C3E2D] text-lg mt-2">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Update Status */}
                <div className="flex justify-between items-center pt-4 border-t border-[#E8E4DC]">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#6B7B6E]">Update Status:</span>
                    <Select defaultValue={selectedOrder.status}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
