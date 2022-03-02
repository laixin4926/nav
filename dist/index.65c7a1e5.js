const $sitelist = $('.sitelist');
const $lastli = $sitelist.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: 'A',
        logoType: 'text',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        logoType: 'image',
        url: 'http://www.bilibili.com'
    },
    {
        logo: 'I',
        logoType: 'image',
        url: 'http://www.iconfont.cn'
    }, 
];
const simplifyurl = (url)=>{
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '') //删除以/开头的正则表达式
    ;
};
const render = ()=>{
    $sitelist.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
        
             <div class = "site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyurl(node.url)}</div>
                <div class="close">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
                </svg>
                </div>
             </div>
        
    </li>`).insertBefore($lastli);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation() //阻止冒泡
            ;
            console.log(hashMap);
            hashMap.splice(index, 1) ///删除1个index的序号
            ;
            render();
        });
    });
};
render();
$('.addbutton').on('click', ()=>{
    let url = window.prompt('请输入你要添加的网址');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    console.log(url);
    hashMap.push({
        logo: simplifyurl(url)[0].toUpperCase(),
        logoType: "text",
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};

//# sourceMappingURL=index.65c7a1e5.js.map
