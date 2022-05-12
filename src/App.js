import './App.css';
import {useEffect, useState} from 'react';
import picture from './img/欣玫.jpg';
import search from './img/search.png';
import add from './img/add.png';
import add2 from './img/add2.png';
import close from './img/close.png';
import back from './img/back.png';
import Page from './components/page';

export default function Journal() {
  const [openBook,setOpenBook] = useState(false);
  const [readOnly,setReadOnly] = useState(true); 
  const [journalData,setJournalData] =useState(JSON.parse(localStorage.getItem('journal')));
  const [data,setData] = useState({id:0,title:'',content:'',momentDate:'',selectedImg:''});
  //page狀態
  const [status,setStatus] = useState();
  useEffect(() => {
    setJournalData(JSON.parse(localStorage.getItem('journal')))
  },[status,data]);


  /*onmouseover、nomouseout*/
  const hoverAddIcon = (e) => {
    e.target.src = add2;
  }
  const outAddIcon = (e) => {
    e.target.src = add;
  }

  function toPage(status,index) {
    setStatus(status);
    if (index === undefined) {
      setData({id:-1,title:'',content:'',momentDate:'',selectedImg:''})
    } else {
      setData(journalData[index]);
    }
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.style.display = 'flex';

  }
  var localData = localStorage.getItem('journal');
  const saveData = (journal) => {
    console.log(journal);
    if (localData) {
      localData = JSON.parse(localData);
    } else {
      localData = [] ;
    }
    localData.push(journal);
    localStorage.setItem('journal',JSON.stringify(localData));
    setJournalData(JSON.parse(localStorage.getItem('journal')));
    setReadOnly(!readOnly);
  }
  const editData = (editDataId) => {
    setReadOnly(!readOnly);
    const id = editDataId;
  }
  // const addData = () => {
  //   setTitle('');
  //   setDate(new Date());
  //   setReadOnly(readOnly);
  //   setSelectedImg(images);
  //   setContent('');
    
  //   setId(JSON.parse(localStorage.getItem('id'))+1);
  // }

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
              <img className="add" src={add} alt="增加日記" onClick={() => toPage('add')}  onMouseOver={hoverAddIcon} onMouseOut={outAddIcon}/>
            </div>
            {journalData && journalData.map((data,index)=> (
            <div className="journalList" key={index} onClick={() => toPage('look',index)}>
              <div className="journalDate">{data.momentDate}</div>
              <div className="journal">
                <div className="journalInfo">
                  <h4 className='journalTitle'>{data.title}</h4>
                  <p className='journalContent'>{data.content}</p>
                </div>
                <div className='journalPicture'>
                  {/* <img src={data.selectedImg[0]} alt='picture' width={100} height={100}/> */}
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
      {(openBook && !readOnly) && <div className="closeBtn" ><img src={close} alt="取消" width={15}/></div>}
      <div className="page">
        <Page 
          openBook={openBook} 
          status={status} 
          data={data} 
          saveData={saveData} 
          readOnly={readOnly}
          editData={editData}
        />
      </div>
      <div className="back-cover"></div>
    </div>
  );
}

