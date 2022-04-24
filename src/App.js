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
import back from './img/back.png';
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
  const images = [autoplay1,autoplay2,autoplay3,autoplay4];
  const [selectedImg,setSelectedImg] = useState(images);
  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((files)=>{
      return URL.createObjectURL(files);
    });

    setSelectedImg((previousImg) => (
      previousImg.concat(imagesArray)
    ));
  }; 

  /*react-slick autoplay*/
  const settings = {
    dots:true,
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
        <div className="back">
          <div className="back-content">
            <div className="backArrow" onClick={()=>setOpenBook(!openBook)}>
              <div className="closeBook" >
                <img src={back} alt="闔上日記"/>
              </div>
            </div>
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
      {openBook &&<div className="closeBtn"><img src={close} alt="取消" width={15}/></div>}
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
              {selectedImg &&
                selectedImg.map((image, index) => {
                  return (
                    <div key={image}>
                      <img src={image} alt="upload" />
                      <button
                        onClick={() =>
                          setSelectedImg(selectedImg.filter((e) => e !== image))
                        }
                      >
                        delete image
                      </button>
                      <p>{index + 1}</p>
                    </div>
                  );
                })
              }
            </Slider>
          </div>          
          <span className="uploadImage">
            <label for="file-input">
              <img src={image} alt="上傳照片"/>
            </label>
            <input onChange={onSelectFile} id="file-input" type="file" accept="image/png,image/jpeg" multiple="multiple"/>
          </span>
          <textarea name="journal" value={value} onChange={(e) => setValue(e.target.value)} placeholder='日記...' ></textarea>
        </div>
        {openBook && <div className="saveBtn">
          <img src={save} alt="儲存" width={30}/>
        </div>}
      </div>
      <div className="back-cover"></div>
    </div>
    
  );
}

