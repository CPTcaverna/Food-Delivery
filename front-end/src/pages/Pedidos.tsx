import { useState } from "react";
import CardPedido from "../components/CardPedido";
const Pedidos = () => {
  const [category, setCategory] = useState("Pendente");

  const handleCategoryClick = (newCategory: string) => {
    if (category === newCategory) {
      return;
    }
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const elementoSelected =
      "md:9 md:tex-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border bg-[#F2DAAC] text-sm font-bold text-[#161410] md:w-32";
    const elementoNotSelected =
      "md:9 md:tex-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:w-32";
    if (category === categoryName) {
      return elementoSelected;
    } else {
      return elementoNotSelected;
    }
  };
  return (
    <div className="mx-auto w-full px-3 py-4 md:w-187.5 md:px-0">
      <div className="mb-2 flex gap-2">
        <div
          className={getCategoryClass("Pendente")}
          onClick={() => handleCategoryClick("Pendente")}
        >
          Pendente
        </div>
        <div
          className={getCategoryClass("Retirado")}
          onClick={() => handleCategoryClick("Retirado")}
        >
          Retirado
        </div>
        <div
          className={getCategoryClass("Cancelado")}
          onClick={() => handleCategoryClick("Cancelado")}
        >
          Cancelado
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <CardPedido
          id={1}
          name="mateus"
          data="10/20/2023"
          orderTime="12:23"
          deliveryTime="123"
          total={123}
        ></CardPedido>
      </div>
    </div>
  );
};

export default Pedidos;
