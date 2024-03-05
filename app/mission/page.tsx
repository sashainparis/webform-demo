import { redirect } from "next/navigation";


export default async function Missions() {
  return redirect("/mission/0");
}