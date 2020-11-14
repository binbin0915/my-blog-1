import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Row } from 'antd';
import Layout from '@/components/layout'

import "./index.less"
import "@/styles/markdown.less"
const ArticleDetail = () => {

    const str = `

<p>最近开发时遇到了URL中的 query 参数解析异常问题。表现为：<br></p>
<p>假设 URL 中 seacr 部分为：<code>?name=dd+ =iuio</code>，常用的 qs 库解析 <code>query</code> 参数为：</p>
<pre><code class="js language-js">{ name: 'dd  =iuio' }
</code></pre>
<p>更换使用 node <code>url</code> 模块解析也是如此。思来想去，最终还是决定手写解析方法：</p>
<pre><code class="js language-js">const assert = require('assert');

function parseQuery(str) {
  str = str.trim().replace(/^(\?|#|&amp;)/, '');

  if (!str) {
    return {};
  }

  const res = {};

  str.split('').forEach((params) => {
    const parts = params.split('=');
    const key = parts.shift();
    const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

 
</code></pre>

`
    return (
        <Layout goTop className='article-detail-wrapper'>
            <div className="ww">
                <div className="tc" style={{ paddingTop: '30px' }}>
                    <img className='toutu' src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-07-12/search-engine-4.jpg" alt="" />
                    <div className="tit tc">
                        js 解析 url search params 特殊字符问题
                    </div>
                    <p className="fa">发布于 2020-07-04 20:46:09 • 阅读量 180</p>
                </div>
                <div className="markdown"
                    dangerouslySetInnerHTML={{ __html: str }}
                >

                </div>
            </div>
        </Layout>


    )
}
export default ArticleDetail