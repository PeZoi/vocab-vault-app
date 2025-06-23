import { Divider, Skeleton } from "antd"

export const DeckDetailLoading = () => {
  return (
    <div>
        <Skeleton paragraph={{ rows: 2 }} active />
        <Divider />
        <div className="my-2 grid grid-cols-2">
          <Skeleton.Button active className="!min-w-[150px] min-h-[150px]" />
          <div className="flex gap-5">
            <Skeleton.Button active className="!min-w-[150px] min-h-[150px]" />
            <Skeleton.Button active className="!min-w-[150px] min-h-[150px]" />
            <Skeleton.Button active className="!min-w-[150px] min-h-[150px]" />
          </div>
        </div>
        <Divider />
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
          <Skeleton.Node active className="min-w-full min-h-[200px]" />
          <Skeleton.Node active className="min-w-full min-h-[200px]" />
        </div>
    </div>
  )
}
