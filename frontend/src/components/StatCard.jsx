export default function StatCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}