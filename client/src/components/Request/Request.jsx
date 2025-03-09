import { useState } from "react";
import { CheckCircle, XCircle, Clock, Building2 } from "lucide-react";
import { toast } from "react-toastify";
import { ScrollArea } from "../ui/scroll-area";

function Request() {
  const initialRequests = [
    {
      requestId: "req_001",
      userId: "user123",
      status: "pending",
      supplier: null,
      timestamp: "2025-03-09T10:00:00Z",
    },
    {
      requestId: "req_002",
      userId: "user456",
      status: "pending",
      supplier: null,
      timestamp: "2025-03-09T12:00:00Z",
    },
    {
      requestId: "req_003",
      userId: "user456",
      status: "pending",
      supplier: null,
      timestamp: "2025-03-09T12:00:00Z",
    },
    {
      requestId: "req_004",
      userId: "user456",
      status: "pending",
      supplier: null,
      timestamp: "2025-03-09T12:00:00Z",
    },
  ];

  const supplierOptions = ["Custom", "Supplier A", "Supplier B", "Supplier C"];

  const [requests, setRequests] = useState(initialRequests);
  const [supplierInput, setSupplierInput] = useState({});
  const [selectedSupplier, setSelectedSupplier] = useState({});

  const handleApprove = (requestId) => {
    const supplier =
      selectedSupplier[requestId] === "Custom"
        ? supplierInput[requestId] || ""
        : selectedSupplier[requestId] || "";
    if (!supplier) {
      toast.error("Please select or enter a supplier name.")
      return;
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.requestId === requestId
          ? { ...req, status: "approved", supplier }
          : req
      )
    );
    setSupplierInput((prev) => ({ ...prev, [requestId]: "" }));
    setSelectedSupplier((prev) => ({ ...prev, [requestId]: "" }));
      toast.error("Please select or enter a supplier name.");


    // Success toast for approval
    toast.success(
      `Request #${requestId} approved and assigned to ${supplier}!`
    );
  };

  const handleReject = (requestId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.requestId === requestId ? { ...req, status: "rejected" } : req
      )
    );
      toast.error("Please select or enter a supplier name.");

    // Success toast for rejection
    toast.success(`Request #${requestId} rejected.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleSupplierChange = (requestId, value) => {
    setSupplierInput((prev) => ({ ...prev, [requestId]: value }));
  };

  const handleDropdownChange = (requestId, value) => {
    setSelectedSupplier((prev) => ({ ...prev, [requestId]: value }));
    if (value !== "Custom") {
      setSupplierInput((prev) => ({ ...prev, [requestId]: "" }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8 pt-4">
          <Building2 className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Supplier Request</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {requests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No supplier requests pending.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {requests.map((request) => (
                <div
                  key={request.requestId}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          {getStatusIcon(request.status)}
                          <span
                            className={`ml-2 text-sm font-medium px-3 py-1 rounded-full bg-opacity-10 capitalize
                            ${
                              request.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : request.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          Request #{request.requestId}
                        </h3>
                        <p className="text-gray-600">
                          User ID: {request.userId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(request.timestamp).toLocaleString()}
                        </p>
                        {request.supplier && (
                          <p className="mt-2 text-blue-600 font-medium">
                            Assigned to: {request.supplier}
                          </p>
                        )}
                      </div>

                      {request.status === "pending" && (
                        <div className="mt-4 md:mt-0 flex space-x-3">
                          <button
                            onClick={() => handleReject(request.requestId)}
                            className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleApprove(request.requestId)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </button>
                        </div>
                      )}
                    </div>

                    {request.status === "pending" && (
                      <div className="mt-6 space-y-4">
                        <select
                          value={selectedSupplier[request.requestId] || ""}
                          onChange={(e) =>
                            handleDropdownChange(
                              request.requestId,
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                          <option value="">Select a supplier</option>
                          {supplierOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        {selectedSupplier[request.requestId] === "Custom" && (
                          <input
                            type="text"
                            placeholder="Enter custom supplier name"
                            value={supplierInput[request.requestId] || ""}
                            onChange={(e) =>
                              handleSupplierChange(
                                request.requestId,
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

export default Request;
