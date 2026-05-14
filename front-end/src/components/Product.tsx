import { ShoppingBag } from "lucide-react";
import type { ProcutType } from "../types/Product";
import { formatterPrice } from "../utils/formatter";

const Product = ({ name, description, img, price }: ProcutType) => {
  return (
    <div>
      <div className="flex gap-2">
        <img
          src={`./${img}`}
          alt=""
          className="h-[83px] w-[100px] md:h-[166px] md:w-[200px]"
        />

        <div className="flex w-full flex-col">
          <p className="text-sm font-bold text-white uppercase md:text-lg">
            {name}
          </p>
          <p className="text-sx flex-1 text-[#848484] md:text-lg">
            {description}
          </p>

          <div className="flex justify-end gap-1 text-white">
            <p className="text-sm text-[#F2DAAC]">{formatterPrice(price)}</p>{" "}
            <ShoppingBag size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
