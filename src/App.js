import './App.css';
import {useState} from 'react';
import picture from './img/欣玫.jpg';
import search from './img/search.png';
import add from './img/add.png';

export default function Journal() {
  const [openBook,setOpenBook] = useState(false); 
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
      <div className="page">
        <div className="info">
          <input type="text" placeholder='標題'/>
          <span>2022/05/11</span>
        </div>
        <div className="content">
          <img src={picture} alt="輪播圖片" width={50}/><br/>
          <input type="text" placeholder='日記'/>
        </div>
        <div className="btn">
          <button className="closeBtn">取消</button>
          <button className="saveBtn">儲存</button>
        </div>
      </div>
      <div className="back-cover"></div>
    </div>
  );
}

