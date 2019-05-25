import {getBase64Image} from '@/utils'

const bgs = [
  '/static/img/comiis_bg_1.jpg',
  '/static/img/comiis_bg_2.jpg',
  '/static/img/comiis_bg_3.jpg',
  '/static/img/comiis_bg_4.jpg',
  '/static/img/comiis_bg_5.jpg',
]

let bgUrls = [];

bgs.forEach(async (src)=>{
  let img = new Image();

  let base64Src = await new Promise((resolve)=>{
    img.addEventListener('load',(e)=>{
      resolve(getBase64Image(img))
    })
    img.src = src;
  })

  console.log(base64Src)

  bgUrls.push(base64Src)
  
})

export default bgUrls;