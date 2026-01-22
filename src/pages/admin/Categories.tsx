import { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { mockCategories } from '@/data/adminData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Pencil, Trash2 } from 'lucide-react';

export const AdminCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(
    null
  );

  const handleEdit = (category: typeof mockCategories[0]) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <AdminHeader title="Categories" />

      <div className="p-6 space-y-6">
        {/* Add Category Button */}
        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddNew}
                className="bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-['Playfair_Display'] text-xl">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    defaultValue={editingCategory?.categoryName || ''}
                    placeholder="Enter category name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={editingCategory?.description || ''}
                    placeholder="Enter category description"
                    className="mt-1"
                    rows={3}
                  />
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
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAF9F6]">
                <TableHead className="text-[#6B7B6E]">Category Name</TableHead>
                <TableHead className="text-[#6B7B6E]">Description</TableHead>
                <TableHead className="text-[#6B7B6E]">Products</TableHead>
                <TableHead className="text-[#6B7B6E]">Created</TableHead>
                <TableHead className="text-[#6B7B6E]">Updated</TableHead>
                <TableHead className="text-[#6B7B6E] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCategories.map((category) => (
                <TableRow key={category.id} className="hover:bg-[#FAF9F6]">
                  <TableCell className="font-medium text-[#2C3E2D]">
                    {category.categoryName}
                  </TableCell>
                  <TableCell className="text-[#6B7B6E] max-w-xs truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#2C3E2D]/10 text-[#2C3E2D] font-medium">
                      {category.productCount}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#6B7B6E]">{category.createdAt}</TableCell>
                  <TableCell className="text-[#6B7B6E]">{category.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
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
