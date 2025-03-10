import ProductsList from "@/components/ProductsList";
import { Suspense } from "react";

const AdminPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          zoom: 0.85,
        }}
      >
        <ProductsList isAdmin />
      </div>
    </Suspense>
  );
};

export default AdminPage;
