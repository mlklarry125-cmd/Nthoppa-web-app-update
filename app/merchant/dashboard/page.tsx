"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Package,
  Coffee,
  Smartphone,
  Home,
  ShoppingBag,
  CreditCard,
  Zap,
  CheckCircle,
  Receipt,
  Calendar,
  BarChart3,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  icon: string;
  category: string;
  available: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CostItem {
  id: number;
  type: "cogs" | "operating" | "oneoff";
  category?: string;
  productName?: string;
  description: string;
  amount: number;
  quantity?: number;
  unitCost?: number;
  frequency?: "daily" | "weekly" | "monthly";
  date: string;
}

interface SaleItem {
  product: Product;
  quantity: number;
}

interface Sale {
  id: number;
  items: SaleItem[];
  total: number;
  paymentMethod: string;
  date: string;
}

const paymentMethods = [
  { id: "orange", name: "Orange Money", icon: "📱", color: "bg-orange-500", badgeColor: "bg-orange-100 text-orange-700" },
  { id: "myzaka", name: "Mascom MyZaka", icon: "💳", color: "bg-blue-500", badgeColor: "bg-blue-100 text-blue-700" },
  { id: "smega", name: "BTC Smega", icon: "📲", color: "bg-green-500", badgeColor: "bg-green-100 text-green-700" },
  { id: "instantmoney", name: "Stanbic Instant Money", icon: "🏦", color: "bg-red-500", badgeColor: "bg-red-100 text-red-700" },
  { id: "cash", name: "Cash", icon: "💵", color: "bg-gray-500", badgeColor: "bg-gray-100 text-gray-700" },
  { id: "card", name: "Card (POS)", icon: "💳", color: "bg-purple-500", badgeColor: "bg-purple-100 text-purple-700" },
];

// Mock data
const defaultCategories: Category[] = [
  { id: 1, name: "Plates", icon: "🍽️" },
  { id: 2, name: "Sweets", icon: "🍬" },
  { id: 3, name: "Drinks", icon: "🥤" },
  { id: 4, name: "Airtime", icon: "📱" },
  { id: 5, name: "Groceries", icon: "🛒" },
];

const defaultProducts: Product[] = [
  { id: 1, name: "Beef Stew Plate", price: 45, icon: "🍛", category: "Plates", available: true },
  { id: 2, name: "Chicken Plate", price: 40, icon: "🍗", category: "Plates", available: true },
  { id: 3, name: "Coke", price: 12, icon: "🥤", category: "Drinks", available: true },
  { id: 4, name: "Fanta", price: 12, icon: "🥤", category: "Drinks", available: true },
  { id: 5, name: "Chocolate Bar", price: 8, icon: "🍫", category: "Sweets", available: true },
];

