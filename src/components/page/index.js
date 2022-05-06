import React,{useState} from 'react'
import './index.css'
//slider datepicker
import Slider from "react-slick";
import DatePicker from 'react-date-picker';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//icon
import calendar from '../../img/calendar.png';
import pen from '../../img/pen.png';
import edit from '../../img/edit.png';
import save from '../../img/save.png';
import trashCan from '../../img/trash-can.png';
import image from '../../img/image.png';
import autoplay1 from '../../img/autoplay1.jpg';
import autoplay2 from '../../img/autoplay2.jpg';
import autoplay3 from '../../img/autoplay3.jpg';
import autoplay4 from '../../img/autoplay4.jpg';

import moment from "moment";

export default function Page({openBook,status,data,setData}) {
    let readOnlyStatus = status === 'look' ? true : false
    console.log(readOnlyStatus);
    const [id,setId] =useState(0)
    const images = [autoplay1,autoplay2,autoplay3,autoplay4];
    const [selectedImg,setSelectedImg] = useState(images);
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
  const [readOnly,setReadOnly] = useState(status === 'look' ? true : false);
  const saveJournal = () => {
    if (localData) {
      localData = JSON.parse(localData);
    } else {
      localData = [] ;
    }
    const _journal = {
      id,
      title,
      momentDate,
      selectedImg,
      content,
    }
    localData.push(_journal);
    localStorage.setItem('journal',JSON.stringify(localData));
    setJournalData(JSON.parse(localStorage.getItem('journal')));
    setReadOnly(readOnly);
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
    const saveJournal = document.querySelector('.saveJournal');
    saveJournal.style.display = 'none';
    // const editSaveJournal = document.querySelector('.editSaveJournal');
    // editSaveJournal.style.display = 'flex';

    console.log(id-2)
    const editJournalId = id-1;
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
    setId(editJournalId);
  }
   
  return (
    <div className="innerpage">
        <div className="info">
          <div className="title">
            <img src={pen} alt="標題"/>
            <input type="text" placeholder={data.title !== '' ? data.title : '標題...'} value={title} onInput={inputTitle} readOnly={readOnly}/>
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
        {(openBook && status === 'add') && <div className="btn saveJournal" onClick={saveJournal}>
          <img src={save} alt="儲存" width={30} />
        </div>} 
        {/* {openBook && <div className="btn editSaveJournal">
          <img src={save} alt="儲存" width={30} onClick={editSaveJournal}/>
        </div>}  */}
        {(openBook && status === 'look') && <div className='bothBtn'>
          <div className="deleteBtn" >
            <img src={trashCan} alt="刪除" width={30}/>
          </div>
          <div className="editBtn" onClick={() => {editJournal();setReadOnly(!readOnly);document.querySelector('.closeBtn').style.display='flex'}} >
            <img src={edit} alt="編輯" width={30} />
          </div>
        </div>}
    </div>
  )
}
