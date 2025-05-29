
import { useState } from 'react';
import { Calendar, Clock, QrCode, BookOpen, Download, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import QRCodeModal from './QRCodeModal';

const StudentDashboard = () => {
  const [selectedRental, setSelectedRental] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Mock student rental data
  const rentals = [
    {
      id: 'R001',
      book: {
        id: 'B001',
        title: 'Introduction to Computer Science',
        author: 'John Smith',
        location: 'Shelf A-12'
      },
      rentalDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'active',
      qrCode: 'QR123456'
    },
    {
      id: 'R002',
      book: {
        id: 'B002',
        title: 'Advanced Mathematics',
        author: 'Jane Doe',
        location: 'Shelf B-05'
      },
      rentalDate: '2024-01-10',
      dueDate: '2024-02-10',
      status: 'overdue',
      qrCode: 'QR789012'
    }
  ];

  const handleShowQR = (rental) => {
    setSelectedRental(rental);
    setIsQRModalOpen(true);
  };

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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Books currently rented
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">
              Books past due date
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Books borrowed this year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Rentals */}
      <Card>
        <CardHeader>
          <CardTitle>My Current Rentals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Rental Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell className="font-medium">{rental.book.title}</TableCell>
                  <TableCell>{rental.book.author}</TableCell>
                  <TableCell>{rental.rentalDate}</TableCell>
                  <TableCell>{rental.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(rental.status)}>
                      {rental.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShowQR(rental)}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Show QR
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="justify-start h-auto p-4">
              <BookOpen className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Browse Books</div>
                <div className="text-sm text-muted-foreground">Find your next read</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <Download className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Download History</div>
                <div className="text-sm text-muted-foreground">Get your rental history</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Profile */}
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-500">Student ID: STU001</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">john.doe@university.edu</div>
                <div className="text-sm text-gray-500">Primary email</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">+1 (555) 123-4567</div>
                <div className="text-sm text-gray-500">Contact number</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Modal */}
      <QRCodeModal
        rental={selectedRental}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;
