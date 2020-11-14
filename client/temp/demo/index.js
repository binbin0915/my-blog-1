import React, { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
const Demo = () => {
  const [hero, setHero] = useState([])
  useEffect(() => {
    getDate()
  }, [])

  async function getDate () {
    let res = await axios.get("https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js");
    let h = res.data.hero.slice(0, 10)
    setHero(h)
    console.log('h', h)
  }
  return (
    <>
      <h4>demo</h4>
      <ul>
        {
          hero.map(d => {
            return <li key={d.heroId}>{d.name || ''}</li>
          })
        }
      </ul>
      <div>
        RUN_ENV:{process.env.NEXT_PUBLIC_RUN_ENV}
        <br />
        BaseUrl:{process.env.NEXT_PUBLIC_BASE_URL}
      </div>
    </>
  )
}

export default Demo