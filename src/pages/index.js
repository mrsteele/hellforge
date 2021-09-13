export default ({ test }) => (
  <div>
    <h2>About</h2>

    <p>This is a fan-made Diablo 2 API. It should be mostly compatible with D2R, however we are currently a patch behind.</p>

    <h2>Inspiration</h2>

    <p>Looking all over the web, there are plenty of D2 databases, wikis and fan sites that have information about the game, but with Blizzard pushing D2R out soon and with patches on the way I imagine the data on those sites will soon be out of date.</p>

    <p>I'm hopeful that we can create a service that would be easy to maintain and thorough to provice these other websites with information that is centralized to what the latest patch information displays.</p>

    <p>If you have any ideas, comments or suggestions feel free to contact me on <a href='https://twitter.com/matt_r_steele' target='_blank'>Twitter</a> or check out this repository on <a href='https://github.com/mrsteele/d2api' target='_blank'>Github</a>.</p>

    <h2>Legal/Disclaimer</h2>

    <p>All the data comes from <em>Blizzard Entertainment</em> and belongs to them. I just wrote the script that scrubs that data.</p>

    <p>Code is from me and anyone who desires to <a href='https://github.com/mrsteele/d2api' target='_blank'>contribute</a>. The code is currently just using v1.13, and it is not complete but wouldn't mind a few more contributors.</p>

    <p>test {test}</p>
  </div>
)

export async function getServerSideProps() {
  const test = 'process.env.NEXT_PUBLIC_SITE_URL'
  return {
    props: {
      test
    }, // will be passed to the page component as props
  }
}
