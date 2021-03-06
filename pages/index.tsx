import { getSession, GetSessionParams, useSession } from "next-auth/react";
import Head from "next/head";

const Home = () => {
  const { data: session, status } = useSession();
  console.log("session:", session);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/custom.svg" />
      </Head>

      <main>home page</main>
    </>
  );
};

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default Home;
