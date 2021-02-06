import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
    <Head>
      <title>Hylog</title>
    </Head>
    <header className={styles.header}>
      <h1>Hylog</h1>
      <Image src="/profile.png" alt="Profile image of hylog" width={100} height={100} />
      <p>배운 내용을 아는 만큼 기록합니다<br />
      새롭게 배운 내용을 계속해서 추가합니다
      </p>
    </header>  
    <main>
      <article>
        Post1
      </article>
    </main>
    <footer></footer>
    </div>
  )
}

export default Home