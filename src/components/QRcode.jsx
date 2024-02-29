import { useRef, useState } from "react";
import QRCode from "qrcode.react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Alert } from "@mui/material";
import { motion } from "framer-motion";

function QRcode({ url }) {
  
  const qrRef = useRef();
  const [showShared, setShowShared] = useState(false);

  function download() {
    const canvas = qrRef.current.querySelector('canvas');
    
    canvas.toBlob(blob => {
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'QRCode.png';
      link.click();
      URL.revokeObjectURL(downloadUrl);
    });
  }

  function share() {
    const canvas = qrRef.current.querySelector('canvas');
    
    canvas.toBlob(blob => {
      navigator.clipboard.write(
        [new ClipboardItem({ 'image/png': blob })]
      )
      .then(() => setShowShared(true))
      .catch((err) => alert('could not copy QR code: ' + err))
    });
  }

  return (
    <div className="flex flex-col items-center gap-14">

      <div className="bg-[#4e80ee33] w-[220px] h-[220px] flex items-center justify-center rounded-full">
        <div className="p-6 rounded-2xl bg-white" ref={qrRef}>
          {<QRCode value={url} />}
        </div>
      </div>

      {showShared && <motion.div initial={{opacity:0, y:'40px'}} animate={{opacity:1, y:0}}><Alert variant="filled" severity="success" onClose={() => setShowShared(false)}>QRCode Copied to Clipboard</Alert></motion.div>}

      <div className="flex items-center gap-4 max-[390px]:flex-col">
        <button className="bg-[#3662E3] py-3 px-10 rounded-lg hover:opacity-80 duration-200" onClick={download}>Download <FileDownloadOutlinedIcon className="ml-1" fontSize="12" /> </button>
        <button className="bg-[#3662E3] py-3 px-10 rounded-lg hover:opacity-80 duration-200" onClick={share}>Share <ShareOutlinedIcon className="ml-1" fontSize="12" /></button>
      </div>

    </div>
  )
}

export default QRcode;