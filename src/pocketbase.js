import PocketBase from "pocketbase";

export const pb = new PocketBase("https://olive-williams-conclusions-adopt.trycloudflare.com");
pb.autoCancellation(false);