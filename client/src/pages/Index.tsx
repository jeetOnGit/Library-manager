
import { useState } from 'react';
import { BookOpen, Users, BarChart3, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StudentDashboard from '../components/library/StudentDashboard';
import AdminDashboard from '../components/library/AdminDashboard';
import Navigation from '../components/library/Navigation';

type UserRole = 'student' | 'admin' | null;

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: 'Total Books', value: '15,000+', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Active Students', value: '2,500+', icon: Users, color: 'text-green-600' },
    { title: 'Books Rented Today', value: '150+', icon: BarChart3, color: 'text-purple-600' },
    { title: 'Available Books', value: '12,800+', icon: Settings, color: 'text-orange-600' },
  ];

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Navigation 
            userRole={currentUser} 
            onLogout={() => setCurrentUser(null)}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="flex-1 p-6 ml-0 lg:ml-64">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            {currentUser === 'student' ? <StudentDashboard /> : <AdminDashboard />}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CampusLibrary</h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setCurrentUser('student')}>
                Student Login
              </Button>
              <Button onClick={() => setCurrentUser('admin')}>
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Smart Library
              <span className="block text-blue-600">Management System</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Rent books online, show QR codes at pickup, and enjoy seamless library experiences. 
              Built for modern college students and efficient library management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setCurrentUser('student')} className="text-lg px-8 py-4">
                Browse Books as Student
              </Button>
              <Button variant="outline" size="lg" onClick={() => setCurrentUser('admin')} className="text-lg px-8 py-4">
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600">Simple, fast, and efficient book rental process</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Browse & Rent Online</h4>
              <p className="text-gray-600">Search our extensive catalog and rent books with just a few clicks</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Get QR Code</h4>
              <p className="text-gray-600">Receive a unique QR code for your rental confirmation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Show & Collect</h4>
              <p className="text-gray-600">Visit the library, show your QR code, and collect your book instantly</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
