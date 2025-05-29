
import { useEffect, useRef } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'qrcode';

const QRCodeModal = ({ rental, isOpen, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (rental && canvasRef.current) {
      const qrData = JSON.stringify({
        rentalId: rental.id,
        bookId: rental.book.id,
        studentRental: true,
        timestamp: new Date().toISOString()
      });

      QRCode.toCanvas(canvasRef.current, qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).catch(console.error);
    }
  }, [rental]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `qr-code-${rental?.id}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!rental) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Book Collection QR Code</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-center">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
              <canvas ref={canvasRef} className="block" />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{rental.book.title}</h3>
            <p className="text-gray-600">{rental.book.author}</p>
            <p className="text-sm text-gray-500">Location: {rental.book.location}</p>
          </div>

          {/* Rental Details */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rental ID:</span>
              <span className="font-medium">{rental.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium">{rental.rentalDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-medium">{rental.dueDate}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Collection Instructions</h4>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>1. Visit the library during operating hours</li>
              <li>2. Show this QR code to the librarian</li>
              <li>3. Provide your student ID for verification</li>
              <li>4. Collect your book from the specified location</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            Keep this QR code safe. You'll need it to collect your book.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
