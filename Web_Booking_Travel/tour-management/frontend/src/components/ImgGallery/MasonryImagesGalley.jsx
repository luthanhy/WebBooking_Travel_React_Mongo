import React from 'react'
import galleryImages from './Galllery_Img'
import "../../styles/home.css"
import Masonry,{ResponsiveMasonry} from 'react-responsive-masonry'
const MasonryImagesGalley = () => {
  return (
      <ResponsiveMasonry columnsCountBreakPoints={{350:1,768:3,992:4}}>
        <Masonry gutter='1rem'>
          {galleryImages.map((item,index)=>(
            <img 
              className='masonry_img'
              src={item}
              key={index}
              alt=''
              style={{width:"100%", display:"block",borderRadius:"10px"}}
            >
            </img>
          ))}
        </Masonry>
      </ResponsiveMasonry>
  )
}

export default MasonryImagesGalley