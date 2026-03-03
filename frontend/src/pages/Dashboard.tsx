const Dashboard = () => {
  const email = localStorage.getItem("userEmail"); 
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Welcome, {email || "User"}!
      </h1>
      <p>Dashboard coming soon...</p>
    </div>
  );
};

export default Dashboard;