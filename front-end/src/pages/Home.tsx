import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProcutType } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("Hambúrguer");
  const [products, setProducts] = useState<ProcutType[]>([]);

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
  const filteredProduct = products.filter((product) => {
    return product.category === category;
  });
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_URL_BACK + "/products",
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
        return;
      }
    };
    getProducts();
  }, []);
  return (
    <div className="mx-auto w-full px-3 py-4 md:w-187.5 md:px-0">
      <div className="mb-2 flex gap-2">
        <div
          className={getCategoryClass("Hambúrguer")}
          onClick={() => handleCategoryClick("Hambúrguer")}
        >
          Hambúrguer
        </div>
        <div
          className={getCategoryClass("Bebida")}
          onClick={() => handleCategoryClick("Bebida")}
        >
          Bebida
        </div>
        <div
          className={getCategoryClass("Porção")}
          onClick={() => handleCategoryClick("Porção")}
        >
          Porção
        </div>
      </div>
      <p className="mb-2 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-3">
        {filteredProduct.map((product) => (
          <Product {...product} key={product.id} setProducts={setProducts} />
        ))}
        {filteredProduct.length === 0 && (
          <p>Não ha produtos dessa categoria </p>
        )}
      </div>
    </div>
  );
};
export default Home;
