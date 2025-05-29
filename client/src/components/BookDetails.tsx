
import { X, User, MapPin, Calendar, BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  availability: 'available' | 'borrowed' | 'reserved';
  location: string;
  dueDate?: string;
  image: string;
  description: string;
}

interface BookDetailsProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onBorrow: (bookId: string) => void;
}

const BookDetails = ({ book, isOpen, onClose, onBorrow }: BookDetailsProps) => {
  if (!book) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'borrowed':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Book Details</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Image */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <Badge className={`absolute top-2 right-2 ${getStatusColor(book.availability)}`}>
              {book.availability}
            </Badge>
          </div>
          
          {/* Book Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h2>
              
              <div className="flex items-center text-gray-600 mb-2">
                <User className="h-4 w-4 mr-2" />
                <span>{book.author}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{book.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <BookOpen className="h-4 w-4 mr-2" />
                <Badge variant="secondary">{book.subject}</Badge>
              </div>
              
              {book.dueDate && book.availability === 'borrowed' && (
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Due: {book.dueDate}</span>
                </div>
              )}
            </div>
            
            <Separator />
            
            <div>
              <div className="flex items-center mb-2">
                <Info className="h-4 w-4 mr-2 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Description</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {book.description}
              </p>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full"
                onClick={() => onBorrow(book.id)}
                disabled={book.availability !== 'available'}
              >
                {book.availability === 'available' ? 'Borrow This Book' : 'Currently Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;
