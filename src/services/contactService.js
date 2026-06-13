import { pb } from "../pocketbase";

export const getContact = async () => {
  const records = await pb.collection("contact_info").getFullList();
  return records.length > 0 ? records[0] : null;
};

export const getFaqs = async () => {
  const records = await pb.collection("faqs").getFullList({
    sort: "order",
  });
  return records;
};