
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
      {...props}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page, index) => {
        if (page < 0) {
          // Render ellipsis
          return (
            <div key={`ellipsis-${index}`} className="px-2">
              &hellip;
            </div>
          );
        }
        
        return (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            className={page === currentPage ? "bg-medical-blue hover:bg-medical-blue" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
