import Layout from '@/src/components/layout'
import React from 'react';

function App404(props) {

  return (
    <Layout
      goTop
      ca={props.ca}
      tags={props.tags}
      sysinfo={props.sysinfo || {}}
      className='app-404-wrapper'>
      <div className="tc">
        <p style={{ paddingTop: '60px', fontSize: "36px", color: "#666" }}>对不起，页面不存在！</p>
      </div>
    </Layout>
  )
}

export default App404
