import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[]; // Array of image URLs
  category: "bedsheets" | "pillow-covers" | "sofa-covers";
  material: "Cotton" | "Linen" | "Satin";
  size: "Single" | "Double" | "Queen" | "King";
  color: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Cotton Bedsheet Set",
    price: 89,
    originalPrice: 120,
    image: product1,
    images: [product1, product2, product3],
    category: "bedsheets",
    material: "Cotton",
    size: "Queen",
    color: "Cream",
    inStock: true,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Linen Pillow Cover Duo",
    price: 45,
    image: product2,
    images: [product2, product1],
    category: "pillow-covers",
    material: "Linen",
    size: "Single",
    color: "Beige",
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Sofa Slipcover",
    price: 149,
    originalPrice: 189,
    image: product3,
    images: [product3, product4, product5],
    category: "sofa-covers",
    material: "Cotton",
    size: "Double",
    color: "Cream",
    inStock: true,
  },
  {
    id: 4,
    name: "Luxury Duvet Cover Set",
    price: 129,
    image: product4,
    images: [product4, product5],
    category: "bedsheets",
    material: "Cotton",
    size: "King",
    color: "White",
    inStock: true,
    isNew: true,
  },
  {
    id: 5,
    name: "Soft Gray Cotton Sheets",
    price: 95,
    image: product5,
    images: [product5, product6],
    category: "bedsheets",
    material: "Cotton",
    size: "Queen",
    color: "Gray",
    inStock: true,
  },
  {
    id: 6,
    name: "Sage Green Pillow Cover",
    price: 35,
    originalPrice: 45,
    image: product6,
    images: [product6, product7, product8],
    category: "pillow-covers",
    material: "Linen",
    size: "Single",
    color: "Sage",
    inStock: true,
    isNew: true,
  },
  {
    id: 7,
    name: "Taupe Sofa Cover",
    price: 165,
    image: product7,
    images: [product7, product3],
    category: "sofa-covers",
    material: "Cotton",
    size: "Double",
    color: "Taupe",
    inStock: false,
  },
  {
    id: 8,
    name: "Striped Pillow Cover Set",
    price: 55,
    image: product8,
    images: [product8, product2],
    category: "pillow-covers",
    material: "Cotton",
    size: "Single",
    color: "Beige",
    inStock: true,
    isBestseller: true,
  },
  {
    id: 9,
    name: "Egyptian Cotton King Sheet",
    price: 159,
    originalPrice: 199,
    image: product1,
    images: [product1, product4, product5],
    category: "bedsheets",
    material: "Cotton",
    size: "King",
    color: "Cream",
    inStock: true,
  },
  {
    id: 10,
    name: "Velvet Pillow Cover",
    price: 42,
    image: product2,
    images: [product2],
    category: "pillow-covers",
    material: "Satin",
    size: "Single",
    color: "Beige",
    inStock: true,
  },
  {
    id: 11,
    name: "Linen Sofa Protector",
    price: 135,
    image: product3,
    images: [product3, product7],
    category: "sofa-covers",
    material: "Linen",
    size: "Double",
    color: "Cream",
    inStock: true,
    isNew: true,
  },
  {
    id: 12,
    name: "Satin Bedsheet Set",
    price: 175,
    image: product4,
    images: [product4, product1, product5],
    category: "bedsheets",
    material: "Satin",
    size: "Queen",
    color: "White",
    inStock: true,
  },
];

export const categories = [
  { slug: "bedsheets", label: "Bedsheets", description: "Soft, breathable sheets for restful nights" },
  { slug: "pillow-covers", label: "Pillow Covers", description: "Elegant designs for every bedroom style" },
  { slug: "sofa-covers", label: "Sofa Covers", description: "Protect and refresh your living space" },
];

export const materials = ["Cotton", "Linen", "Satin"] as const;
export const sizes = ["Single", "Double", "Queen", "King"] as const;
export const colors = ["Cream", "White", "Beige", "Gray", "Sage", "Taupe"] as const;
