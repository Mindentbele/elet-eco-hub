import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="display text-6xl font-extrabold text-tomato-600">404</h1>
      <p className="mt-3 text-ink-800/70">Az oldal nem található.</p>
      <Link to="/" className="mt-6 bg-tomato-500 hover:bg-tomato-600 text-white px-6 py-3 rounded-full font-semibold">Vissza a főoldalra</Link>
    </div>
  );
}
