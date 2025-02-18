import { useNavigate } from "react-router-dom";
import {
  useAddSupplierMutation,
  useGetAllSupplierQuery,
} from "@/app/slices/supplierApiSlice";
import SupplierForm from "./SupplierForm ";
import { toast } from "react-toastify";

function AddSupplier() {
  const navigate = useNavigate();
  const [addSupplier, { isLoading }] = useAddSupplierMutation();
  const { refetch } = useGetAllSupplierQuery();

  const handleSubmit = async (data) => {
    try {
      const response = await addSupplier(data).unwrap();
      if (response.success) {
        refetch();
        toast.success("Supplier Added Successfully");
        navigate("/admin/suppliers");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <SupplierForm
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      isLoading={isLoading}
    />
  );
}

export default AddSupplier;
