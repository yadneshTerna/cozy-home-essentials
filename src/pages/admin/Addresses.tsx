import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { mockAddresses, mockUsers } from '@/data/adminData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, MapPin } from 'lucide-react';

export const AdminAddresses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getUserName = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const filteredAddresses = mockAddresses.filter(
    (address) =>
      address.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getUserName(address.userId).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <AdminHeader title="Addresses" />

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7B6E]" />
          <Input
            placeholder="Search addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#E8E4DC] focus:border-[#2C3E2D]"
          />
        </div>

        {/* Addresses Table */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAF9F6]">
                <TableHead className="text-[#6B7B6E]">User</TableHead>
                <TableHead className="text-[#6B7B6E]">Shipping Address</TableHead>
                <TableHead className="text-[#6B7B6E]">Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAddresses.map((address) => (
                <TableRow key={address.id} className="hover:bg-[#FAF9F6]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#2C3E2D] flex items-center justify-center text-white font-medium">
                        {getUserName(address.userId).charAt(0)}
                      </div>
                      <span className="font-medium text-[#2C3E2D]">
                        {getUserName(address.userId)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-[#6B7B6E] mt-0.5 flex-shrink-0" />
                      <span className="text-[#6B7B6E]">{address.shippingAddress}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6B7B6E]">{address.shippingPhone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAddresses.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-[#6B7B6E]/50 mx-auto mb-4" />
            <p className="text-[#6B7B6E]">No addresses found</p>
          </div>
        )}
      </div>
    </div>
  );
};
