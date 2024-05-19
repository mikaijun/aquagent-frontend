"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { WaterResponse, deleteWater } from "@/action/water";
import WaterForm from "@/page/water/WaterForm";

type WaterInformationProps = {
  water: WaterResponse;
};

const WaterInformation: React.FC<WaterInformationProps> = ({ water }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();
  const handleChangeEditMode = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleChangeInfoMode = useCallback(() => {
    setIsEdit(false);
  }, []);

  const handleDelete = useCallback(async () => {
    const isSuccess = await deleteWater({ id: water.ID });
    if (isSuccess) {
      alert("削除しました");
      router.refresh();
    }
  }, [water]);
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
          <button onClick={handleDelete}>削除</button>
        </>
      )}
    </>
  );
};

export default WaterInformation;
