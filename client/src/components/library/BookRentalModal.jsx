
import { useState } from 'react';
import { Calendar, User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const BookRentalModal = ({ book, isOpen, onClose }) => {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate rental process
    toast.success(
      `Book "${book?.title}" has been rented successfully! Please visit the library with your QR code to collect the book.`,
      { duration: 5000 }
    );
    
    // Reset form and close modal
    setStudentInfo({ name: '', email: '', phone: '', studentId: '' });
    onClose();
  };

  const handleInputChange = (field, value) => {
    setStudentInfo(prev => ({ ...prev, [field]: value }));
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Rent Book</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Book Details</h3>
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">{book.title}</h4>
              <p className="text-gray-600">{book.author}</p>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {book.location}
              </div>
              <p className="text-sm text-gray-600">{book.description}</p>
            </div>
          </div>

          {/* Student Information Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Student Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="studentId"
                    placeholder="Enter your student ID"
                    value={studentInfo.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={studentInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={studentInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={studentInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Rental Terms */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-blue-900">Rental Terms</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Rental period: 30 days from issue date</li>
                  <li>• Late return fee: $2 per day</li>
                  <li>• Show QR code at library for book collection</li>
                  <li>• Book must be returned in good condition</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Rent Book
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookRentalModal;
