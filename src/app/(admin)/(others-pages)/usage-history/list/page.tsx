"use client";
import { useEffect, useState } from "react";
import UsageHistoryTable from "@/components/usage-history/UsageHistoryManagement";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Download 
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UsageHistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalItems, setTotalItems] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isDownloading, setIsDownloading] = useState(false);

  const fetchUsageHistory = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const res = await fetch("/api/usage-history/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          page: page, 
          pageSize: pageSize
        }),
      });
  
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
  
      setData(json.data.data.content || []);
      setTotalPages(json.data.data.totalPages || 0);
      setTotalItems(json.data.data.totalElements || 0);
      
      // Set initial date range based on data
      if (json.data.data.content?.length > 0) {
        const dates = json.data.data.content.map((item: any) => new Date(item.usedAt));
        const minDate = new Date(Math.min(...dates.map((date: Date) => date.getTime())));
        const maxDate = new Date(Math.max(...dates.map((date: Date) => date.getTime())));
        
        if (!startDate) setStartDate(minDate);
        if (!endDate) setEndDate(maxDate);
      }
    } catch (err: any) {
      toast.error("Gagal ambil data", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      fetchUsageHistory(newPage);
    }
  };

  const downloadReport = async () => {
    setIsDownloading(true);
    try {
      const params = new URLSearchParams();
      
      if (startDate) {
        params.append("startDate", startDate.toISOString().split('T')[0]);
      }
      
      if (endDate) {
        params.append("endDate", endDate.toISOString().split('T')[0]);
      }

      const res = await fetch(`/api/usage-history/download?${params}`);
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Gagal mengunduh laporan');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `promo_usage_report_${new Date().getTime()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Laporan berhasil diunduh");
    } catch (err: any) {
      toast.error("Gagal mengunduh laporan", { 
        description: err.message || 'Terjadi kesalahan saat mengunduh' 
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date || undefined);
  };
  
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date || undefined);
  };

  useEffect(() => {
    fetchUsageHistory();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-xl font-bold">Riwayat Penggunaan Promo</h1>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Tanggal Mulai</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                className="border rounded p-2 w-full"
                placeholderText="Pilih tanggal mulai"
                isClearable
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Tanggal Akhir</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate as Date | undefined}
                dateFormat="dd/MM/yyyy"
                className="border rounded p-2 w-full"
                placeholderText="Pilih tanggal akhir"
                isClearable
              />
            </div>
          </div>
          
          <button
            onClick={downloadReport}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isDownloading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Download size={16} />
            {isDownloading ? 'Mengunduh...' : 'Download Report'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Memuat data...</p>
        </div>
      ) : (
        <>
          <UsageHistoryTable data={data} />
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="text-sm text-gray-600">
              Menampilkan {data.length} dari {totalItems} data
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronsLeft size={16} />
              </button>
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="px-3 py-1">
                Halaman {currentPage + 1} dari {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
              
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}