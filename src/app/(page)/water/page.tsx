import { WaterResponse, fetchWaters } from "@/action/water";

export default async function Water() {
  const res = await fetchWaters();
  const waters = (await res.json()) as WaterResponse[];

  return (
    <>
      <h3>水分量</h3>
      <ul>
        {waters.map((water) => (
          <div key={water.ID} style={{ marginBottom: "20px" }}>
            <li>{water.Volume}</li>
            <li>{water.CreatedAt}</li>
            <button>編集</button>
          </div>
        ))}
      </ul>
    </>
  );
}
