import { Button, Divider, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { checkParagraphAPI } from "apis/checkParagraphAPI";
import { useState } from "react";
import { CheckParagraphType, ExplainType } from "types";
import { convertToJSON } from "utils";

export const CheckParagraph = () => {
  const [paragraph, setParagraph] = useState('');
  const [result, setResult] = useState<CheckParagraphType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (paragraph.trim() === "") {
      message.error("Đoạn văn không được để trống")
      return;
    }
    if (paragraph.trim().length < 10) {
      message.error("Đoạn văn phải có ít nhất 10 ký tự")
      return;
    }
    setLoading(true);
    const res = await checkParagraphAPI(paragraph);
    if (res.status === 200) {
      const responseData: CheckParagraphType = convertToJSON(res.data?.candidates?.[0]?.content?.parts?.[0]?.text);
      setResult(responseData);
      setLoading(false);
    } else {
      setLoading(false);
      message.error("Có lỗi xảy ra")
    }
  }

  const handleReset = () => {
    setParagraph('');
    setResult(null);
  }
  return (
    <>
        <p className="mb-2 text-base font-medium">Đoạn văn cần kiểm tra: </p>
        <TextArea
          value={paragraph}
          count={{
            show: true,
            max: 300,
          }}
          onChange={(e) => setParagraph(e.target.value)}
          placeholder="This is an apple ..."
          maxLength={300}
          autoSize={{ minRows: 3, maxRows: 5 }}
          className="leading-3 text-base"
        />
        <div className="flex items-center justify-end my-8 gap-2">
          <Button className="text-base" onClick={handleReset}>Cài lại</Button>
          <Button className="bg-primary text-white text-base" loading={loading} onClick={handleCheck}>Kiểm tra</Button>
        </div>
        
        {result && (<>
          <Divider />
          <div className="my-10">
            <p className="mb-2 text-base font-medium">Đoạn văn được chỉnh sửa: </p>
            <p className="text-lg">
              <div dangerouslySetInnerHTML={{ __html: (result?.edited || "").replace(/className=/g, "class=") }} />
              <div className="italic mt-5">Dịch: {result?.vi}</div>
            </p>
  
            <table className='table-auto border-collapse border border-slate-400 w-full mt-10'> 
              <thead> 
                <tr> 
                  <th className='border border-slate-300 p-2 bg-slate-100 text-left'>Lỗi sai</th> 
                  <th className='border border-slate-300 p-2 bg-slate-100 text-left'>Giải thích</th> 
                </tr> 
              </thead> 
              <tbody> 
                {result?.explains.map((explainData: ExplainType, index: number) => (
                  <tr key={index}> 
                    <td className='border border-slate-300 p-2'>{explainData.wrongWord}</td> 
                    <td className='border border-slate-300 p-2'>{explainData.explain}</td> 
                  </tr>
                ))}
              </tbody> </table>
          </div>
        </>)}
      </>
  )
}
