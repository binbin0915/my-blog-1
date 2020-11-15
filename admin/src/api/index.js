
export const getUseNameAjax = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                name:'张三',
                token:'h298323892382388'
            })
        },800)
    })
}