import { useState } from "react";
import Search from "./components/Search"
import QRcode from "./components/QRcode";

function App() {
  
  const [searchSubmited, setSearchSubmited] = useState(false);
  const [url, setUrl] = useState('');

  function handleSearchSubmit(e, url) {
    e.preventDefault();
    setSearchSubmited(true);
    setUrl(url);
  }

  return (
    <div className="bg-[#111729] flex items-center justify-center min-h-screen text-white relative w-full overflow-hidden  px-6">
      <div className="absolute top-1/2 -right-44 md:right-0 -translate-y-1/2 w-[450px] h-[450px] z-[0] pointer-events-none">
        <img src="/images/bg-illustration.svg" />
      </div>
      {!searchSubmited && <Search onSearchSubmit={handleSearchSubmit} />}
      {searchSubmited && <QRcode url={url} />}
    </div>
  )
}

export default App
