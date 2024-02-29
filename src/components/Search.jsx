import { useState } from "react";

function Search({onSearchSubmit}) {
  const [url, setUrl] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  function handleChange(e) {
    setUrl(e.target.value)
    if(e.target.validity.valid) {
      setSubmitDisabled(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md z-[1]">
      <div>
        <img src="/images/logo-qr-generator.svg" />
      </div>
      <form onSubmit={(e) => onSearchSubmit(e, url)} className="h-16 w-full border-2 pr-1.5 bg-[#030617] border-[#3662E3] rounded-2xl overflow-hidden flex items-center">
        <input type="url" className="bg-transparent w-full h-full px-6 text-sm placeholder:text-[#364153] outline-none" placeholder="Enter an url" required onChange={(e) => handleChange(e)} value={url} />
        <button className="bg-[#3662E3] w-[150px] h-11 rounded-lg text-sm hover:opacity-80 duration-200 disabled:opacity-50" disabled={submitDisabled}>QR code</button>
      </form>
    </div>
  )
}

export default Search;