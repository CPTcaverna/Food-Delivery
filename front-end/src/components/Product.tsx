import { ShoppingBag } from "lucide-react";
import type { ProcutType } from "../types/Product";
import { formatterPrice } from "../utils/formatter";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Product = ({
  id,
  name,
  description,
  img,
  price,
  setProducts,
}: ProcutType) => {
  const { user } = useContext(UserContext);

  const hendleDeleteProduct = async (id: string) => {
    try {
      if (!id) {
        console.log("id n enviado");
      }
      const response = await fetch(
        import.meta.env.VITE_URL_BACK + `/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro ao realizar a requisicão");
        return;
      }

      getProducts();
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const getProducts = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_URL_BACK + "/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <img
          src={`./${img}`}
          alt=""
          className="h-[83px] w-[100px] md:h-[166px] md:w-[200px]"
        />

        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <p className="text-sm font-bold text-white uppercase md:text-lg">
              {name}
            </p>
            {user?.admin && (
              <div
                className="flex cursor-pointer items-center rounded-md border p-0.5 text-sm text-red-500 uppercase"
                onClick={() => hendleDeleteProduct(id)}
              >
                Deletar
              </div>
            )}
          </div>
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
