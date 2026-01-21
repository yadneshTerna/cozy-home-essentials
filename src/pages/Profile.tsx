import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { mockOrders, Order } from '@/data/orders';
import { useToast } from '@/hooks/use-toast';

const OrderCard = ({ order }: { order: Order }) => {
  const statusConfig = {
    Processing: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    Shipped: { color: 'bg-blue-100 text-blue-800', icon: Truck },
    Delivered: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
    Cancelled: { color: 'bg-red-100 text-red-800', icon: Clock },
  };

  const StatusIcon = statusConfig[order.status].icon;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-stone-100">
        <div>
          <p className="font-medium text-stone-800">{order.orderNumber}</p>
          <p className="text-sm text-stone-500">
            Placed on {new Date(order.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Badge className={`${statusConfig[order.status].color} flex items-center gap-1`}>
          <StatusIcon className="h-3 w-3" />
          {order.status}
        </Badge>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium text-stone-800">{item.name}</p>
              <p className="text-sm text-stone-500">
                {item.color && `Color: ${item.color}`}
                {item.size && ` • Size: ${item.size}`}
              </p>
              <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium text-stone-800">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
        <div>
          <p className="text-sm text-stone-500">Total</p>
          <p className="text-lg font-semibold text-stone-800">${order.total.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-lg">
            Track Order
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Form state for profile editing
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold text-stone-800 mb-4">
              Please sign in to view your profile
            </h1>
            <Button
              onClick={() => navigate('/login')}
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-stone-800 mb-2">
              My Account
            </h1>
            <p className="text-stone-500">
              Manage your profile, orders, and preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-700 text-xl font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{user?.name}</p>
                    <p className="text-sm text-stone-500">{user?.email}</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'orders' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>Profile Info</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'addresses' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5" />
                      <span>Addresses</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-stone-800 mb-6">
                    My Orders
                  </h2>
                  {mockOrders.length === 0 ? (
                    <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
                      <Package className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                      <p className="text-stone-500 mb-4">You haven't placed any orders yet</p>
                      <Link to="/products">
                        <Button className="bg-emerald-700 hover:bg-emerald-800">
                          Start Shopping
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-stone-800 mb-6">
                    Profile Information
                  </h2>
                  <div className="bg-white rounded-xl border border-stone-200 p-6">
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">
                            Full Name
                          </label>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12 rounded-xl border-stone-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12 rounded-xl border-stone-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12 rounded-xl border-stone-300"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 rounded-xl h-12 px-8"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-stone-800 mb-6">
                    Saved Addresses
                  </h2>
                  <div className="bg-white rounded-xl border border-stone-200 p-6">
                    <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center">
                      <MapPin className="h-10 w-10 text-stone-300 mx-auto mb-4" />
                      <p className="text-stone-500 mb-4">No addresses saved yet</p>
                      <Button variant="outline" className="rounded-xl">
                        Add New Address
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-stone-800 mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-stone-200 p-6">
                      <h3 className="font-medium text-stone-800 mb-4">Change Password</h3>
                      <form className="space-y-4">
                        <Input
                          type="password"
                          placeholder="Current password"
                          className="h-12 rounded-xl border-stone-300"
                        />
                        <Input
                          type="password"
                          placeholder="New password"
                          className="h-12 rounded-xl border-stone-300"
                        />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          className="h-12 rounded-xl border-stone-300"
                        />
                        <Button className="bg-emerald-700 hover:bg-emerald-800 rounded-xl">
                          Update Password
                        </Button>
                      </form>
                    </div>

                    <div className="bg-white rounded-xl border border-stone-200 p-6">
                      <h3 className="font-medium text-stone-800 mb-4">Delete Account</h3>
                      <p className="text-sm text-stone-500 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" className="rounded-xl">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
