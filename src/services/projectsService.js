import { pb } from "../pocketbase";

export const getProjects = async () => {
  const records = await pb.collection("projects").getFullList({
    sort: "-year",
  });

  return records.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    year: p.year,
    authors: p.authors,
    journal: p.journal,
    volume: p.volume,
    issue: p.issue,
    pages: p.pages,
    indexing: p.indexing,
  }));
};