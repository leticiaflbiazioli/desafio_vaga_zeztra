import { DashboardPage } from "@/components/dashboard";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | Zeztra</title>
      </Head>
      <div>
        <DashboardPage />
      </div>
    </>
  );
}
