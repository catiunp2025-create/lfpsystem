import { useState } from "react";
import "./style.css";
import { Sidebar } from "../side_bar/Sidebar";
import { TopBar } from "../top_bar/TopBar";
type MainLayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

export function MainLayout({ children, pageTitle }: MainLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <TopBar
        toggleSidebar={() => setOpen((prev) => !prev)}
        pageTitle={pageTitle}
      />
      <div className={`main-layout ${open ? "open" : ""}`}>
        <Sidebar open={open} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
