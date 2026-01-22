import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminProducts } from '@/data/adminData';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, materials, sizes, colors } from '@/data/products';

export const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof adminProducts[0] | null>(null);

  const filteredProducts = adminProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: typeof adminProducts[0]) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <AdminHeader title="Products" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7B6E]" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-[#E8E4DC] focus:border-[#2C3E2D]"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddNew}
                className="bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-['Playfair_Display'] text-xl">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      defaultValue={editingProduct?.name || ''}
                      placeholder="Enter product name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      defaultValue={editingProduct?.price || ''}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      defaultValue={editingProduct?.originalPrice || ''}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={editingProduct?.category}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.slug} value={cat.slug}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Select defaultValue={editingProduct?.material}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((mat) => (
                          <SelectItem key={mat} value={mat}>
                            {mat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select defaultValue={editingProduct?.size}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select defaultValue={editingProduct?.color}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white"
                  >
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAF9F6]">
                <TableHead className="text-[#6B7B6E]">Image</TableHead>
                <TableHead className="text-[#6B7B6E]">Name</TableHead>
                <TableHead className="text-[#6B7B6E]">Category</TableHead>
                <TableHead className="text-[#6B7B6E]">Price</TableHead>
                <TableHead className="text-[#6B7B6E]">Stock</TableHead>
                <TableHead className="text-[#6B7B6E]">Status</TableHead>
                <TableHead className="text-[#6B7B6E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-[#FAF9F6]">
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-[#2C3E2D]">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-[#6B7B6E] capitalize">
                    {product.category.replace('-', ' ')}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-[#2C3E2D]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[#6B7B6E] line-through text-sm ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {product.isNew && (
                        <Badge className="bg-blue-100 text-blue-800">New</Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-purple-100 text-purple-800">Bestseller</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        className="text-[#6B7B6E] hover:text-[#2C3E2D]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
