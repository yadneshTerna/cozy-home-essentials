import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { mockUsers, mockAddresses } from '@/data/adminData';
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
import { Search, Eye, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewUser = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const getUserAddresses = (userId: string) => {
    return mockAddresses.filter((addr) => addr.userId === userId);
  };

  return (
    <div>
      <AdminHeader title="Users" />

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7B6E]" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#E8E4DC] focus:border-[#2C3E2D]"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAF9F6]">
                <TableHead className="text-[#6B7B6E]">Name</TableHead>
                <TableHead className="text-[#6B7B6E]">Email</TableHead>
                <TableHead className="text-[#6B7B6E]">Phone</TableHead>
                <TableHead className="text-[#6B7B6E]">Joined</TableHead>
                <TableHead className="text-[#6B7B6E]">Orders</TableHead>
                <TableHead className="text-[#6B7B6E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-[#FAF9F6]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#2C3E2D] flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-[#2C3E2D]">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6B7B6E]">{user.email}</TableCell>
                  <TableCell className="text-[#6B7B6E]">{user.phone}</TableCell>
                  <TableCell className="text-[#6B7B6E]">{user.createdAt}</TableCell>
                  <TableCell>
                    <Badge className="bg-[#2C3E2D]/10 text-[#2C3E2D]">
                      {user.ordersCount} orders
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewUser(user)}
                      className="text-[#6B7B6E] hover:text-[#2C3E2D]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* User Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-['Playfair_Display'] text-xl">
                User Details
              </DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6 mt-4">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#2C3E2D] flex items-center justify-center text-white text-2xl font-medium">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2C3E2D]">
                      {selectedUser.name}
                    </h3>
                    <p className="text-[#6B7B6E]">Member since {selectedUser.createdAt}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#6B7B6E]">
                    <Mail className="h-4 w-4" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B7B6E]">
                    <Phone className="h-4 w-4" />
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B7B6E]">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{selectedUser.ordersCount} orders placed</span>
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <h4 className="text-sm font-medium text-[#2C3E2D] mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Saved Addresses
                  </h4>
                  <div className="space-y-3">
                    {getUserAddresses(selectedUser.id).length > 0 ? (
                      getUserAddresses(selectedUser.id).map((address) => (
                        <div
                          key={address.id}
                          className="bg-[#FAF9F6] p-4 rounded-lg"
                        >
                          <p className="text-[#2C3E2D]">{address.shippingAddress}</p>
                          <p className="text-sm text-[#6B7B6E]">{address.shippingPhone}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#6B7B6E] text-sm">No addresses saved</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E4DC]">
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white">
                    View Orders
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
