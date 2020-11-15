import React, { Suspense } from 'react';

export const lazyLoad = (Comp) =>
    (props) => (
        <Suspense fallback={<div style={{fontSize:'80px'}}>loading....</div>}>
            <Comp {...props} />
        </Suspense>
    )

