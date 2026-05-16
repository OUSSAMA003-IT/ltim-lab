import { pb } from "../pocketbase";

export const getTeams = async () => {
  const teamsRes = await pb.collection("teams").getFullList();
  const membersRes = await pb.collection("members").getFullList();

  return teamsRes.map((team) => ({
    id: team.id,
    acronym: team.acronym,
    name: team.name,
    leader: team.leader,

    // relation: team → members
    members: membersRes
      .filter((m) => m.team === team.id)
      .map((m) => m.name),
  }));
};