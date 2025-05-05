import Category from "./components/Category";
import Navbar from "./components/common/Navbar";
import SidebarColapsed from "./components/common/SidebarColapsed";


function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <SidebarColapsed />
        <Category />
      </div>
    </div>
  )
}

export default App;
