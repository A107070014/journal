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

export default function Page({openBook,status,data,saveData,readOnly,editData}) {
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

  let id = localStorage.getItem('id')
  const saveJournal = () => {
    
    if (id) {
      id = JSON.parse(id) + 1;
    } else {
      id = 0 ;
    }
    localStorage.setItem('id',id)
    const _journal = {
      id,
      title,
      momentDate,
      selectedImg,
      content,
    }
    saveData(_journal)
  }

  // const addJournal = () => {
  //   setTitle('');
  //   setDate(new Date());
  //   setReadOnly(readOnly);
  //   setSelectedImg(images);
  //   setContent('');
  //   const closeBtn = document.querySelector('.closeBtn');
  //   closeBtn.style.display = 'flex';
  //   setId(JSON.parse(localStorage.getItem('id'))+1);
  // }

  const editJournal = () => {
    
    status = 'add' ;
    editData(id,);
  }
   
  return (
    <div className="innerpage">
        <div className="info">
          <div className="title">
            <img src={pen} alt="標題"/>
            <input type="text" placeholder={data.title !== '' ? data.title : '標題...'} value={title} onInput={inputTitle} readOnly={!readOnly}/>
          </div>
          <input type='text' className='id' value={id}  onChange={saveJournal} />
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
              disabled = {!readOnly}
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
                      <div className="deleteSelectedImg" style={{display: !readOnly ? 'none' : JSON.stringify(selectedImg) != JSON.stringify(images) && 'flex'}} onClick={() => deleteImg(image)}><img src={trashCan} alt="刪除"/></div>
                    </div>
                  );
                })
              }
            </Slider>
          </div>          
          <span className="uploadImage" style={{display:!readOnly && "none"}}>
            <label for="file-input">
              <img src={image} alt="上傳照片"/>
            </label>
            <input 
              onChange={onSelectFile} 
              onClick={(event)=> {event.target.value = null}}
              id="file-input" type="file" accept="image/png,image/jpeg" 
              multiple="multiple"/>
          </span>
          <textarea name="journal" value={content} onChange={inputContent} placeholder='日記...' readOnly={!readOnly}></textarea>
        </div>
        {(openBook && readOnly) && <div className="btn saveJournal" onClick={saveJournal}>
          <img src={save} alt="儲存" width={30} />
        </div>} 
        {/* {openBook && <div className="btn editSaveJournal">
          <img src={save} alt="儲存" width={30} onClick={editSaveJournal}/>
        </div>}  */}
        {(openBook && !readOnly) && <div className='bothBtn'>
          <div className="deleteBtn" >
            <img src={trashCan} alt="刪除" width={30}/>
          </div>
          <div className="editBtn" onClick={() => {editJournal();document.querySelector('.closeBtn').style.display='flex'}} >
            <img src={edit} alt="編輯" width={30} />
          </div>
        </div>}
    </div>
  )
}
