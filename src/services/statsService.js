import { pb } from "../pocketbase.js";

export const getStats = async () => {
  try {
    const config = await pb.collection("stats").getFullList({
      sort: "order",
    });

    const stats = await Promise.all(
      config.map(async (item) => {
        const res = await pb.collection(item.source).getList(1, 1);

        return {
          id: item.id,
          label: item.label,
          icon: item.icon,
          count: res.totalItems,
        };
      })
    );

    return stats;
  } catch (err) {
    console.error("getStats failed:", err);
    return [];
  }
};