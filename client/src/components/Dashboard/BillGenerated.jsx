import { useState } from "react";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Package } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

// Separate the actual invoice content into its own component
function InvoiceContent() {
  const [billData] = useState({
    companyName: "Tech Solutions Inc.",
    vatNumber: "SA123456789",
    billNumber: "INV-2024-001",
    date: format(new Date(), "yyyy-MM-dd"),
    companyAddress: "123 Business St, Riyadh, Saudi Arabia",
    customerName: "ABC Corporation",
    customerVAT: "SA987654321",
    items: [
      {
        id: 1,
        description: "Web Development Services",
        quantity: 1,
        price: 5000,
        vat: 15,
      },
      {
        id: 2,
        description: "Cloud Hosting (Annual)",
        quantity: 1,
        price: 1200,
        vat: 15,
      },
      {
        id: 3,
        description: "UX Consultation",
        quantity: 5,
        price: 200,
        vat: 15,
      },
    ],
  });

  const calculateSubtotal = () => {
    return billData.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  };

  const calculateVAT = () => {
    return billData.items.reduce(
      (acc, item) => acc + item.quantity * item.price * (item.vat / 100),
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  const qrCodeData = JSON.stringify({
    sellerName: billData.companyName,
    sellerVAT: billData.vatNumber,
    buyerName: billData.customerName,
    buyerVAT: billData.customerVAT,
    invoiceNumber: billData.billNumber,
    totalVAT: calculateVAT().toFixed(2),
    totalAmount: calculateTotal().toFixed(2),
    invoiceDate: billData.date,
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 print:shadow-none print:border-0 relative">
      {/* Watermark - only visible when printing */}
      <div className="hidden print:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 rotate-30 scale-150">
          <div className="text-9xl font-bold tracking-wider text-gray-900 mr-16 ">
            Distro
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50 print:bg-white relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                TS
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                {billData.companyName}
              </h1>
            </div>
            <p className="text-gray-600 whitespace-pre-line">
              {billData.companyAddress}
            </p>
            <div className="mt-4">
              <span className="font-medium">VAT Number:</span>{" "}
              <span className="text-gray-600">{billData.vatNumber}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full md:w-auto print:shadow-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              TAX INVOICE
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-600">Invoice No:</span>{" "}
                <span className="font-medium">{billData.billNumber}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Issue Date:</span>{" "}
                <span>{billData.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-8 border-b border-gray-200 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Bill To:
            </h3>
            <p className="font-medium">{billData.customerName}</p>
            <p className="text-gray-600">VAT Number: {billData.customerVAT}</p>
          </div>
          <div className="md:text-right">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Payment Method
            </h3>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Bank Transfer</span>
            </div>
            <p className="mt-2 text-gray-600">Due upon receipt</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="p-6 overflow-x-auto relative z-10">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="py-3 px-4 font-semibold rounded-l-lg">
                Description
              </th>
              <th className="py-3 px-4 font-semibold text-right">Qty</th>
              <th className="py-3 px-4 font-semibold text-right">Unit Price</th>
              <th className="py-3 px-4 font-semibold text-right">VAT %</th>
              <th className="py-3 px-4 font-semibold text-right rounded-r-lg">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {billData.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-right">{item.quantity}</td>
                <td className="py-3 px-4 text-right">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right">{item.vat}%</td>
                <td className="py-3 px-4 text-right font-medium">
                  $
                  {(item.quantity * item.price * (1 + item.vat / 100)).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="p-8 bg-gray-50 border-t border-gray-200 print:bg-white relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="order-2 md:order-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 inline-block print:shadow-none">
              <QRCode
                value={qrCodeData}
                size={128}
                level="H"
                className="border-4 border-white"
              />
              <p className="mt-2 text-xs text-gray-500 text-center">
                Scan for invoice details
              </p>
            </div>
            <div className="mt-4 max-w-xs">
              <h4 className="font-medium text-gray-800 mb-2">Notes</h4>
              <p className="text-sm text-gray-600">
                Thank you for your business. Please make payment within 15 days
                of invoice date.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 print:shadow-none">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    VAT ({billData.items[0]?.vat || 0}%):
                  </span>
                  <span className="font-medium">
                    ${calculateVAT().toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 print:bg-white">
              <h4 className="font-medium text-blue-800 mb-2">Bank Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-600">Bank Name:</span>
                <span>Al Rajhi Bank</span>
                <span className="text-gray-600">Account Name:</span>
                <span>{billData.companyName}</span>
                <span className="text-gray-600">IBAN:</span>
                <span>SA03 8000 0000 6080 1016 7519</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-100 text-center text-sm text-gray-500 print:bg-white relative z-10">
        <p>
          This is an electronically generated invoice and does not require a
          signature.
        </p>
      </div>
    </div>
  );
}

// For a logo-based watermark option

// Wrapper component for both dialog view and printable view
export function BillGenerated() {
  // State to manage print mode
  const [isPrintMode, setIsPrintMode] = useState(false);
  // State to choose watermark type

  // Function to handle print
  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      // Reset after printing is done or canceled
      setTimeout(() => setIsPrintMode(false), 500);
    }, 100);
  };

  // If in print mode, show only the invoice content for clean printing
  if (isPrintMode) {
    return (
      <div className="print-only max-w-5xl mx-auto p-0 relative">
        {/* Use text watermark by default */}
        <div className="hidden print:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 rotate-30">
            <div className="text-9xl font-bold tracking-wider text-gray-800 transform scale-150">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-900" />
                <span className="ml-2 text-2xl font-bold text-blue-900">
                  DISTRO
                </span>
              </div>
            </div>
          </div>
        </div>
        <InvoiceContent />
      </div>
    );
  }

  // Normal dialog view
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Invoice</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader className=" bg  ">
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>Invoice Preview</span>
            <div className="flex items-center gap-4 mr-7">
              <Button onClick={handlePrint} className="print:hidden">
                Print Invoice
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="max-w-5xl mx-auto bg-gray-50 p-6 print:p-0 print:bg-white">
            <InvoiceContent />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
