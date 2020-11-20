import React, { useState } from 'react';
import { Row } from 'antd';
import Layout from '@/src/components/layout'
import { Document, Page } from 'react-pdf';
import "./index.less"
const Books = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess ({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Layout goTop className='Links-wrapper'>
            <Row className="ww">
                <div>
                    {/* <Document
                        file="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/pdf/1.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p> */}
                    <a target='_blank' href="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/pdf/1.pdf">pdf</a>
                </div>

            </Row>

        </Layout>
    )
}

export default Books
