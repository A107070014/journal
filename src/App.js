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
import DatePicker from 'react-date-picker';
import moment from "moment";


export default function Journal() {
  const [openBook,setOpenBook] = useState(false); 

  const images = [autoplay1,autoplay2,autoplay3,autoplay4];
  const [selectedImg,setSelectedImg] = useState(images);
  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((files)=>{
      return URL.createObjectURL(files);
    });

    if (JSON.stringify(selectedImg) === JSON.stringify(images)) {
      setSelectedImg(imagesArray);
    } else {
      setSelectedImg((previousImg) => (
        previousImg.concat(imagesArray)
      ));
    }
  }; 

  function deleteImg(data) {
    if (selectedImg.length === 1) {
      setSelectedImg(selectedImg.filter(e => e != data));
      setSelectedImg(images);
    } else {
      setSelectedImg(selectedImg.filter(e => e != data));
    }
    
  }

  /*react-slick autoplay*/
  const settings = {
    dots:false,
    arrows: false,
    infinite: selectedImg.length > 1,
    slidesToShow: 2,
    slidesToScroll:1,
    autoplay:true,
    speed:5000,
    autoplaySpeed:100000
  };

  /*react-date-picker*/
  const [date,setDate]  = useState(new Date()); 
  const momentDate = moment(date).format('YYYY/MM/DD');

  /*localstorage*/
  const [title,setTitle] = useState('');
  const [content,setContent] = useState(''); 

  const inputTitle = (e) => {
    const inputTitleValue = e.target.value;
    setTitle(inputTitleValue);
  }

  const inputContent = (e) => {
    const inputContentValue = e.target.value;
    setContent(inputContentValue);
  }
  
  const saveJournal = () => {
    const journal = {
      title,
      momentDate,
      selectedImg,
      content,
    }
    localStorage.setItem('journal',JSON.stringify(journal));
  }

  
  
  return (
    <div className="book" style={{transform:openBook && "translateX(50%)"}}>
      <div className={["cover",openBook && "flipped"].join(' ')} style={{zIndex:openBook && -1}}>
        <div className="front" onClick={()=>setOpenBook(!openBook)}>
          <div className="front-content">
            <p>我的個人日記</p>   
          </div>
        </div>
        <div className="backArrow" onClick={()=>setOpenBook(!openBook)} style={{display:!openBook && 'none'}}>
          <div className="closeBook" >
            <img src={back} alt="闔上日記"/>
          </div>
        </div>
        <div className="back">
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
            <div className="journalList">
              <div className="journalDatge">2022/5/2</div>
              <div className="journal">
                <div className="journalInfo">
                  <h4 className='journalTitle'>勞動節</h4>
                  <p className='journalContent'>耶～今天不用上班</p>
                </div>
                <div className='journalPicture'>
                  <img src={autoplay1} alt='picture' width={100} height={100}/>
                </div>
              </div>
            </div>
            {/* <div className="journalList">
              <div className="journalDatge">2022/5/13</div>
              <div className="journal">
                <div className="journalInfo">
                  <h4 className='journalTitle'>我的生日</h4>
                  <div className='journalContent'>生日快樂</div>
                </div>
                <div className='journalPicture'>
                  <img src={autoplay2} alt='picture' width={100}/>
                </div>
              </div>
            </div>    */}
          </div>
        </div>
      </div>
      {openBook &&<div className="closeBtn"><img src={close} alt="取消" width={15}/></div>}
      <div className="page">
        <div className="info">
          <div className="title">
            <img src={pen} alt="標題"/>
            <input type="text" placeholder='標題...' value={title} onInput={inputTitle}/>
          </div>
          <div className="calendar">
            <img src={calendar} alt="日期"/>
            <DatePicker
              onChange = {setDate}
              value = {date}
              dayPlaceholder = {"dd"}
              monthPlaceholder = {"mm"}
              yearPlaceholder = {"yyyy"}
              locale= {"en"}
              format = {"y/MM/dd"}
            />
          </div>
        </div>
        <div className="content">
          <div>
            <Slider {...settings}>
              {selectedImg &&
                selectedImg.map((image) => {
                  return (
                    <div key={image} >
                      <img src={image} alt="upload" />
                      <div className="deleteSelectedImg"  style={{display:JSON.stringify(selectedImg) != JSON.stringify(images) && "flex"}} onClick={() => deleteImg(image)}><img src={trashCan} alt="取消"/></div>
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
            <input 
              onChange={onSelectFile} 
              onClick={(event)=> {event.target.value = null}} 
              id="file-input" type="file" accept="image/png,image/jpeg" multiple="multiple"/>
          </span>
          <textarea name="journal" value={content} onChange={inputContent} placeholder='日記...' ></textarea>
        </div>
        {openBook && <div className="saveBtn">
          <img src={save} alt="儲存" width={30} onClick={saveJournal}/>
        </div>}
      </div>
      <div className="back-cover"></div>
    </div>
  );
}

