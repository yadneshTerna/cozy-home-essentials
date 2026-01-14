import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { materials, sizes, colors } from "@/data/products";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export interface Filters {
  priceRange: [number, number];
  materials: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
  activeFiltersCount: number;
}

const FilterSection = ({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="font-medium text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="pt-2">{children}</div>}
    </div>
  );
};

export const FilterContent = ({ filters, onFiltersChange, onReset, activeFiltersCount }: ProductFiltersProps) => {
  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter((m) => m !== material);
    onFiltersChange({ ...filters, materials: newMaterials });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter((s) => s !== size);
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter((c) => c !== color);
    onFiltersChange({ ...filters, colors: newColors });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-sage hover:text-sage/80">
            Clear all
          </Button>
        )}
      </div>

      <FilterSection title="Price Range">
        <div className="px-1">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, priceRange: value as [number, number] })
            }
            min={0}
            max={200}
            step={10}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Material">
        <div className="space-y-3">
          {materials.map((material) => (
            <label
              key={material}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={filters.materials.includes(material)}
                onCheckedChange={(checked) =>
                  handleMaterialChange(material, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {material}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="space-y-3">
          {sizes.map((size) => (
            <label
              key={size}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={filters.sizes.includes(size)}
                onCheckedChange={(checked) =>
                  handleSizeChange(size, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {size}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="space-y-3">
          {colors.map((color) => (
            <label
              key={color}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={filters.colors.includes(color)}
                onCheckedChange={(checked) =>
                  handleColorChange(color, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {color}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <label className="flex items-center gap-3 cursor-pointer group">
          <Checkbox
            checked={filters.inStock}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, inStock: checked as boolean })
            }
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            In Stock Only
          </span>
        </label>
      </FilterSection>
    </div>
  );
};

const ProductFilters = (props: ProductFiltersProps) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {props.activeFiltersCount > 0 && (
              <span className="ml-1 h-5 w-5 rounded-full bg-sage text-cream text-xs flex items-center justify-center">
                {props.activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductFilters;
