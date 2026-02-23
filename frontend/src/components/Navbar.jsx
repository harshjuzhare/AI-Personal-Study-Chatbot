export default function Navbar() {
  return (
    <div className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">AI Study Assistant</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm">Welcome, Harsh 👋</span>
        <div className="w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold">
          H
        </div>
      </div>
    </div>
  );
}