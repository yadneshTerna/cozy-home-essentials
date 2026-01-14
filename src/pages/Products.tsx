import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductFilters, { Filters, FilterContent } from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import { products, categories } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRODUCTS_PER_PAGE = 8;

const defaultFilters: Filters = {
  priceRange: [0, 200],
  materials: [],
  sizes: [],
  colors: [],
  inStock: false,
};

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryInfo = category
    ? categories.find((c) => c.slug === category)
    : null;

  const pageTitle = categoryInfo?.label || "All Products";
  const pageDescription =
    categoryInfo?.description ||
    "Explore our complete collection of premium home textiles";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by materials
    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material));
    }

    // Filter by sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) => filters.sizes.includes(p.size));
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }

    // Filter by stock
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
      default:
        result = [...result].sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        );
    }

    return result;
  }, [category, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Count active filters
  const activeFiltersCount =
    filters.materials.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200 ? 1 : 0);

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const breadcrumbItems = category
    ? [
        { label: "Products", href: "/products" },
        { label: pageTitle },
      ]
    : [{ label: "Products" }];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page Header */}
          <div className="mt-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground">{pageDescription}</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              {/* Mobile Filters */}
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
                activeFiltersCount={activeFiltersCount}
              />
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-soft">
                <FilterContent
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleResetFilters}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid
                products={paginatedProducts}
                onResetFilters={handleResetFilters}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
