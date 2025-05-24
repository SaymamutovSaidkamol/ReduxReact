import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import CardProd from "../../components/Card/Card";

const Saved = () => {
  const savedData = useSelector((state: RootState) => state.saved.value);
  console.log(savedData);

  return (
    <div className="container mx-auto mt-30">
      <CardProd data={savedData} />

    </div>
  );
};

export default memo(Saved);
