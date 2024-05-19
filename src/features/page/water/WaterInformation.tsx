"use client";

import { useCallback, useState } from "react";

import { WaterResponse } from "@/action/water";
import WaterForm from "@/page/water/WaterForm";

type WaterInformationProps = {
  water: WaterResponse;
};

const WaterInformation: React.FC<WaterInformationProps> = ({ water }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleChangeEditMode = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleChangeInfoMode = useCallback(() => {
    setIsEdit(false);
  }, []);
  return (
    <>
      {isEdit ? (
        <>
          <WaterForm water={water} onSave={handleChangeInfoMode} />
          <button onClick={handleChangeInfoMode}>キャンセル</button>
        </>
      ) : (
        <>
          <li>{water.Volume}</li>
          <li>{water.CreatedAt}</li>
          <button onClick={handleChangeEditMode}>編集</button>
        </>
      )}
    </>
  );
};

export default WaterInformation;
