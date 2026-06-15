import { Menu, User, ShieldCheck, Eye } from 'lucide-react';

export default function Navbar({ role, onRolechange, onMenuClick }) {
  return (
    <nav className="h-16 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <button
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-600 dark:text-gray-400"
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </button>
      <h2 className="hidden md:block text-xl font-bold text-gray-800 dark:text-white">MyFinance</h2>
      <div className="flex items-center gap-3 md:gap-6">
        {/* Dark mode toggle removed */}
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700">
          {role === "Admin" ? <ShieldCheck size={16} className="text-green-600"/> : <Eye size={16} className="text-blue-600"/>}
          <select
            className="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
            value={role}
            onChange={onRolechange}
          >
            <option value="Admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-slate-700">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-gray-800 dark:text-white leading-none">Sridevi</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
}