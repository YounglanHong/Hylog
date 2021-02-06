import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <>
    <Head>
      <title>Hylog</title>
    </Head>
    <h1>Hylog</h1>
    <Image src="/profile.png" alt="Profile image of hylog" width={100} height={100} />

    </>
  )
}

export default Home