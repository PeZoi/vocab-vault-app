import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider } from "antd";
import { CheckParagraph } from "components/CheckParagraph";

export const CheckParaGraphPage = () => {
  return (
    <div>
      <Button
				className="flex items-center gap-1 w-fit cursor-pointer hover:underline transition-all group border-none"
				onClick={() => {
					window.history.back();
				}}
			>
				<LeftOutlined className="size-3 group-hover:-translate-x-1 transition-all" />
				<span>Quay lại</span>
			</Button>

      <Divider />
      <CheckParagraph />
    </div>
  )
}