export default function MerchantDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  
  // State
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [sales, setSales] = useState<Sale[]>([
    { id: 1, items: [{ product: defaultProducts[0], quantity: 2 }], total: 90, paymentMethod: "orange", date: new Date().toISOString() },
    { id: 2, items: [{ product: defaultProducts[1], quantity: 1 }, { product: defaultProducts[2], quantity: 2 }], total: 64, paymentMethod: "cash", date: new Date().toISOString() },
  ]);
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: 1, type: "operating", description: "Rent", amount: 5000, frequency: "monthly", date: new Date().toISOString() },
    { id: 2, type: "operating", description: "Electricity", amount: 800, frequency: "monthly", date: new Date().toISOString() },
    { id: 3, type: "cogs", productName: "Beef Stew Plate", description: "Cost per plate", amount: 4500, quantity: 100, unitCost: 45, date: new Date().toISOString() },
  ]);
  const [showCostDialog, setShowCostDialog] = useState(false);
  const [newCost, setNewCost] = useState({
    type: "operating" as "cogs" | "operating" | "oneoff",
    description: "",
    amount: 0,
    frequency: "monthly" as "daily" | "weekly" | "monthly",
    productName: "",
    quantity: 0,
    unitCost: 0,
  });
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, category: "", icon: "📦", available: true });
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "📁" });

  // Calculate totals
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCosts = costItems.reduce((sum, cost) => {
    if (cost.type === "operating") {
      const multiplier = cost.frequency === "daily" ? 30 : cost.frequency === "weekly" ? 4 : 1;
      return sum + cost.amount * multiplier;
    }
    return sum + cost.amount;
  }, 0);
  const netProfit = totalSales - totalCosts;

  // Payment method breakdown
  const paymentBreakdown = paymentMethods.map(method => ({
    name: method.name,
    amount: sales.filter(s => s.paymentMethod === method.id).reduce((sum, s) => sum + s.total, 0),
    color: method.color,
    icon: method.icon,
  }));

  const getPaymentMethodBadge = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    return (
      <Badge className={`${method.badgeColor} flex items-center gap-1`}>
        <span>{method.icon}</span>
        {method.name}
      </Badge>
    );
  };

  const handleAddToSale = (product: Product) => {
    const existing = currentSale.find(item => item.product.id === product.id);
    if (existing) {
      setCurrentSale(currentSale.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCurrentSale([...currentSale, { product, quantity: 1 }]);
    }
  };

  const handleRemoveFromSale = (productId: number) => {
    setCurrentSale(currentSale.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromSale(productId);
    } else {
      setCurrentSale(currentSale.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const saleTotal = currentSale.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCompleteSale = () => {
    if (currentSale.length === 0) {
      toast({ title: "Error", description: "Please add items to the sale", variant: "destructive" });
      return;
    }
    if (!selectedPaymentMethod) {
      toast({ title: "Error", description: "Please select a payment method", variant: "destructive" });
      return;
    }
    
    const newSale: Sale = {
      id: sales.length + 1,
      items: [...currentSale],
      total: saleTotal,
      paymentMethod: selectedPaymentMethod,
      date: new Date().toISOString(),
    };
    
    setSales([newSale, ...sales]);
    setCurrentSale([]);
    setSelectedPaymentMethod("");
    setShowPaymentDialog(false);
    toast({ title: "Sale Completed!", description: `Sale of P${saleTotal} recorded successfully.` });
  };

  const handleAddCost = () => {
    if (!newCost.description || newCost.amount <= 0) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    const cost: CostItem = {
      id: costItems.length + 1,
      type: newCost.type,
      description: newCost.description,
      amount: newCost.amount,
      frequency: newCost.frequency,
      date: new Date().toISOString(),
    };
    
    if (newCost.type === "cogs") {
      cost.productName = newCost.productName;
      cost.quantity = newCost.quantity;
      cost.unitCost = newCost.unitCost;
    }
    
    setCostItems([...costItems, cost]);
    setShowCostDialog(false);
    setNewCost({ type: "operating", description: "", amount: 0, frequency: "monthly", productName: "", quantity: 0, unitCost: 0 });
    toast({ title: "Cost Added", description: "Cost has been recorded successfully." });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.category) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: newProduct.price,
      icon: newProduct.icon,
      category: newProduct.category,
      available: newProduct.available,
    };
    
    setProducts([...products, product]);
    setShowProductDialog(false);
    setNewProduct({ name: "", price: 0, category: "", icon: "📦", available: true });
    toast({ title: "Product Added", description: "Product has been added to your catalog." });
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({ title: "Error", description: "Please enter a category name", variant: "destructive" });
      return;
    }
    
    const category: Category = {
      id: categories.length + 1,
      name: newCategory.name,
      icon: newCategory.icon,
    };
    
    setCategories([...categories, category]);
    setShowCategoryDialog(false);
    setNewCategory({ name: "", icon: "📁" });
    toast({ title: "Category Added", description: "Category has been added." });
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] hover:bg-orange-50 -ml-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your sales, costs, and product catalog</p>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Sales</p>
                <p className="text-3xl font-bold">P{totalSales.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Costs</p>
                <p className="text-3xl font-bold">P{totalCosts.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Net Profit</p>
                <p className="text-3xl font-bold">P{netProfit.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Breakdown */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-[#FF6B35]" />
            Revenue by Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentBreakdown.map((method) => (
              <div key={method.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <span>{method.icon}</span>
                    {method.name}
                  </span>
                  <span className="font-semibold">P{method.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ width: `${totalSales ? (method.amount / totalSales) * 100 : 0}%`, backgroundColor: method.color.replace('bg-', '') === 'orange-500' ? '#FF6B35' : '#10b981' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="pos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="costs">Cost Management</TabsTrigger>
        </TabsList>

        {/* POS Tab */}
        <TabsContent value="pos" className="space-y-4 mt-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Product Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Products</h3>
                <div className="flex gap-2">
                  <select
                    className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                {filteredProducts.filter(p => p.available).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleAddToSale(product)}
                    className="bg-gray-50 hover:bg-orange-50 p-3 rounded-lg text-center transition-colors border border-gray-100"
                  >
                    <div className="text-2xl mb-1">{product.icon}</div>
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-[#FF6B35] font-bold text-sm">P{product.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Sale */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Current Sale</h3>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
                {currentSale.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Receipt className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No items added</p>
                    <p className="text-xs">Tap products to build your sale</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentSale.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.product.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">{item.product.name}</p>
                            <p className="text-sm text-gray-500">P{item.product.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFromSale(item.product.id)}
                            className="text-red-500 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-[#FF6B35]">P{saleTotal}</span>
                      </div>
                      <Button
                        className="w-full mt-4 bg-[#FF6B35] hover:bg-[#e55a2b]"
                        onClick={() => setShowPaymentDialog(true)}
                      >
                        Complete Sale →
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Product Catalog Tab */}
        <TabsContent value="catalog" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Product Categories</h3>
            <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Category Name</Label>
                    <Input
                      placeholder="e.g., Bakery, Electronics"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Icon (emoji)</Label>
                    <Input
                      placeholder="🍞"
                      value={newCategory.icon}
                      onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-[#FF6B35]" onClick={handleAddCategory}>
                    Add Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-6">
            {categories.map((category) => (
              <Card key={category.id} className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </span>
                    <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setNewProduct({ ...newProduct, category: category.name })}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {products.filter(p => p.category === category.name).map((product) => (
                      <div key={product.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-3xl mb-1">{product.icon}</div>
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-[#FF6B35] font-bold">P{product.price}</p>
                        <Badge className={product.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                          {product.available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cost Management Tab */}
        <TabsContent value="costs" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Cost Tracking</h3>
            <Dialog open={showCostDialog} onOpenChange={setShowCostDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF6B35] hover:bg-[#e55a2b]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Cost
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Cost</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Cost Type</Label>
                    <select
                      className="w-full border border-gray-200 rounded-lg p-2"
                      value={newCost.type}
                      onChange={(e) => setNewCost({ ...newCost, type: e.target.value as any })}
                    >
                      <option value="operating">Operating Expense</option>
                      <option value="cogs">Cost of Goods Sold</option>
                      <option value="oneoff">One-off Cost</option>
                    </select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      placeholder="e.g., Rent, Electricity, Raw materials"
                      value={newCost.description}
                      onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Amount (P)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={newCost.amount || ""}
                      onChange={(e) => setNewCost({ ...newCost, amount: parseFloat(e.target.value) })}
                    />
                  </div>
                  {newCost.type === "operating" && (
                    <div>
                      <Label>Frequency</Label>
                      <select
                        className="w-full border border-gray-200 rounded-lg p-2"
                        value={newCost.frequency}
                        onChange={(e) => setNewCost({ ...newCost, frequency: e.target.value as any })}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                  <Button className="w-full bg-[#FF6B35]" onClick={handleAddCost}>
                    Add Cost
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Operating Expenses</span>
                    <span className="font-bold">
                      P{costItems.filter(c => c.type === "operating").reduce((sum, c) => {
                        const multiplier = c.frequency === "daily" ? 30 : c.frequency === "weekly" ? 4 : 1;
                        return sum + c.amount * multiplier;
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost of Goods Sold</span>
                    <span className="font-bold">P{costItems.filter(c => c.type === "cogs").reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>One-off Costs</span>
                    <span className="font-bold">P{costItems.filter(c => c.type === "oneoff").reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Monthly Costs</span>
                      <span className="text-[#FF6B35]">P{totalCosts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Recent Cost Entries</h4>
              {costItems.slice(0, 5).map((cost) => (
                <div key={cost.id} className="bg-gray-50 rounded-lg p-3 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{cost.description}</p>
                    <p className="text-xs text-gray-500">{cost.type === "operating" ? `${cost.frequency} expense` : cost.type}</p>
                  </div>
                  <p className="font-bold text-red-600">P{cost.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Payment Method Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Sale</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#FF6B35]">P{saleTotal}</p>
              <p className="text-sm text-gray-600">Total Amount Due</p>
            </div>
            <div>
              <Label>Select Payment Method</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedPaymentMethod === method.id
                        ? "border-[#FF6B35] bg-orange-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{method.icon}</span>
                      <span className="text-sm">{method.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2b]" onClick={handleCompleteSale}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Sale
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input
                placeholder="e.g., Beef Burger"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Price (P)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={newProduct.price || ""}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label>Icon (emoji)</Label>
              <Input
                placeholder="🍔"
                value={newProduct.icon}
                onChange={(e) => setNewProduct({ ...newProduct, icon: e.target.value })}
              />
            </div>
            <Button className="w-full bg-[#FF6B35]" onClick={handleAddProduct}>
              Add Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}