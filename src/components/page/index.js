import React,{useState,useEffect} from 'react'
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

export default function Page({openBook,status,data,saveData,readOnly,editData,display,journalData}) {

  journalData = journalData && journalData.slice().reverse();
  // console.log(status==='add' && true);
  // console.log(data.selectedImg);
  const images = [autoplay1,autoplay2,autoplay3,autoplay4];
  const [selectedImg,setSelectedImg] = useState(images);
  
  // useEffect(() => {
  //   status === 'look' && JSON.stringify(data.selectedImg) !== JSON.stringify(images) ? setSelectedImg(data.selectedImg) : setSelectedImg(images)
  // },[selectedImg]);
  
  
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
  // console.log(JSON.stringify(data.selectedImg) !== JSON.stringify(selectedImg) ? data.selectedImg : selectedImg);


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
    autoplaySpeed:1
  };


  /*react-date-picker*/
  const [date,setDate]  = useState(''); 
  const momentDate = moment(date).format('YYYY/MM/DD');
  // console.log(moment(date).get('year'));
  // console.log(moment(date).get('month')+1);
  // console.log(moment(date).get('date'));
  // console.log(data.momentDate !== momentDate ? data.momentDate : momentDate);
  // console.log(readOnly === true ? 1 : 0 )
  
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

  //日記id
  let [inputId,setId] = useState(0);

  let id = localStorage.getItem('id')
  useEffect(() => {
    inputId = id ? setId(JSON.parse(id)) : 0 ;
  },[inputId]);

  //新增日記儲存鈕
  const saveJournal = () => {
    const type = 0 ;
    status = 'look';
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
    saveData(_journal,type)
  }

  //編輯
  const editJournal = () => {
    editData();
  }

  //編輯完儲存
  const editSaveJournal = () => {
    const type = 1 ;
    data.title = title ? title : data.title;
    data.momentDate = momentDate ? momentDate : data.momentDate;
    data.selectedImg = selectedImg ? selectedImg : data.selectedImg;
    data.content = content ? content : data.content;
    saveData(data,type);
  }
   
  useEffect(() => {
    if(status==='look' && readOnly === false){
      setDate('');
      setTitle('');
      setContent('');
    }
  },[date,title,content,status,readOnly]);

  // console.log(moment(journalData[0]['momentDate']).get('date'));

  return (
    <div className="innerpage" >
        <div className="info">
          <div className="title">
            <img src={pen} alt="標題"/>
            {(status === '' && journalData) ? 
              <input type="text" placeholder={journalData[0]['title']} value={title} onInput={inputTitle} readOnly={readOnly}/>
              :
              <input type="text" placeholder={data.title !== '' ? data.title : '標題...'} value={title} onInput={inputTitle} readOnly={!readOnly}/>
            }
          </div>
          {/* <input type='text' className='id' value={inputId}  onChange={saveJournal} /> */}
          <div className="calendar">
            <img src={calendar} alt="日期"/>
            {(status === '' && journalData) ? 
              <DatePicker
                onChange = {setDate}
                value = {date}
                dayPlaceholder = {moment(journalData[0]['momentDate']).get('date')}
                monthPlaceholder = {moment(journalData[0]['momentDate']).get('month')+1}
                yearPlaceholder = {moment(journalData[0]['momentDate']).get('year')}
                locale= {"en"}
                format = {"y/MM/dd"}
                disabled = {readOnly}
              />
              :
              <DatePicker
                onChange = {setDate}
                value = {date}
                dayPlaceholder = {data.momentDate !== momentDate ? moment(data.momentDate).get('date') : moment(date).get('date')}
                monthPlaceholder = {data.momentDate !== momentDate ? moment(data.momentDate).get('month')+1 : moment(date).get('month')+1}
                yearPlaceholder = {data.momentDate !== momentDate ? moment(data.momentDate).get('year') : moment(date).get('year')}
                locale= {"en"}
                format = {"y/MM/dd"}
                disabled = {!readOnly}
              />
            }
          </div>
        </div>
        <div className="content">
          <div>
            <Slider {...settings}>
              {selectedImg  &&
                selectedImg.map((image) => {
                  return (
                    <div key={image}>
                      {/* JSON.stringify(data.selectedImg) !== JSON.stringify(selectedImg) ? data.selectedImg : image */}
                      <img src={image} alt="upload"/>
                      <div className="deleteSelectedImg" style={{display: !readOnly ? 'none' : JSON.stringify(selectedImg) != JSON.stringify(images) && 'flex'}} onClick={() => deleteImg(image)}><img src={trashCan} alt="刪除"/></div>
                    </div>
                  );
                })
              }
            </Slider>
          </div>          
          {/* <span className="uploadImage" style={{display:!readOnly && "none"}}>
            <label for="file-input">
              <img src={image} alt="上傳照片"/>
            </label>
            <input 
              onChange={onSelectFile} 
              onClick={(event)=> {event.target.value = null}}
              id="file-input" type="file" accept="image/png,image/jpeg" 
              multiple="multiple"/>
          </span> */}
          {(status === '' && journalData) ? 
              <textarea name="journal" value={content} onChange={inputContent} placeholder={journalData[0]['content']} readOnly={readOnly}></textarea>
              :
              <textarea name="journal" value={content} onChange={inputContent} placeholder={data.content !== '' ? data.content : '日記...'} readOnly={!readOnly}></textarea>
            }
          </div>
        {(openBook && readOnly) && <div className="btn saveJournal" onClick={!display? saveJournal : editSaveJournal}>
          <img src={save} alt="儲存" width={30} />
        </div>} 
        {((openBook && !readOnly) || (status === '' && journalData)) && <div className='bothBtn'>
          <div className="deleteBtn">
            <img src={trashCan} alt="刪除" width={30}/>
          </div>
          <div className="editBtn" onClick={editJournal}>
            <img src={edit} alt="編輯" width={30} />
          </div>
        </div>}
    </div>
  )
}
