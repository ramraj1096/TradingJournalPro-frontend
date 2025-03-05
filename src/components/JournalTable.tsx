import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { deleteJournal, getAllJournals } from '@/api/journal-api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import ShowJournalCard from './ShowJournalCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const JournalTable: React.FC = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const rowsPerPage = 14;

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournals(navigate);
        if (response.success) {
          if (response.journals.length === 0) {
            toast.info('No journals available!');
          } else {
            setJournals(response.journals);
          }
        } else {
          toast.error(response.message || 'Failed to fetch journals.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching journals.');
      }
    };

    fetchJournals();
  }, [navigate]);

  useEffect(() => {
    const deleteSelectedJournal = async () => {
      if (!isDeleting) return;

      try {
        const response = await deleteJournal(navigate, isDeleting);
        if (response.success) {
          toast.success(response.message);
          setJournals((prev) => prev.filter((journal) => journal._id !== isDeleting));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error in deleting journal.');
      } finally {
        setIsDeleting(null);
      }
    };

    deleteSelectedJournal();
  }, [isDeleting, navigate]);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };


  const totalPages = Math.ceil(journals.length / rowsPerPage);

  const currentJournals = journals.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card className="shadow-md border dark:bg-gray-900 rounded-lg bg-gray-50">
      <CardHeader>
        <h1 className="text-xl font-semibold">Journal History</h1>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Name</TableHead>
              <TableHead>Asset Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Trade Value</TableHead>
              <TableHead>Trade Category</TableHead>
              <TableHead>Profit / Loss</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentJournals.map((journal) => (
              <TableRow key={journal._id}>
                <TableCell>{journal.assetName}</TableCell>
                <TableCell>{journal.assetType}</TableCell>
                <TableCell>{journal.quantity}</TableCell>
                <TableCell>
                  {journal.totalTradedValue.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{journal.tradeCategory}</TableCell>
                <TableCell
                  className={`font-medium ${
                    journal.profitorLoss > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {journal.profitorLoss.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{formatDate(journal.date)}</TableCell>
                <TableCell className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" w-full">
                      <ShowJournalCard path={journal._id} />
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toast.info("edit feature is implementing soon!")}
                  >
                    <Edit2 className="w-4 h-4 text-yellow-500" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this journal? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsDeleting(null)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => setIsDeleting(journal._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardContent>
      <div className='mt-3 pt-3'>
        <Button
        className='bg-sky-400 float-end'
        onClick={()=> navigate("/journals/analytics")}
        >view analytics</Button>
      </div>
    </Card>
  );
};

export default JournalTable;
