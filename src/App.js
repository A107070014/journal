import './App.css';
import {useState} from 'react';
import picture from './img/欣玫.jpg';
import search from './img/search.png';
import image from './img/image.png';
import add from './img/add.png';
import save from './img/save.png';
import trashCan from './img/trash-can.png';
import close from './img/close.png';
import calendar from './img/calendar.png';
import pen from './img/pen.png';
import autoplay1 from './img/autoplay1.jpg';
import autoplay2 from './img/autoplay2.jpg';
import autoplay3 from './img/autoplay3.jpg';
import autoplay4 from './img/autoplay4.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function Journal() {
  const [openBook,setOpenBook] = useState(false); 
  const [value,setValue] = useState('');
  /*react-slick autoplay*/
  const settings = {
    dots:false,
    infinite:true,
    slidesToShow:2,
    slidesToScroll:1,
    autoplay:true,
    speed:5000,
    autoplaySpeed:15000
  };
  return (
    <div className="book" style={{transform:openBook && "translateX(50%)"}}>
      <div className={["cover",openBook && "flipped"].join(' ')} style={{zIndex:openBook && -1}}>
        <div className="front" onClick={()=>setOpenBook(!openBook)}>
          <div className="front-content">
            <p>我的個人日記</p>   
          </div>
        </div>
        <div className="back" >
          <div className="back-content">
            <div className="bar">
              <div className="picture">
                <img src={picture} alt="大頭貼"/>
              </div>
              <div className="search">
                <input type="text" className="searchBox" placeholder='搜尋日記...'/>
                <img src={search} alt="搜尋" className="searchIcon"/>
              </div>
              <div className="add">
                <img src={add} alt="增加日記"/>
              </div>
            </div>   
          </div>
        </div>
      </div>
      <div className="closeBtn"><img src={close} alt="取消" width={15}/></div>
      <div className="page">
        <div className="info">
          <div className="title">
            <img src={pen} alt="標題"/>
            <input type="text" placeholder='標題...'/>
          </div>
          <div className="calendar">
            <img src={calendar} alt="日期"/>
            <span>2022/05/11</span>
          </div>
        </div>
        <div className="content">
          <div>
            <Slider {...settings}>
              <div>
                <img src={autoplay1} alt="輪播圖片" />
              </div>
              <div>
                <img src={autoplay2} alt="輪播圖片" />
              </div>
              <div>
                <img src={autoplay3} alt="輪播圖片" />
              </div>
              <div>
                <img src={autoplay4} alt="輪播圖片" />
              </div>
            </Slider>
          </div>
          <span className="uploadImage">
            <label for="file-input">
              <img src={image} alt="上傳照片"/>
            </label>
            <input id="file-input" type="file" accept="image/png,image/jpeg" multiple="multiple"/>
          </span>
          <textarea name="journal" value={value} onChange={(e) => setValue(e.target.value)} placeholder='日記...' ></textarea>
        </div>
        <div className="saveBtn">
          <img src={save} alt="儲存" width={30}/>
        </div>
      </div>
      <div className="back-cover"></div>
    </div>
    
  );
}

