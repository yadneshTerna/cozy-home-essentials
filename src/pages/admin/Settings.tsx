import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Store, Bell, Shield, Palette } from 'lucide-react';

export const AdminSettings = () => {
  return (
    <div>
      <AdminHeader title="Settings" />

      <div className="p-6 max-w-4xl">
        <div className="space-y-8">
          {/* Store Settings */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[#2C3E2D]/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-[#2C3E2D]" />
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#2C3E2D]">
                  Store Settings
                </h2>
                <p className="text-sm text-[#6B7B6E]">
                  Configure your store information
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    defaultValue="Textile Haven"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Contact Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    defaultValue="contact@textilehaven.com"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input
                  id="storeAddress"
                  defaultValue="123 Main Street, New York, NY 10001"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[#2C3E2D]/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-[#2C3E2D]" />
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#2C3E2D]">
                  Notifications
                </h2>
                <p className="text-sm text-[#6B7B6E]">
                  Manage notification preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2C3E2D]">Order Notifications</p>
                  <p className="text-sm text-[#6B7B6E]">
                    Get notified when new orders are placed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2C3E2D]">Low Stock Alerts</p>
                  <p className="text-sm text-[#6B7B6E]">
                    Get notified when products are running low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2C3E2D]">New User Registrations</p>
                  <p className="text-sm text-[#6B7B6E]">
                    Get notified when new users sign up
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[#2C3E2D]/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#2C3E2D]" />
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#2C3E2D]">
                  Security
                </h2>
                <p className="text-sm text-[#6B7B6E]">Manage security settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2C3E2D]">Two-Factor Authentication</p>
                  <p className="text-sm text-[#6B7B6E]">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div>
                <Button variant="outline" className="text-[#2C3E2D] border-[#E8E4DC]">
                  Change Admin Password
                </Button>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[#2C3E2D]/10 flex items-center justify-center">
                <Palette className="h-5 w-5 text-[#2C3E2D]" />
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#2C3E2D]">
                  Appearance
                </h2>
                <p className="text-sm text-[#6B7B6E]">Customize the look and feel</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2C3E2D]">Dark Mode</p>
                  <p className="text-sm text-[#6B7B6E]">
                    Toggle dark mode for the admin panel
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
