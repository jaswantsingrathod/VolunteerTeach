import { NavLink } from "react-router-dom";

const FormTabs = () => {
  const tabs = [
    { path: "/dashboard/step1", label: "Step 1 - Contact Info" },
    { path: "/dashboard/step2", label: "Step 2 - Volunteer Details" },
  ];

  return (
    <div className="flex p-1.5 rounded-2xl gap-2 mb-8 border border-rose-100/50 backdrop-blur-sm shadow-inner max-w-fit mx-auto sm:mx-0">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `
            flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
            ${isActive
              ? "bg-white text-rose-600 shadow-sm shadow-rose-200 ring-1 ring-rose-100"
              : "text-rose-400 hover:text-rose-500 hover:bg-white/50"
            }
          `}
        >
          {({ isActive }) => (
            <>
              <span className={`text-lg transition-transform ${isActive ? "scale-110" : "opacity-70"}`}>
                {tab.icon}
              </span>
              {tab.label}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default FormTabs;