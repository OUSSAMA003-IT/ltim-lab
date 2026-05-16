import { pb } from "../pocketbase";

export const getEquipments = async () => {
  const records = await pb.collection("equipments").getFullList();

  return records.map((r) => ({
    id: r.id,
    name: r.name,
    desc: r.desc,
  }));
};