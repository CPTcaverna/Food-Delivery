import { User, CalendarFold, Clock10 } from "lucide-react";

type CardPedidoType = {
  id: number;
  name: string;
  data: string;
  orderTime: string;
  deliveryTime?: string;
  total: number;
};

const CardPedido = ({
  id,
  name,
  data,
  orderTime,
  deliveryTime,
  total,
}: CardPedidoType) => {
  return (
    <div className="rounded-md bg-[#F2DAAC] p-2 text-[#32343E]">
      <div className="flex justify-between">
        <p className="font-bold">#{id}</p>
        <select name="" id="" className="font-bold">
          <option value="" defaultChecked disabled>
            Pendente
          </option>
          <option value="">Retirado</option>
          <option value="">Cancelado</option>
        </select>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User size={16}></User>
          <p className="text-xs">{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarFold size={16}></CalendarFold>
          <p className="text-xs">{data}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Clock10 size={16}></Clock10>
            <p className="text-xs">{orderTime}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock10 size={16}></Clock10>
            <p className="text-xs">{deliveryTime ? deliveryTime : "-"}</p>
          </div>
        </div>
        <div className="mt-1 h-0.5 w-full bg-black"></div>
        <div>
          <p className="text-right font-bold text-[#32343E]">R${total}</p>
        </div>
      </div>
    </div>
  );
};
export default CardPedido;
