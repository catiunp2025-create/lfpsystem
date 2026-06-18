import "./style.css";
import Sidebar from "../side_bar/Sidebar";
import TopBar from "../top_bar/TopBar";
import { useSidebar } from "../../context/SidebarContext";
type MainLayoutProps = {
  children: React.ReactNode;
  pageTitle: string;
};

export function MainLayout({ children, pageTitle }: MainLayoutProps) {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="dashboard-shell">
      <TopBar
        toggleSidebar={toggleSidebar}
        pageTitle={pageTitle}
      />
      <div className={`main-layout ${sidebarOpen ? "open" : ""}`}>
        <Sidebar open={sidebarOpen} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
