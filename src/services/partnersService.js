import { pb } from "../pocketbase";

export const getPartners = async () => {
  const records = await pb.collection("partners").getFullList({
    sort: "order",
  });

  return records;
};