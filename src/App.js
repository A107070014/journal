import './App.css';
import {useState} from 'react';
import picture from './img/欣玫.jpg';
import search from './img/search.png';
import image from './img/image.png';
import add from './img/add.png';
import add2 from './img/add2.png';
import save from './img/save.png';
import trashCan from './img/trash-can.png';
import close from './img/close.png';
import calendar from './img/calendar.png';
import pen from './img/pen.png';
import edit from './img/edit.png';
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
  const [id,setId] = useState(0);
  const images = [autoplay1,autoplay2,autoplay3,autoplay4];
  const [selectedImg,setSelectedImg] = useState(images);

  


  /*onmouseover、nomouseout*/
  const hoverAddIcon = (e) => {
    e.target.src = add2;
  }
  const outAddIcon = (e) => {
    e.target.src = add;
  }

  /*選擇照片&預覽照片*/
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

  /*刪除照片*/
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
  
  const [journalData,setJournalData] =useState(JSON.parse(localStorage.getItem('journal')))
  var localData = localStorage.getItem('journal');
  const [readOnly,setReadOnly] = useState(false);
  const saveJournal = () => {
    if (localData) {
      localData = JSON.parse(localData);
    } else {
      localData = [] ;
    }
    const journal = {
      id,
      title,
      momentDate,
      selectedImg,
      content,
    }
    localData.push(journal);
    localStorage.setItem('journal',JSON.stringify(localData));
    setJournalData(JSON.parse(localStorage.getItem('journal')));
    setReadOnly(true);
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.style.display = 'none';
    setId(id+1);
    localStorage.setItem('id',id);
  }

  const addJournal = () => {
    setTitle('');
    setDate(new Date());
    setReadOnly(false);
    setSelectedImg(images);
    setContent('');
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.style.display = 'flex';
    setId(JSON.parse(localStorage.getItem('id'))+1);
  }

  const editJournal = () => {
    console.log(id-2)
    const editJournalId = id-2;
    const journal = JSON.parse(localStorage.getItem('journal'));
    const title = journal[editJournalId]['title'];
    console.log(title)
    // const momentDate = journal[editJournalId]['momentDate'];
    const selectedImg = journal[editJournalId]['selectedImg'];
    const content = journal[editJournalId]['content'];
    setTitle(title);
    // setDate(momentDate);
    setSelectedImg(selectedImg);
    setContent(content);
    
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
              <img className="add" src={add} alt="增加日記" onClick={addJournal} onMouseOver={hoverAddIcon} onMouseOut={outAddIcon}/>
            </div>
            {journalData && journalData.map((data,index)=> (
            <div className="journalList" key={index}>
              <div className="journalDatge">{data.momentDate}</div>
              <div className="journal">
                <div className="journalInfo">
                  <h4 className='journalTitle'>{data.title}</h4>
                  <p className='journalContent'>{data.content}</p>
                </div>
                <div className='journalPicture'>
                  <img src={data.selectedImg[0]} alt='picture' width={100} height={100}/>
                </div>
              </div>
            </div>
            ))}
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
      {openBook &&<div className="closeBtn" ><img src={close} alt="取消" width={15}/></div>}
      <div className="page">
        <div className="info">
          <div className="title">
            <img src={pen} alt="標題"/>
            <input type="text" placeholder='標題...' value={title} onInput={inputTitle} readOnly={readOnly}/>
          </div>
          <input type='number' value={id}  onChange={saveJournal} />
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
              disabled = {readOnly}
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
                      <div className="deleteSelectedImg" style={{display: readOnly ? 'none' : JSON.stringify(selectedImg) != JSON.stringify(images) && 'flex'}} onClick={() => deleteImg(image)}><img src={trashCan} alt="刪除"/></div>
                    </div>
                  );
                })
              }
            </Slider>
          </div>          
          <span className="uploadImage" style={{display:readOnly && "none"}}>
            <label for="file-input">
              <img src={image} alt="上傳照片"/>
            </label>
            <input 
              onChange={onSelectFile} 
              onClick={(event)=> {event.target.value = null}}
              id="file-input" type="file" accept="image/png,image/jpeg" 
              multiple="multiple"/>
          </span>
          <textarea name="journal" value={content} onChange={inputContent} placeholder='日記...' readOnly={readOnly}></textarea>
        </div>
        {openBook && <div className="btn" style={{display:readOnly && "none"}}>
          <img src={save} alt="儲存" width={30} onClick={saveJournal}/>
        </div>} 
        {openBook && <div className='bothBtn' style={{display:readOnly && "flex"}}>
          <div className="deleteBtn" >
            <img src={trashCan} alt="刪除" width={30}/>
          </div>
          <div className="editBtn" onClick={() => {editJournal();setReadOnly(!readOnly);document.querySelector('.closeBtn').style.display='flex'}} >
            <img src={edit} alt="編輯" width={30} />
          </div>
        </div>}
      </div>
      <div className="back-cover"></div>
    </div>
  );
}

