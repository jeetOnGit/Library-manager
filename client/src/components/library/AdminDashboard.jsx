
import { useState } from 'react';
import { Users, BookOpen, Clock, BarChart3, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PDFExport from './PDFExport';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isPDFExportOpen, setIsPDFExportOpen] = useState(false);

  // Mock rental data for admin
  const rentalData = [
    {
      id: 'R001',
      studentId: 'STU001',
      studentName: 'John Doe',
      studentEmail: 'john.doe@university.edu',
      bookId: 'B001',
      bookTitle: 'Introduction to Computer Science',
      bookAuthor: 'John Smith',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      returnDate: null,
      status: 'active',
      qrCode: 'QR123456'
    },
    {
      id: 'R002',
      studentId: 'STU002',
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@university.edu',
      bookId: 'B002',
      bookTitle: 'Advanced Mathematics',
      bookAuthor: 'Jane Doe',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      returnDate: null,
      status: 'overdue',
      qrCode: 'QR789012'
    },
    {
      id: 'R003',
      studentId: 'STU003',
      studentName: 'Bob Johnson',
      studentEmail: 'bob.johnson@university.edu',
      bookId: 'B003',
      bookTitle: 'Physics Fundamentals',
      bookAuthor: 'Albert Einstein',
      issueDate: '2024-01-05',
      dueDate: '2024-02-05',
      returnDate: '2024-02-03',
      status: 'returned',
      qrCode: 'QR345678'
    }
  ];

  const filteredRentals = rentalData.filter(rental => {
    const matchesSearch = rental.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rental.bookTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rental.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalRentals: rentalData.length,
    activeRentals: rentalData.filter(r => r.status === 'active').length,
    overdueBooks: rentalData.filter(r => r.status === 'overdue').length,
    totalStudents: new Set(rentalData.map(r => r.studentId)).size
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRentals}</div>
            <p className="text-xs text-muted-foreground">
              All time rentals
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRentals}</div>
            <p className="text-xs text-muted-foreground">
              Currently rented books
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">
              Books past due date
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Active borrowers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle>Rental Management</CardTitle>
            <Button onClick={() => setIsPDFExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by student name or book title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rental.studentName}</div>
                      <div className="text-sm text-gray-500">{rental.studentId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rental.bookTitle}</div>
                      <div className="text-sm text-gray-500">{rental.bookAuthor}</div>
                    </div>
                  </TableCell>
                  <TableCell>{rental.issueDate}</TableCell>
                  <TableCell>{rental.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(rental.status)}>
                      {rental.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {rental.status === 'active' && (
                        <Button variant="outline" size="sm">
                          Mark Returned
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">John Doe returned "Introduction to Computer Science"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Jane Smith rented "Advanced Mathematics"</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Book "Physics Fundamentals" is now overdue</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Export Modal */}
      <PDFExport
        isOpen={isPDFExportOpen}
        onClose={() => setIsPDFExportOpen(false)}
        rentalData={rentalData}
      />
    </div>
  );
};

export default AdminDashboard;
