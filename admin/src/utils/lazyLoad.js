import React, { Suspense } from 'react';
import { Spin, Space } from 'antd';
export const lazyLoad = (Comp) =>
    (props) => (
        <Suspense fallback={<Spin style={{ position: 'fixed', top: "40%" }} size="large" />}>
            <Comp {...props} />
        </Suspense>
    )

