import { Layout } from 'antd';
import ICON from 'assets/icon.svg';
const { Header: Headerr } = Layout;

export const Header: React.FC = () => {
   return (
      <Headerr className="bg-white px-0 flex items-center">
         <div className="flex items-center justify-center flex-1">
            <img src={ICON} alt="icon" className="size-20" />
         </div>
      </Headerr>
   );
};
