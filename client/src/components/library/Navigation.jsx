
import { BookOpen, Users, BarChart3, LogOut, X, Home, History, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navigation = ({ userRole, onLogout, sidebarOpen, setSidebarOpen }) => {
  const studentNavItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Browse Books' },
    { icon: QrCode, label: 'My Rentals' },
    { icon: History, label: 'History' },
  ];

  const adminNavItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Manage Books' },
    { icon: Users, label: 'Students' },
    { icon: History, label: 'Rental History' },
  ];

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold">CampusLibrary</h2>
                <p className="text-sm text-gray-500 capitalize">{userRole} Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                    item.active 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
