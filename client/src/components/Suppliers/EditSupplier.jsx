import { useNavigate, useParams } from "react-router-dom";
import {
  useEditSupplierMutation,
  useGetAllSupplierQuery,
} from "@/app/slices/supplierApiSlice";
import SupplierForm from "./SupplierForm ";
import { toast } from "react-toastify";

function EditSupplier() {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const { data: supplier, isLoading: isFetching } = useGetAllSupplierQuery(id);
  const [updateSupplier, { isLoading }] = useEditSupplierMutation();

  const handleSubmit = async (data) => {
    try {
      const response = await updateSupplier({ id, ...data }).unwrap();
      if (response.success) {
        toast.success("Supplier Updated Successfully");
        navigate("/admin/suppliers");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const suppliers = Array.isArray(supplier?.distributors) ? supplier.distributors : [];
  const sortedSuppliers = [...suppliers].reverse();
  console.log(sortedSuppliers)
  if (isFetching) return <div>Loading...</div>;

  return (
    <SupplierForm
      initialData={supplier}
      isEdit={true}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      isLoading={isLoading}
    />
  );
}
export default EditSupplier;
