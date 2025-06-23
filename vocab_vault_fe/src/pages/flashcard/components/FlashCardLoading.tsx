import { Skeleton } from "antd"

export const FlashCardLoading = () => {
  return (
    <div>
      <Skeleton paragraph={{rows: 1}} active />
      <div className="flex items-center gap-2 mt-20 mx-20">
        <div className="flex items-center justify-end w-full"><Skeleton.Node active className="min-w-full min-h-[200px]" /></div>
        <div className="flex items-center justify-center w-full"><Skeleton.Node active className="min-w-[300px] min-h-[200px]" /></div>
      </div>
    </div>
  )
}
