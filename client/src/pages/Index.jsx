import { useState } from 'react';
import { Menu, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import BookFilters from '@/components/BookFilters';
import BookDetails from '@/components/BookDetails';
import BookRentalModal from '@/components/library/BookRentalModal';
import Navigation from '@/components/library/Navigation';
import StudentDashboard from '@/components/library/StudentDashboard';
import AdminDashboard from '@/components/library/AdminDashboard';
import { toast } from 'sonner';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedAvailability, setSelectedAvailability] = useState('All Status');
  const [isLoading, setIsLoading] = useState(false);

  // Mock book data
  const books = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      author: 'John Smith',
      subject: 'Computer Science',
      availability: 'available',
      location: 'Floor 2, Section A, Shelf 12',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=300&h=400&fit=crop',
      description: 'A comprehensive introduction to computer science fundamentals covering programming, algorithms, and data structures.'
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      author: 'Jane Doe',
      subject: 'Mathematics',
      availability: 'borrowed',
      location: 'Floor 3, Section B, Shelf 05',
      dueDate: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2041?w=300&h=400&fit=crop',
      description: 'A rigorous exploration of advanced mathematical concepts, including calculus, algebra, and analysis.'
    },
    {
      id: '3',
      title: 'The Art of Physics',
      author: 'Richard Feynman',
      subject: 'Physics',
      availability: 'available',
      location: 'Floor 2, Section C, Shelf 22',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1587271749434-f3c80119f07e?w=300&h=400&fit=crop',
      description: 'A unique perspective on physics, blending scientific principles with philosophical insights.'
    },
    {
      id: '4',
      title: 'Organic Chemistry',
      author: 'Paula Yurkanis Bruice',
      subject: 'Chemistry',
      availability: 'reserved',
      location: 'Floor 4, Section D, Shelf 01',
      dueDate: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1614935341944-f80e94490121?w=300&h=400&fit=crop',
      description: 'A detailed study of organic compounds, reactions, and mechanisms, essential for chemistry students.'
    },
    {
      id: '5',
      title: 'The Double Helix',
      author: 'James Watson',
      subject: 'Biology',
      availability: 'available',
      location: 'Floor 3, Section A, Shelf 18',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1576091166128-59c3259498e5?w=300&h=400&fit=crop',
      description: 'A personal account of the discovery of the structure of DNA, offering insights into scientific research.'
    },
    {
      id: '6',
      title: 'Hamlet',
      author: 'William Shakespeare',
      subject: 'Literature',
      availability: 'available',
      location: 'Floor 1, Section B, Shelf 08',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1543168285-62599554911a?w=300&h=400&fit=crop',
      description: 'A timeless tragedy exploring themes of revenge, morality, and the human condition.'
    },
    {
      id: '7',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      subject: 'History',
      availability: 'available',
      location: 'Floor 4, Section C, Shelf 15',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1550399130-83040e9c1aa2?w=300&h=400&fit=crop',
      description: 'A sweeping survey of human history, from the Stone Age to the present day, offering a thought-provoking perspective on our species.'
    },
    {
      id: '8',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      subject: 'Psychology',
      availability: 'available',
      location: 'Floor 2, Section D, Shelf 03',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1589998019842-e43f47ba2c2d?w=300&h=400&fit=crop',
      description: 'An exploration of the two systems that drive the way we think, offering insights into decision-making and cognitive biases.'
    },
    {
      id: '9',
      title: 'Economics',
      author: 'Paul Samuelson',
      subject: 'Economics',
      availability: 'available',
      location: 'Floor 3, Section B, Shelf 21',
      dueDate: null,
      image: 'https://images.unsplash.com/photo-1563775998152-4949575c0a19?w=300&h=400&fit=crop',
      description: 'A comprehensive textbook covering microeconomics and macroeconomics, providing a foundation for understanding economic principles.'
    }
  ];

  // Authentication handlers
  const handleLogin = (email, password, role) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setUserRole(role);
      setIsLoading(false);
      toast.success(`Welcome! Logged in as ${role}`);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('student');
    setSidebarOpen(false);
    toast.success('Logged out successfully');
  };

  // Book handlers
  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsBookDetailsOpen(true);
  };

  const handleBorrow = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book && book.availability === 'available') {
      setSelectedBook(book);
      setIsRentalModalOpen(true);
    }
  };

  // Filter functions
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All Subjects' || book.subject === selectedSubject;
    const matchesAvailability = selectedAvailability === 'All Status' || book.availability === selectedAvailability;
    
    return matchesSearch && matchesSubject && matchesAvailability;
  });

  const clearFilters = () => {
    setSelectedSubject('All Subjects');
    setSelectedAvailability('All Status');
    setSearchTerm('');
  };

  // Login Form Component
  const LoginForm = ({ role, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
      onLogin(email, password, role);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${role}-email`}>Email</Label>
          <Input
            id={`${role}-email`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${role}-password`}>Password</Label>
          <Input
            id={`${role}-password`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`
          )}
        </Button>
      </form>
    );
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">CampusLibrary</h1>
            <p className="text-gray-600 mt-2">Digital Library Management System</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your library account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="mt-6">
                  <LoginForm role="student" onLogin={handleLogin} />
                </TabsContent>
                <TabsContent value="admin" className="mt-6">
                  <LoginForm role="admin" onLogin={handleLogin} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-6 text-sm text-gray-500">
            <p>Demo Credentials:</p>
            <p>Student: student@university.edu / password</p>
            <p>Admin: admin@university.edu / password</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation Sidebar */}
      <Navigation
        userRole={userRole}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">
                {userRole === 'student' ? 'Student Portal' : 'Admin Dashboard'}
              </h1>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {userRole === 'student' ? (
            <div>
              <Tabs defaultValue="dashboard" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="browse">Browse Books</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard">
                  <StudentDashboard />
                </TabsContent>
                
                <TabsContent value="browse">
                  <div className="space-y-6">
                    <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    
                    <BookFilters
                      selectedSubject={selectedSubject}
                      selectedAvailability={selectedAvailability}
                      onSubjectChange={setSelectedSubject}
                      onAvailabilityChange={setSelectedAvailability}
                      onClearFilters={clearFilters}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          onViewDetails={handleViewDetails}
                          onBorrow={handleBorrow}
                        />
                      ))}
                    </div>

                    {filteredBooks.length === 0 && (
                      <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <AdminDashboard />
          )}
        </div>
      </div>

      {/* Modals */}
      <BookDetails
        book={selectedBook}
        isOpen={isBookDetailsOpen}
        onClose={() => setIsBookDetailsOpen(false)}
        onBorrow={handleBorrow}
      />

      <BookRentalModal
        book={selectedBook}
        isOpen={isRentalModalOpen}
        onClose={() => setIsRentalModalOpen(false)}
      />
    </div>
  );
};

export default Index;
