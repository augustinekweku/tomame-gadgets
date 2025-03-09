import ProductsList from "@/components/ProductsList";

const AdminPage: React.FC = () => {
  return (
    <div
      style={{
        zoom: 0.85,
      }}
    >
      <ProductsList isAdmin />
    </div>
  );
};

export default AdminPage;
