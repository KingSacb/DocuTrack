const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso no autorizado</h1>
        <p className="text-gray-700">No tienes permiso para ver esta página.</p>
      </div>
    </div>
  );
};

export default Unauthorized;