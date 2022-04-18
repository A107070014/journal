import './App.css';
import {useState} from 'react';
import picture from './img/欣玫.jpg';
import background from './img/background.png';
import search from './img/search.png';
import add from './img/add.png';
import save from './img/save.png';
import trashCan from './img/trash-can.png';
import close from './img/close.png';
import calendar from './img/calendar.png';
import pen from './img/pen.png';


export default function Journal() {
  const [openBook,setOpenBook] = useState(false); 
  const [value,setValue] = useState('');
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
            <img src={background} alt="輪播圖片"/><br/>
          </div>
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

