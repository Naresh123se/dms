import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import {
  UserPlus,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Warehouse,
  DollarSign,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllSupplierQuery } from "@/app/slices/supplierApiSlice";
import { useNavigate } from "react-router-dom";

function SupplierList() {
  const { data, refetch, isLoading, isError } = useGetAllSupplierQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const navigate = useNavigate();
  const suppliers = Array.isArray(data?.distributors) ? data.distributors : [];
  const sortedSuppliers = [...suppliers].reverse();
  const verifiedSuppliers = suppliers.filter(
    (supplier) => supplier.user.isVerified
  ).length;
  const unverifiedSuppliers = suppliers.length - verifiedSuppliers;

  return (
    <ScrollArea className="flex-1 h-[calc(100vh-64px)] bg-gray-50 p-6 mt-16">
      <div className="mx-auto max-w-7x ">
        {/* Header Section */}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200  mb-10 ">
          <div className="">
            <div className="flex justify-between">
          <div className="">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Suppliers
              </h1>
              <p className="text-gray-700 mb-5">
                Key partners ensuring a smooth supply chain.
              </p>
          </div>

              <Link to="/admin/add-supplier" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Supplier
                </Button>
              </Link>
            </div>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Suppliers
                </h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {suppliers.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Verified Suppliers
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {verifiedSuppliers}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Unverified Suppliers
                </h3>
                <p className="text-2xl font-bold text-red-600">
                  {unverifiedSuppliers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white p-6 rounded-xl h-48 border border-gray-200"
              />
            ))
          ) : isError ? (
            <div className="col-span-full text-center py-12">
              <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600">Failed to load suppliers</p>
            </div>
          ) : sortedSuppliers.length > 0 ? (
            sortedSuppliers.map((supplier) => (
              <div
                key={supplier._id}
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setIsDialogOpen(true);
                }}
                className="bg-white group cursor-pointer rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {supplier.user.name}
                      </h3>
                      <p className="text-sm text-indigo-600 font-medium">
                        {supplier.company}
                      </p>
                    </div>
                    {supplier.user.isVerified ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Clock className="h-6 w-6 text-amber-500" />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {supplier.warehouseDetails.address}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Warehouse className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate">{supplier.zipCode}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>
                        Balance: ${supplier.availableBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 rounded-b-xl">
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        supplier.user.isVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {supplier.user.isVerified ? "Verified" : "Pending"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Joined {new Date(supplier.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mb-4 text-gray-400">No suppliers found</div>
              <Button variant="outline" asChild>
                <Link to="/admin/add-supplier">Add First Supplier</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Supplier Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedSupplier && (
            <DialogContent className="sm:max-w-[600px] rounded-xl">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-12 top-2 text-gray-500 hover:text-indigo-600 border rounded-lg"
                onClick={() => {
                  setIsDialogOpen(false);
                  navigate(`/admin/edit-supplier/${selectedSupplier._id}`);
                }}
              >
                <Pencil className="w-4 " />
                Edit
              </Button>
              <DialogHeader className="flex flex-row items-center">
                <DialogTitle className="text-lg font-semibold">
                  Supplier Profile
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Warehouse className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedSupplier.user.name}
                    </h3>
                    <p className="text-sm text-indigo-600 font-medium">
                      {selectedSupplier.company}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Contact Email</p>
                    <p className="font-medium">{selectedSupplier.user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-medium">
                      {selectedSupplier.user.phone || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Registered Date</p>
                    <p className="font-medium">
                      {new Date(
                        selectedSupplier.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Verification Status</p>
                    <p
                      className={`font-medium ${
                        selectedSupplier.user.isVerified
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {selectedSupplier.user.isVerified
                        ? "Verified"
                        : "Pending Approval"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  {!selectedSupplier.user.isVerified && (
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        Approve Supplier
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Reject Application
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </ScrollArea>
  );
}

export default SupplierList;
