
import { useState } from 'react';
import { Download, Calendar, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDFExport = ({ isOpen, onClose, rentalData }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: 'all',
    includeStudentDetails: true,
    includeBookDetails: true,
    includeQRCodes: false
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const generatePDF = () => {
    // Filter data based on criteria
    let filteredData = rentalData;

    if (filters.dateFrom) {
      filteredData = filteredData.filter(rental => 
        new Date(rental.issueDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filteredData = filteredData.filter(rental => 
        new Date(rental.issueDate) <= new Date(filters.dateTo)
      );
    }

    if (filters.status !== 'all') {
      filteredData = filteredData.filter(rental => rental.status === filters.status);
    }

    // Create PDF
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Library Rental History Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Total Records: ${filteredData.length}`, 20, 40);

    // Add filters information
    let yPos = 50;
    if (filters.dateFrom || filters.dateTo) {
      doc.text(`Date Range: ${filters.dateFrom || 'Start'} to ${filters.dateTo || 'End'}`, 20, yPos);
      yPos += 10;
    }
    if (filters.status !== 'all') {
      doc.text(`Status Filter: ${filters.status}`, 20, yPos);
      yPos += 10;
    }

    // Prepare table data
    const tableHeaders = ['Rental ID', 'Issue Date', 'Status'];
    
    if (filters.includeStudentDetails) {
      tableHeaders.push('Student Name', 'Student ID', 'Email');
    }
    
    if (filters.includeBookDetails) {
      tableHeaders.push('Book Title', 'Author');
    }
    
    tableHeaders.push('Due Date');
    
    if (filters.includeQRCodes) {
      tableHeaders.push('QR Code');
    }

    const tableData = filteredData.map(rental => {
      const row = [rental.id, rental.issueDate, rental.status];
      
      if (filters.includeStudentDetails) {
        row.push(rental.studentName, rental.studentId, rental.studentEmail);
      }
      
      if (filters.includeBookDetails) {
        row.push(rental.bookTitle, rental.bookAuthor);
      }
      
      row.push(rental.dueDate);
      
      if (filters.includeQRCodes) {
        row.push(rental.qrCode);
      }
      
      return row;
    });

    // Add table using autoTable
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: yPos + 10,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
    });

    // Add summary at the end
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(12);
    doc.text('Summary:', 20, finalY);
    
    const statusCounts = {
      active: filteredData.filter(r => r.status === 'active').length,
      returned: filteredData.filter(r => r.status === 'returned').length,
      overdue: filteredData.filter(r => r.status === 'overdue').length,
    };
    
    doc.setFontSize(10);
    doc.text(`Active Rentals: ${statusCounts.active}`, 20, finalY + 10);
    doc.text(`Returned Books: ${statusCounts.returned}`, 20, finalY + 20);
    doc.text(`Overdue Books: ${statusCounts.overdue}`, 20, finalY + 30);

    // Save the PDF
    const fileName = `library-rental-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export PDF Report</span>
            </span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Range Filter */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Status Filter</span>
            </h3>
            <Select 
              value={filters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Include Options */}
          <div className="space-y-4">
            <h3 className="font-semibold">Include in Report</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeStudentDetails"
                  checked={filters.includeStudentDetails}
                  onCheckedChange={(checked) => 
                    handleFilterChange('includeStudentDetails', checked)
                  }
                />
                <Label htmlFor="includeStudentDetails">Student Details</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeBookDetails"
                  checked={filters.includeBookDetails}
                  onCheckedChange={(checked) => 
                    handleFilterChange('includeBookDetails', checked)
                  }
                />
                <Label htmlFor="includeBookDetails">Book Details</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeQRCodes"
                  checked={filters.includeQRCodes}
                  onCheckedChange={(checked) => 
                    handleFilterChange('includeQRCodes', checked)
                  }
                />
                <Label htmlFor="includeQRCodes">QR Code References</Label>
              </div>
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Report Preview</h4>
            <p className="text-sm text-blue-800">
              This report will include {rentalData.length} rental records with your selected filters and options.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={generatePDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFExport;
