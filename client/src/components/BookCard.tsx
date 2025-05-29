
import { Calendar, User, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onBorrow: (bookId: string) => void;
}

const BookCard = ({ book, onViewDetails, onBorrow }: BookCardProps) => {
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
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(book.availability)}`}>
          {book.availability}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <User className="h-4 w-4 mr-1" />
          <span className="text-sm">{book.author}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{book.location}</span>
        </div>
        
        <Badge variant="secondary" className="text-xs">
          {book.subject}
        </Badge>
        
        {book.dueDate && book.availability === 'borrowed' && (
          <div className="flex items-center text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-xs">Due: {book.dueDate}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-x-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(book)} className="flex-1">
          View Details
        </Button>
        <Button 
          size="sm" 
          onClick={() => onBorrow(book.id)}
          disabled={book.availability !== 'available'}
          className="flex-1"
        >
          {book.availability === 'available' ? 'Borrow' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
