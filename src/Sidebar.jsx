import { LayoutDashboard, ReceiptText, Lightbulb, X } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'Dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'Transactions', icon: <ReceiptText size={20} />, label: 'Transactions' },
    { id: 'Insights', icon: <Lightbulb size={20} />, label: 'Insights' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex justify-between items-center border-b border-slate-800">
          <button className="md:hidden p-1 hover:bg-slate-800 rounded" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2">
         {menuItems.map((item) => (
           <button
              key={item.id}
              onClick={() => {setActiveTab(item.id);
                if (window.innerWidth < 768) { 
                   setIsOpen(false); 
                }
              }
              }
              className={`relative w-full flex items-center gap-3 px-6 py-3 transition-all
               ${activeTab === item.id 
               ? 'bg-blue-600/10 text-blue-600' 
               : 'text-slate-400 hover:bg-slate-800/50'}
             `}
             >
        {activeTab === item.id && (
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
            )}
    
          {item.icon}
          <span className="font-semibold">{item.label}</span>
          </button>
        ))}
        </nav>
      </aside>
    </>
  );
}